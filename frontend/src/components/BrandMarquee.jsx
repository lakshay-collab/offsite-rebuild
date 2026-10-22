import React from "react";

// The site's single cinematic marquee moment: the brand's own service words in large outlined type,
// drifting slowly. Deliberately quiet (1px hairline letters, no fill) and purely decorative.
const TERMS = ["Offsites", "MICE", "Incentive Travel", "Team Experiences", "Workations"];

const Row = () => (
  <div className="flex shrink-0 items-center" aria-hidden="true">
    {TERMS.map((t) => (
      <React.Fragment key={t}>
        <span className="hi-display hi-outline-text whitespace-nowrap px-5 text-[clamp(56px,9vw,128px)] uppercase leading-none tracking-[-0.02em] md:px-8">{t}</span>
        <span className="h-2 w-2 shrink-0 rounded-full bg-hi-orange/70" />
      </React.Fragment>
    ))}
  </div>
);

const BrandMarquee = () => (
  <section className="select-none overflow-hidden bg-hi-surface py-10 md:py-14" aria-hidden="true" data-testid="brand-marquee">
    {/* two identical halves; the track slides exactly one half, so the loop has no seam (very slow: 140s) */}
    <div className="hi-marquee-track" style={{ animationDuration: "140s" }}>
      <Row />
      <Row />
    </div>
  </section>
);

export default BrandMarquee;
