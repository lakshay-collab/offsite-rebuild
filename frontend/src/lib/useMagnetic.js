import { useEffect, useRef } from "react";
import { isFinePointer } from "@/lib/motion";

// Extremely subtle magnetic pull for a primary CTA: as a mouse cursor comes near, the button follows it by a few
// pixels (and its arrow chip by slightly more); on leaving it eases back. Mouse only, never on touch, and off for
// reduced motion. Cheap: one rAF-throttled pointermove listener per magnetic button, only transform changes.
const RANGE = 70; // px around the button where the pull starts
export const useMagnetic = (enabled = true, strength = 4) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !isFinePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    let active = false;
    let last = null;
    const set = (x, y, ax, ay, ease) => {
      const keep = "box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms cubic-bezier(0.22, 1, 0.36, 1), filter 300ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transition = `${ease ? "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)" : "transform 120ms linear"}, ${keep}`;
      el.style.transform = x || y ? `translate3d(${x}px, ${y}px, 0)` : "";
      el.style.setProperty("--ax", `${ax}px`);
      el.style.setProperty("--ay", `${ay}px`);
    };
    const frame = () => {
      raf = 0;
      if (!last) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = last.x - cx;
      const dy = last.y - cy;
      const near = Math.abs(dx) < r.width / 2 + RANGE && Math.abs(dy) < r.height / 2 + RANGE;
      if (near) {
        const nx = Math.max(-1, Math.min(1, dx / (r.width / 2 + RANGE)));
        const ny = Math.max(-1, Math.min(1, dy / (r.height / 2 + RANGE)));
        active = true;
        set(+(nx * strength).toFixed(2), +(ny * strength).toFixed(2), +(nx * strength * 0.9).toFixed(2), +(ny * strength * 0.9).toFixed(2), false);
      } else if (active) {
        active = false;
        set(0, 0, 0, 0, true);
      }
    };
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      last = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [enabled, strength]);
  return ref;
};
