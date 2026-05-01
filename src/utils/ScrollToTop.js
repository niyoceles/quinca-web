import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top-left on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Use "instant" to avoid smooth scroll flashing
    });
  }, [pathname]);

  return null;
}
