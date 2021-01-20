import { useState } from "react";

import {
  VirtualListItemResult,
  VirtualListItemProps,
  DragState,
} from "./types";

export function useVirtualListItem(
  index: number,
  { drag, handleChange, handleDragStart, handleDragEnd }: VirtualListItemProps
): VirtualListItemResult {
  const [state, setState] = useState<DragState>("idle");

  return [
    state,
    {
      drag,
      onTapStart: () => {
        setState("dragging");
        handleDragStart(index);
      },
      onTap: () => {
        handleDragEnd(index);
      },
      onDragEnd: () => {
        setState("animating");
        handleDragEnd(index);
      },
      onAnimationComplete: () => {
        if (state === "animating") setState("idle");
      },
      onViewportBoxUpdate: (_viewportBox, delta) => {
        if (state === "dragging") handleChange(index, delta.y.translate);
      },
    },
  ];
}
