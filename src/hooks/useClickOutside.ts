import { useEffect, RefObject } from "react";

export const useClickOutSide = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (!ref.current) {
      return;
    }
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  });
};
