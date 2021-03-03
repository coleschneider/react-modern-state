import { ReactElement } from "react";
import { FrameProps, ScrollProps } from "framer";

export type VirtualListItemProps = {
  index: number;
  offset: number;
};

export type VirtualListProps<T> = ScrollProps & {
  items: T[];
  itemSize: number;
  direction?: "vertical" | "horizontal";
  overfetch?: number;
  innerProps?: Omit<Partial<FrameProps>, "size">;
  children: (
    item: T,
    index: number,
    offset: number
  ) => ReactElement<VirtualListItemProps>;
};
