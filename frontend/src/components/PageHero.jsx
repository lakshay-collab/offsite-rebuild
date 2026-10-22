import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { introDelay } from "@/components/PageLoader";

const easeLux = [0.2, 0.8, 0.2, 1];

// Font size that keeps a heading on one line from tablet up: shrinks with the text length, capped at maxPx
// (minPx applies on phones, where the heading is allowed to wrap)
export const oneLineSize = (text, maxPx = 72, minPx = 24) => {
  const len = String(text || "").length || 1;
  return `clamp(${minPx}px, min(5vw, ${(160 / len).toFixed(2)}vw), ${maxPx}px)`;
};

// Heading words rise one after another
const RisingWords = ({ text, delay = 0 }) => {
  const reduce = useReducedMotion();
  return String(text)
    .split(" ")
    .map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          className="inline-block"
          initial={reduce ? false : { y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.08, ease: easeLux }}
        >
          {w}&nbsp;
        </motion.span>
      </span>
    ));
};

// Text-only hero for pages without a photo (legal, sitemap, not found): champagne band, centred one-line title
export const TextHero = ({ title, subtitle, children, testId = "text-hero" }) => (
  <section className="bg-hi-surface px-3 pt-3 md:px-5" data-testid={testId}>
    <div className="hi-champagne relative overflow-hidden rounded-[32px] px-6 pb-16 pt-36 text-center md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute -top-40 left-[24%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
      <h1 className="hi-display relative text-hi-ink md:whitespace-nowrap" style={{ fontSize: oneLineSize(title, 64, 32), lineHeight: 1.08 }}>
        <RisingWords text={title} delay={0.2} />
      </h1>
      <span className="relative mx-auto mt-6 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
      {subtitle && <p className="relative mx-auto mt-5 max-w-[620px] text-[16px] leading-relaxed text-hi-ink">{subtitle}</p>}
      {children}
    </div>
  </section>
);

// Inner-page hero (About, services, destinations, contact): full-bleed photo that settles from a zoom,
// one-line heading rising in, centred in the banner. `delay` lines the motion up with the PageLoader curtain.
// `wrap` lets very long titles (blog articles) wrap onto two lines at a readable size instead of shrinking.
// `low` drops the title into the lower part of the banner (for photos with faces in the middle, e.g. About).
const PageHero = ({ title, img, alt = "", delay: delayProp, testId = "page-hero", wrap = false, low = false, children }) => {
  const delay = delayProp ?? introDelay();
  const reduce = useReducedMotion();
  return (
    <section className={`relative flex min-h-[640px] ${low ? "items-end" : "items-center"} overflow-hidden bg-hi-ink md:h-[88svh]`} data-testid={testId}>
      {img && (
        <motion.img
          src={img}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.2 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 3.2, delay: Math.max(0, delay - 0.4), ease: easeLux }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(rgba(0,33,49,0.5), rgba(0,33,49,0.32) 45%, rgba(0,33,49,0.5) 70%, rgba(0,33,49,0.72))" }}
      />
      {/* title sits in the exact middle of the banner (or lower down when `low`) */}
      <div className={`hi-container relative z-10 text-center ${low ? "pb-14 md:pb-[9%]" : ""}`}>
        <h1
          className={`hi-display text-white ${wrap ? "mx-auto max-w-[1100px] [text-wrap:balance]" : "md:whitespace-nowrap"}`}
          style={{ fontSize: wrap ? "clamp(32px, 4vw, 60px)" : oneLineSize(title, 72, 34), lineHeight: 1.08 }}
        >
          <RisingWords text={title} delay={delay} />
        </h1>
        {children}
      </div>
    </section>
  );
};

export default PageHero;
