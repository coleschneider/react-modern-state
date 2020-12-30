import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { navigation } from "./Header/Menu";

const useNavigationDirection = () => {
  const router = useRouter();
  const ref = useRef<number>();
  const index = navigation.findIndex((nav) => nav.path === router.route) + 1;
  useEffect(() => {
    ref.current = index;
  });
  return Math.sign(index - (ref.current || 0));
};

export default useNavigationDirection;
