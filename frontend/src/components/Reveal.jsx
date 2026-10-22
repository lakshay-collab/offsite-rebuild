import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1]; // the site's one easing curve (same as --hi-ease)

// Phones get a lighter entrance (shorter rise, quicker), so scrolling stays effortless
const useIsSmall = () => {
  const [small, setSmall] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setSmall(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return small;
};

// Fades + lifts children in once when they scroll into view (IntersectionObserver under the hood).
// Meant to be nearly subconscious: ~16px rise, ~650ms, opacity + transform only.
const Reveal = ({ children, delay = 0, y = 18, className = "", as = "div", ...rest }) => {
  const reduce = useReducedMotion();
  const small = useIsSmall();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: small ? Math.min(y, 12) : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: small ? 0.5 : 0.65, delay: small ? delay * 0.6 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
