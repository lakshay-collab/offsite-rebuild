import React from "react";
import { Users } from "lucide-react";
import { successStories, stats } from "@/data/content";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import MaskedText from "@/components/MaskedText";

// Gentle, repeating tilt so the photos feel hand-placed
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5, -2];
const widths = [230, 190, 210, 250, 200, 225, 185, 240, 205];

const Row = ({ images, reverse, offset = 0 }) => (
  <div className="overflow-hidden py-6">
    <div className={`hi-marquee-track items-center gap-3 px-2 ${reverse ? "reverse" : ""}`}>
      {[...images, ...images].map((src, i) => {
        const k = (i + offset) % tilts.length;
        return (
          <figure
            key={i}
            className="hi-polaroid relative flex-shrink-0"
            style={{ "--tilt": `${tilts[k]}deg`, width: widths[k] }}
            data-testid={`success-card-${i}`}
          >
            <img
              src={src}
              alt={i < images.length ? "HI Offsite event" : ""}
              className="h-[160px] w-full rounded-[6px] object-cover md:h-[180px]"
              loading="lazy"
            />
          </figure>
        );
      })}
    </div>
  </div>
);

const SuccessStories = () => {
  const imgs = successStories.images;
  return (
    <section className="hi-champagne relative overflow-hidden py-20 md:py-28" data-testid="success-stories">
      {/* navy corner sweeps edged in gold */}
      <div className="hi-corner-sweep pointer-events-none absolute -left-48 -top-40 h-72 w-[34rem] -rotate-[14deg] rounded-[50%]" />
      <div className="hi-corner-sweep pointer-events-none absolute -bottom-44 -right-48 h-72 w-[34rem] -rotate-[14deg] rounded-[50%]" />
      {/* light rays */}
      <div className="pointer-events-none absolute -top-40 left-[30%] h-[600px] w-40 rotate-[28deg] hi-ray hi-ray-50" />

      <div className="hi-container relative">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(36px, 4.8vw, 64px)" }}>
            <MaskedText>
              {successStories.titleA}
              {successStories.titleB}
            </MaskedText>
          </h2>
          <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.28em] text-hi-ink">{successStories.subtitle}</p>
          {/* Light frosted pill with a gold rim */}
          <span className="hi-gold-rim mt-6 inline-flex rounded-full p-px">
            <span className="hi-frost-pill inline-flex items-center gap-2.5 rounded-full py-1 pl-1 pr-4">
              <span className="hi-gold-chip flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-hi-ink">
                <Users size={13} strokeWidth={1.8} />
              </span>
              <span className="h-4 w-px bg-gradient-to-b from-transparent via-[#c9a061] to-transparent" />
              <span className="hi-display text-[16px] leading-none text-hi-ink">
                <CountUp value={stats.items[1].value.replace(/\s+/g, "")} />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-hi-ink">
                {stats.items[1].label}
              </span>
            </span>
          </span>
        </Reveal>
      </div>

      {/* gold swooshes behind the photo rows */}
      <svg className="pointer-events-none absolute inset-x-0 top-[48%] h-48 w-full" viewBox="0 0 1400 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M60 170 C 220 120, 300 150, 420 140" fill="none" stroke="#c9a061" strokeOpacity="0.7" strokeWidth="1.5" />
        <path d="M980 30 C 1080 10, 1160 14, 1240 22" fill="none" stroke="#c9a061" strokeOpacity="0.7" strokeWidth="1.5" />
      </svg>

      <div className="relative mt-10">
        <Row images={imgs} />
        <Row images={[...imgs].reverse()} reverse offset={4} />
      </div>

      <div className="hi-container relative mt-10 flex justify-center">
        <p className="text-center text-[12px] font-medium uppercase tracking-[0.26em] text-hi-ink md:text-[13px]">
          {successStories.tagline}
        </p>
      </div>
    </section>
  );
};

export default SuccessStories;
