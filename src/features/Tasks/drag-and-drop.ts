import { useState, useEffect, useRef } from "react";
import { clamp, distance } from "popmotion";

export function useMeasurePosition(update) {
  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    update({
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    });
  });

  return ref;
}

export function usePositionReorder(initialState) {
  const [order, setOrder] = useState(initialState);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef([]).current;
  const updatePosition = (i, offset) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const updateOrder = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setOrder(arrayMove(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder];
}

const buffer = 30;

const findIndex = (i, yOffset, positions) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};

const arrayMove = (array, from, to) => {
  const clone = [...array];
  const startIndex = from < 0 ? clone.length + from : from;

  if (startIndex >= 0 && startIndex < clone.length) {
    const endIndex = to < 0 ? clone.length + to : to;

    const [item] = clone.splice(from, 1);
    clone.splice(endIndex, 0, item);
  }
  return clone;
};
