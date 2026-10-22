import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Plane } from "lucide-react";
import { destinations, hero } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { useProposal } from "@/components/ProposalContext";
import SmartLink from "@/components/SmartLink";
import { useShiftGroup } from "@/lib/useShiftGroup";

export const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Cards shown before "See more"
const INITIAL = 8;

// showAll: list every destination (the /destinations page) instead of 5 + "See more"
const Destinations = ({ showAll = false }) => {
  const shift = useShiftGroup(7); // photos drift a few px toward the cursor (desktop only), inside their frame
  const [filter, setFilter] = useState(destinations.filters[0]);
  const [expanded, setExpanded] = useState(showAll);
  const { openProposal } = useProposal();
  const india = new Set(destinations.india);
  const items = destinations.items.filter((d) =>
    filter === "India" ? india.has(d.name) : filter === "International" ? !india.has(d.name) : true
  );
  const visible = expanded ? items : items.slice(0, INITIAL);
  const hidden = items.length - INITIAL;

  return (
    <section className="bg-hi-surface py-20 md:py-28" data-testid="destinations">
      <div className="hi-container">
        <SectionHeading oneLine subtitle={destinations.subtitle}>
          {destinations.titleA}
          {destinations.titleB}
          {destinations.titleC}
        </SectionHeading>

        <div className="mt-10 flex justify-center">
          <div className="hi-card inline-flex gap-1 rounded-full p-1.5" role="tablist" aria-label="Filter destinations">
            {destinations.filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className="relative rounded-full px-5 py-2.5 text-[14px] font-semibold"
                data-testid={`dest-filter-${f.toLowerCase()}`}
              >
                {filter === f && (
                  <motion.span layoutId="dest-pill" className="absolute inset-0 rounded-full bg-hi-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className={`relative ${filter === f ? "text-white" : "text-hi-ink"}`}>{f}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div ref={shift} layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" data-testid="destinations-carousel">
          <AnimatePresence mode="popLayout">
            {visible.map((d, i) => {
              // dedicated 1:1 premium photo so the square card is pixel-perfect (no crop)
              const clean = `/images/site/dest-square-${slugify(d.name)}.jpg`;
              return (
              <motion.div
                layout
                key={d.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="group"
                data-testid={`destination-${i}`}
              >
                <SmartLink
                  to={`/destinations/${slugify(d.name)}`}
                  className="block transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
                  aria-label={d.name}
                >
                  {/* clean photo, nothing written on it */}
                  <div
                    data-shift
                    className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-hi-ink/10 shadow-[0_24px_50px_-24px_rgba(0,33,49,0.65)] transition-shadow [transition-duration:600ms] group-hover:shadow-[0_34px_64px_-22px_rgba(0,33,49,0.72)]"
                  >
                    <img
                      src={clean}
                      alt={d.name}
                      width="1200"
                      height="1200"
                      decoding="async"
                      loading="lazy"
                      className="hi-pimg absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* destination name written separately beneath the card */}
                  <div className="mt-3 flex items-center justify-between gap-3 px-0.5">
                    <h3 className="hi-title text-[15px] font-semibold leading-snug text-hi-ink md:text-[17px]">{d.name}</h3>
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-hi-ink/25 text-hi-ink transition-colors [transition-duration:450ms] group-hover:border-transparent group-hover:bg-hi-navy group-hover:text-white">
                      <ArrowUpRight size={15} className="transition-transform [transition-duration:450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </SmartLink>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hidden > 0 && !showAll && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="hi-btn hi-btn-white !pl-6"
              data-testid="dest-see-more"
            >
              <span>{expanded ? "Show less" : `See more destinations (${hidden})`}</span>
              <span className="hi-btn-icon">
                <ChevronDown size={18} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              </span>
            </button>
          </div>
        )}

        {/* Promo card: light champagne, arched gold-framed photo with a round inset */}
        <Reveal className="hi-gold-rim group mt-16 rounded-[32px] p-px" data-testid="destinations-banner">
          <div className="hi-champagne relative grid grid-cols-1 items-center overflow-hidden rounded-[31px] md:grid-cols-[1.05fr_1fr]">
            {/* soft light ray + dashed flight path */}
            <div className="pointer-events-none absolute -top-40 left-[38%] h-[560px] w-32 rotate-[28deg] hi-ray hi-ray-50" />
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1200 460" preserveAspectRatio="none" aria-hidden="true">
              <path d="M470 400 C 560 330, 600 170, 700 90" fill="none" stroke="#c9a061" strokeOpacity="0.6" strokeWidth="1.4" strokeDasharray="4 8" />
            </svg>
            <Plane size={22} strokeWidth={1.5} className="pointer-events-none absolute left-[57%] top-[13%] hidden -rotate-[35deg] text-[#b8873f] md:block" />

            {/* Copy */}
            <div className="relative z-10 px-8 py-14 md:py-20 md:pl-16 md:pr-6">
              <h3 className="hi-display text-hi-ink" style={{ fontSize: "clamp(34px, 4vw, 56px)" }}>
                <span className="sm:whitespace-nowrap">{destinations.banner.titleA}</span>
                <br />
                {destinations.banner.titleB}
              </h3>
              <p className="mt-4 max-w-[420px] text-[17px] leading-relaxed text-hi-ink">{destinations.banner.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button variant="navy" arrow="right" onClick={() => openProposal()} data-testid="dest-banner-cta">
                  {destinations.banner.cta}
                </Button>
                <span className="flex items-center gap-3 text-[14px] font-medium text-hi-ink">
                  <span className="flex -space-x-2.5">
                    {["Maldives", "Bali", "Udaipur"].map((n) => (
                      <img
                        key={n}
                        src={destinations.items.find((d) => d.name === n)?.img}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-[#fbf6ec]"
                        loading="lazy"
                      />
                    ))}
                  </span>
                  {hero.trust[1]}
                </span>
              </div>
            </div>

            {/* Arched gold-framed photo with a round inset and a frosted chip */}
            <div className="relative h-[360px] md:h-[440px]">
              <div className="hi-gold-frame absolute bottom-8 right-8 top-8 w-[68%] overflow-hidden rounded-b-[28px] rounded-t-[999px] md:right-14">
                <img
                  src={destinations.banner.bg}
                  alt=""
                  style={{ objectPosition: "30% 60%" }}
                  className="h-full w-full rounded-b-[24px] rounded-t-[999px] object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="hi-gold-frame absolute bottom-12 left-6 h-32 w-32 rounded-full md:left-4 md:h-36 md:w-36">
                <img
                  src={destinations.banner.inset}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Destinations;
