import { useEffect, useState } from "react";

export const useDebounce = (value: string, tm = 700) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, tm);

    return () => {
      clearTimeout(timeout);
    };
  }, [tm, value]);

  return debounceValue;
};
