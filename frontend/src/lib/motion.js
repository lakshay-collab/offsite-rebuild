// One motion language for the whole site (mirrors the --hi-* tokens in index.css):
//   fast interaction 200-300ms · normal UI 350-500ms · editorial reveal 600-900ms · cinematic reveal 900-1200ms
export const EASE = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)
export const D = { fast: 0.28, normal: 0.45, editorial: 0.75, cinematic: 1.05 }; // seconds

// phones/tablets and touch devices get lighter or no pointer-driven effects
export const isFinePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export const isSmallScreen = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
