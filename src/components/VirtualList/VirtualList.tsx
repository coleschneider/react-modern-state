import React, { useState, useCallback, useRef, ReactChild } from "react";
import { PanInfo } from "framer-motion";
import { Frame, Scroll } from "framer";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { VirtualListProps } from "./utils";

export function VirtualList<T>({
  items,
  itemSize,
  children,
  onScroll,
  direction = "vertical",
  overfetch = 1,
  width,
  height,
  innerProps,
  ...scrollProps
}: VirtualListProps<T>) {
  const scrollDirection = direction === "horizontal" ? "x" : "y";

  const scrollOffset = useRef(0);

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
      if (scrollOffset.current === offset) return;
      scrollOffset.current = offset;

      const newWindow = calculateWindow(
        scrollOffset.current,
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
      scrollOffset,
    ]
  );

  const nodes: ReactChild[] = [];
  for (let i = start; i <= end; i++)
    nodes.push(children(items[i], i * itemSize + scrollOffset.current));

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
        position="relative"
        {...innerProps}
        size={items.length * itemSize}
        ref={ref}
      >
        {nodes}
      </Frame>
    </Scroll>
  );
}

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
