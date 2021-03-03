import { ReactElement } from "react";
import { FrameProps, ScrollProps } from "framer";

export type VirtualListItemProps = {
  offset: number;
};

export type VirtualListProps<T> = ScrollProps & {
  items: T[];
  itemSize: number;
  direction?: "vertical" | "horizontal";
  overfetch?: number;
  innerProps?: Omit<Partial<FrameProps>, "size">;
  children: (item: T, offset: number) => ReactElement<VirtualListItemProps>;
};
