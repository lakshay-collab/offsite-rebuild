import React from "react";
import { Check } from "lucide-react";
import { whyChoose, assets } from "@/data/content";
import Reveal from "@/components/Reveal";

// One feature: gold-ringed check, title, description. `mirror` right-aligns it (left column, facing the photo).
const Feature = ({ title, desc, mirror, delay }) => (
  <Reveal delay={delay} className={`group flex gap-4 ${mirror ? "lg:flex-row-reverse lg:text-right" : ""}`}>
    <span className="hi-gold-chip mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[#b8873f] transition-all duration-500 group-hover:!bg-none group-hover:!bg-hi-navy group-hover:text-white">
      <Check size={14} strokeWidth={2.75} />
    </span>
    <div>
      <h3 className="hi-title text-[16px] text-hi-ink">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-hi-ink">{desc}</p>
    </div>
  </Reveal>
);

const WhyChoose = () => {
  return (
    <section className="bg-hi-surface px-5 py-8 md:py-10" data-testid="why-choose">
      <div className="hi-gold-rim mx-auto max-w-[1160px] rounded-[32px] p-px">
        <div className="hi-champagne relative overflow-hidden rounded-[31px] px-6 py-10 md:px-10 md:py-11">
          {/* soft light rays */}
          <div className="pointer-events-none absolute -top-40 left-[24%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
          <div className="pointer-events-none absolute -top-40 left-[62%] h-[640px] w-24 rotate-[28deg] hi-ray hi-ray-40" />

          <Reveal className="relative mx-auto max-w-[780px] text-center">
            <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: 1.12 }}>
              {whyChoose.titleA}
              <br className="hidden sm:block" /> {whyChoose.titleB}
            </h2>
            <span className="mx-auto mt-4 block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
            <p className="mx-auto mt-4 max-w-[680px] text-[14px] leading-relaxed text-hi-ink md:text-[15px]">{whyChoose.subtitle}</p>
          </Reveal>

          <div className="relative mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_260px_1fr] lg:gap-10">
            {/* photo first on phones, centre column on desktop */}
            <Reveal className="mx-auto w-full max-w-[260px] lg:order-2" delay={0.1}>
              <div className="hi-gold-frame overflow-hidden rounded-b-[28px] rounded-t-[999px]">
                <img
                  src={assets.whyImage}
                  alt="Team gathered around a campfire on an offsite"
                  className="h-[310px] w-full rounded-b-[22px] rounded-t-[999px] object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6 lg:order-1">
              {whyChoose.left.map((f, i) => (
                <Feature key={f.title} {...f} mirror delay={0.1 + i * 0.08} />
              ))}
            </div>

            <div className="flex flex-col gap-6 lg:order-3">
              {whyChoose.right.map((f, i) => (
                <Feature key={f.title} {...f} delay={0.14 + i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
