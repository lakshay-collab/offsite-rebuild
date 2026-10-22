import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE, D } from "@/lib/motion";

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

// Major image, cinematic entrance: a clip-path mask opens from the top while the photo settles from 1.06 to 1
// (about 1s, no blur). Afterwards, on desktop, the photo drifts ±4% inside its own frame as you scroll
// (the frame itself never moves). Phones skip the parallax and use a lighter reveal; reduced motion shows the image.
const RevealImage = ({ src, alt = "", className = "", imgClassName = "", imgStyle, delay = 0, eager = false, parallax = true }) => {
  const reduce = useReducedMotion();
  const small = useIsSmall();
  const frame = useRef(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const moves = parallax && !reduce && !small;

  return (
    <motion.div
      ref={frame}
      className={`group/img relative overflow-hidden ${className}`}
      initial={reduce ? false : small ? { opacity: 0, y: 14 } : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={small ? { opacity: 1, y: 0 } : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: small ? D.editorial : D.cinematic, delay, ease: EASE }}
    >
      {/* the moving layer is a touch larger than its frame so the drift never exposes an edge */}
      <motion.div className="absolute inset-0" style={moves ? { y: drift, scale: 1.1 } : undefined}>
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={imgStyle}
          className={`h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.03] ${imgClassName}`}
          initial={reduce || small ? false : { scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: D.cinematic, delay, ease: EASE }}
        />
      </motion.div>
    </motion.div>
  );
};

export default RevealImage;
