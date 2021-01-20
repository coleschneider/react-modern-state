import React, { useState, useCallback, useRef, ReactChild } from "react";
import { PanInfo } from "framer-motion";
import { Frame, Scroll } from "framer";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { VirtualDragAndDropListProps, VirtualListItemProps } from "./types";

export function VirtualDragAndDropList<T>({
  items,
  swapDistance,
  itemSize,
  onPositionUpdate,
  onPositionChange,
  children,
  onScroll,
  direction = "vertical",
  overfetch = 1,
  width,
  height,
  innerProps,
  ...scrollProps
}: VirtualDragAndDropListProps<T>) {
  const scrollDirection = direction === "horizontal" ? "x" : "y";

  const drag = useRef({
    currentIndex: -1,
    currentItemStartOffset: 0,
    scrollOffset: 0,
    dragOffset: 0,
  });

  const [windowSize, setWindowSize] = useState((): number => {
    const sizeProp = scrollDirection === "y" ? width : height;
    if (Number.isInteger(sizeProp)) return sizeProp as number;
    const strSize = sizeProp as string;
    if (/^\d+px$/.test(strSize)) return Number.parseInt(strSize, 10);
    return 0;
  });

  const ref = useRef<HTMLDivElement>(null);

  const [[start, end], setWindow] = useState(() =>
    calculateWindow(0, overfetch, items.length, itemSize, windowSize)
  );

  useIsomorphicLayoutEffect(() => {
    if (windowSize) return;
    if (!ref.current) return;
    const parent = ref.current.parentNode.parentNode as HTMLDivElement;
    setWindowSize(
      scrollDirection === "y" ? parent.offsetHeight : parent.offsetWidth
    );
    // @ts-ignore
    if (!ResizeObserver) return;
    //@ts-ignore
    const resizeObserver = new ResizeObserver((_) => {
      setWindowSize(
        scrollDirection === "y" ? parent.offsetHeight : parent.offsetWidth
      );
    });

    resizeObserver.observe(parent);
    return () => {
      // @ts-ignore
      resizeObserver.unobserve(parent);
    };
  }, [windowSize, setWindowSize, scrollDirection, ref]);

  const handleScroll = useCallback(
    (info: PanInfo) => {
      onScroll?.(info);

      const offset = Math.abs(info.point[scrollDirection]);
      if (drag.current.scrollOffset === offset) return;
      drag.current.scrollOffset = offset;

      const {
        currentIndex,
        currentItemStartOffset,
        scrollOffset,
        dragOffset,
      } = drag.current;

      // Check if is dragging to re-calculate indexes
      // This is needed to the item to stay in virtual windows
      if (currentIndex > -1) {
        const targetIndex = findIndex(
          currentIndex,
          dragOffset + scrollOffset - currentItemStartOffset,
          items.length,
          swapDistance
        );
        if (targetIndex !== currentIndex) {
          drag.current.currentItemStartOffset = scrollOffset;
          drag.current.currentIndex = targetIndex;
          onPositionUpdate(currentIndex, targetIndex);
        }
      }

      const newWindow = calculateWindow(
        scrollOffset,
        overfetch,
        items.length,
        itemSize,
        windowSize
      );
      if (newWindow[0] !== start && newWindow[1] !== end) setWindow(newWindow);
    },
    [
      onScroll,
      scrollDirection,
      items.length,
      itemSize,
      overfetch,
      windowSize,
      start,
      end,
      drag,
      onPositionUpdate,
      swapDistance,
    ]
  );

  const handleChange = useCallback(
    (i: number, dragOffset: number) => {
      if (drag.current.dragOffset === dragOffset) return;

      drag.current.dragOffset = dragOffset;
      const targetIndex = findIndex(
        i,
        dragOffset +
          drag.current.scrollOffset -
          drag.current.currentItemStartOffset,
        items.length,
        swapDistance
      );
      if (targetIndex !== i) {
        onPositionUpdate(i, targetIndex);
      }
    },
    [items.length, drag, swapDistance, onPositionUpdate]
  );

  const handleDragStart = useCallback(
    (start: number) => {
      drag.current.currentIndex = start;
      drag.current.currentItemStartOffset = drag.current.scrollOffset;
    },
    [drag]
  );

  const handleDragEnd = useCallback(
    (endIndex: number) => {
      if (drag.current.currentIndex !== endIndex)
        onPositionChange?.(drag.current.currentIndex, endIndex);
      drag.current.currentIndex = -1;
      drag.current.currentItemStartOffset = 0;
      drag.current.dragOffset = 0;
    },
    [drag, onPositionChange]
  );

  const itemProps: VirtualListItemProps = {
    drag: scrollDirection,
    handleChange,
    handleDragStart,
    handleDragEnd,
  };

  const nodes: ReactChild[] = [];
  for (let i = start; i <= end; i++) {
    const offset =
      i === drag.current.currentIndex
        ? drag.current.scrollOffset - drag.current.currentItemStartOffset
        : 0;
    nodes.push(children(items[i], i, i * itemSize + offset, itemProps));
  }

  return (
    <Scroll
      {...scrollProps}
      dragEnabled={false}
      direction={direction}
      width={width}
      height={height}
      onScroll={handleScroll}
    >
      <Frame
        backgroundColor="none"
        color="inherit"
        {...innerProps}
        size={items.length * itemSize}
        ref={ref}
      >
        {nodes}
      </Frame>
    </Scroll>
  );
}

export const findIndex = (
  i: number,
  offset: number,
  length: number,
  swapDistance: number
) => {
  let target = i;

  // If moving down
  if (offset > 0) {
    if (i === length - 1) return i;
    if (offset > swapDistance) target = i + 1;
  }
  // If moving up
  else if (offset < 0) {
    if (i === 0) return i;
    if (offset < -swapDistance) target = i - 1;
  }

  return Math.min(Math.max(target, 0), length);
};

const calculateWindow = (
  offset: number,
  overfetch: number,
  count: number,
  itemSize: number,
  windowSize: number
): [number, number] => [
  Math.max(Math.floor(offset / itemSize) - overfetch, 0),
  Math.min(Math.ceil((offset + windowSize) / itemSize) + overfetch, count - 1),
];
