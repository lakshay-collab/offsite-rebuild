import React from "react";
import { ArrowRight } from "lucide-react";
import { expertise } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartLink from "@/components/SmartLink";
import { useShiftGroup } from "@/lib/useShiftGroup";

// title/subtitle can be overridden, e.g. "Udaipur services" on a destination page
const Expertise = ({ title, subtitle } = {}) => {
  const shift = useShiftGroup(7); // photos drift a few px toward the cursor (desktop only)
  return (
    <section
      id="expertise"
      className="scroll-mt-20 py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #fbf8ef 0%, #faf7ee 100%)" }}
      data-testid="expertise"
    >
      <div className="hi-container">
        <SectionHeading oneLine subtitle={subtitle || expertise.subtitle}>
          {title || (
            <>
              {expertise.titleA}
              {expertise.titleB}
              {expertise.titleAccent}
            </>
          )}
        </SectionHeading>

        {/* Desktop 3x2, tablet 2 per row, phone: swipeable carousel. The photos carry the HI OFFSITE branding in-scene. */}
        <div ref={shift} className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {expertise.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08} className="w-[88%] shrink-0 snap-center sm:w-auto" data-testid={`expertise-card-${i}`}>
              <SmartLink
                to={c.href}
                className="group block transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
                aria-label={c.short || c.title}
              >
                {/* clean photo — no overlay, no text on the image */}
                <div
                  data-shift
                  className="relative aspect-[2/1] overflow-hidden rounded-[18px] shadow-[0_20px_44px_-30px_rgba(0,33,49,0.55)] transition-shadow [transition-duration:600ms] group-hover:shadow-[0_28px_56px_-28px_rgba(0,33,49,0.6)]"
                >
                  <img
                    src={c.img}
                    alt={`${c.short || c.title}: HI Offsite`}
                    width="880"
                    height="440"
                    decoding="async"
                    loading="lazy"
                    className="hi-pimg absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                {/* title written separately beneath the card — editorial, single ink colour */}
                <div className="mt-4 flex items-center justify-between gap-4 px-0.5">
                  <h3 className="hi-title text-[19px] font-semibold leading-snug text-hi-ink md:text-[21px]">{c.title}</h3>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-hi-ink/25 text-hi-ink transition-colors [transition-duration:450ms] group-hover:border-transparent group-hover:bg-hi-navy group-hover:text-white">
                    <ArrowRight size={17} className="transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                  </span>
                </div>
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
