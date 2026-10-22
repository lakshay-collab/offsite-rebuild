import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Counts a real statistic up once, the first time it scrolls into view ("30+" → 0…30+, "500,000+" → 0…500,000+).
// The text is the site's own figure, parsed as: prefix · number · suffix. Anything that doesn't parse (or a tiny
// number such as "1k") is shown as written. Runs ONCE and keeps the final value; the full figure is in the markup from
// the start, so screen readers and print always see the real number.
const PARSE = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s;
const easeOut = (t) => 1 - Math.pow(1 - t, 4);

const CountUp = ({ value, duration = 1100, className = "" }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const text = String(value);
  const m = text.match(PARSE);
  const target = m ? parseFloat(m[2].replace(/,/g, "")) : NaN;
  const animate = !reduce && m && target >= 10;
  const [shown, setShown] = useState(null); // null = show the real text

  useEffect(() => {
    if (!animate || typeof IntersectionObserver === "undefined") return undefined;
    const el = ref.current;
    let raf = 0;
    const decimals = (m[2].split(".")[1] || "").length;
    const comma = m[2].includes(",");
    const fmt = (n) => (comma ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals));
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / duration);
        setShown(k < 1 ? `${m[1]}${fmt(target * easeOut(k))}${m[3]}` : null);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      setShown(`${m[1]}${fmt(0)}${m[3]}`);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animate]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={text}>
      {shown ?? text}
    </span>
  );
};

export default CountUp;
