import { useEffect, useRef } from "react";
import { isFinePointer } from "@/lib/motion";

// Cursor-responsive photos for a grid of cards: put the returned ref on the grid and `data-shift` on each card.
// While the mouse is over a card its photo (class .hi-pimg) drifts toward the cursor by at most `max` px inside its
// clipping frame (the 1.04 hover zoom gives it room). Desktop mouse only; one delegated, rAF-throttled listener.
export const useShiftGroup = (max = 7) => {
  const ref = useRef(null);
  useEffect(() => {
    const grid = ref.current;
    if (!grid || !isFinePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    let ev = null;
    let current = null;
    const reset = (card) => {
      if (!card) return;
      card.style.setProperty("--px", "0px");
      card.style.setProperty("--py", "0px");
    };
    const frame = () => {
      raf = 0;
      if (!ev) return;
      const card = ev.target.closest && ev.target.closest("[data-shift]");
      if (card !== current) {
        reset(current);
        current = card;
      }
      if (!card) return;
      const r = card.getBoundingClientRect();
      const nx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((ev.clientY - r.top) / r.height - 0.5) * 2;
      card.style.setProperty("--px", `${(nx * max).toFixed(2)}px`);
      card.style.setProperty("--py", `${(ny * max).toFixed(2)}px`);
    };
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      ev = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => {
      ev = null;
      reset(current);
      current = null;
    };
    grid.addEventListener("pointermove", move, { passive: true });
    grid.addEventListener("pointerleave", leave);
    return () => {
      grid.removeEventListener("pointermove", move);
      grid.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
};
