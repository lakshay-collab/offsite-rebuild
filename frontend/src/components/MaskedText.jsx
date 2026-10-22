import React, { Children, cloneElement, isValidElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, D } from "@/lib/motion";

const word = { hidden: { y: "108%" }, show: { y: 0, transition: { duration: D.editorial, ease: EASE } } };

// Masked text reveal for important headings: every word rises out from behind an invisible clipping mask,
// one after another (so each line seems to rise in turn). It keeps nested markup, e.g. an orange <span>.
// Movement is a single short rise, no bounce. Plays once when the heading scrolls into view
// (or at once with `immediate`, for the hero). Plain paragraphs should not use this.
const MaskedText = ({ children, stagger = 0.055, delay = 0, immediate = false, className = "" }) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;

  const walk = (node) => {
    if (typeof node === "string") {
      return node
        .split(/(\s+)/)
        .filter(Boolean)
        .map((tok, i) =>
          /^\s+$/.test(tok) ? (
            tok
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
              <motion.span className="inline-block" variants={word}>
                {tok}
              </motion.span>
            </span>
          )
        );
    }
    if (Array.isArray(node)) return Children.toArray(node).map(walk);
    if (isValidElement(node)) {
      if (node.type === "br" || node.props.children === undefined) return node;
      return cloneElement(node, undefined, walk(node.props.children));
    }
    return node;
  };

  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-80px" } };
  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {walk(children)}
    </motion.span>
  );
};

export default MaskedText;
