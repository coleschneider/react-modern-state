import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  // @ts-ignore
  window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
