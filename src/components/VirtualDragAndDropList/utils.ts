import { DragState } from "./types";

export const getDragStateZIndex = (state: DragState, base = 0) => {
  switch (state) {
    case "dragging":
      return base + 3;
    case "animating":
      return base + 2;
    default:
      return base + 1;
  }
};
