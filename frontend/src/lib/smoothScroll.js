import Lenis from "lenis";

// One shared Lenis instance (null when reduced motion is requested or before mount).
let instance = null;

export const getLenis = () => instance;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Custom expo-out: quick to respond, long gentle settle (no heavy lag)
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const createSmoothScroll = () => {
  if (reducedMotion()) return null;
  instance = new Lenis({
    autoRaf: true, // drives itself with requestAnimationFrame
    lerp: 0.085, // a little more glide than the default 0.1, still follows the wheel closely
    smoothWheel: true,
    syncTouch: false, // touch keeps native momentum (iOS / Android)
    wheelMultiplier: 1,
    anchors: false, // hash navigation is handled by ScrollManager so router + sticky offsets stay in charge
    // while a modal / mobile menu locks the body, let native scrolling inside it take over
    prevent: () => document.body.style.overflow === "hidden",
  });
  return instance;
};

export const destroySmoothScroll = () => {
  if (instance) instance.destroy();
  instance = null;
};

// Smoothly scroll to a number (px) or element. Honors the element's scroll-margin-top (sticky nav offset).
export const scrollToTarget = (target, { immediate = false, duration = 1.2 } = {}) => {
  if (typeof target !== "number") {
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    if (instance) return instance.scrollTo(target, { offset: -margin, immediate, duration, easing: easeOutExpo });
    return target.scrollIntoView({ block: "start", behavior: immediate ? "auto" : "smooth" });
  }
  if (instance) return instance.scrollTo(target, { immediate, duration, easing: easeOutExpo });
  return window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
};
