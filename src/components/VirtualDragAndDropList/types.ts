import { ReactElement } from "react";
import { PanInfo, AxisBox2D, BoxDelta } from "framer-motion";
import { FrameProps, ScrollProps } from "framer";

export type VirtualDragAndDropListItemProps = {
  index: number;
  offset: number;
  itemProps: VirtualListItemProps;
};

export type VirtualDragAndDropListProps<T> = ScrollProps & {
  items: T[];
  swapDistance: number;
  itemSize: number;
  onPositionUpdate: (from: number, to: number) => void;
  onPositionChange?: (startIndex: number, endIndex) => void;
  direction?: "vertical" | "horizontal";
  overfetch?: number;
  innerProps?: Omit<Partial<FrameProps>, "size">;
  children: (
    item: T,
    index: number,
    offset: number,
    itemProps: VirtualListItemProps
  ) => ReactElement<VirtualDragAndDropListItemProps>;
};

export type VirtualListItemProps = {
  drag: "x" | "y";
  handleChange: (i: number, dragOffset: number) => void;
  handleDragStart: (index: number) => void;
  handleDragEnd: (endIndex: number) => void;
};

export type DragState = "idle" | "animating" | "dragging";

export type VirtualListItemResult = [
  DragState,
  {
    drag: "x" | "y";
    onTapStart(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onTap(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    onDragEnd(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onAnimationComplete(): void;
    onViewportBoxUpdate(box: AxisBox2D, delta: BoxDelta): void;
  }
];
