import { useState, useEffect } from "react";

export default function useScrollTop(threshold = 10) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > threshold) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scroll;
}
