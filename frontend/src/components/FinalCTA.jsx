import React, { useRef } from "react";
import { Check } from "lucide-react";
import { finalCta, assets, stats } from "@/data/content";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import MaskedText from "@/components/MaskedText";
import { useMagnetic } from "@/lib/useMagnetic";
import RatingStars from "@/components/RatingStars";
import { useProposal } from "@/components/ProposalContext";

// Compact, centred, light CTA card with a gold-framed photo.
// title / subtitle / img let each page close with its own invitation (defaults: the home-page copy).
const FinalCTA = ({ title, subtitle, img, imgPosition = "center" } = {}) => {
  const { openProposal } = useProposal();
  const email = useRef(null);
  const ctaRef = useMagnetic(true, 4); // the closing conversion button leans a few px toward a nearby cursor
  // opens the shared proposal form, carrying over any email typed here
  const start = (e) => {
    e.preventDefault();
    openProposal({ email: email.current ? email.current.value : "" });
  };
  return (
    <section className="bg-hi-surface px-5 py-20 md:py-28" data-testid="final-cta">
      <Reveal className="hi-gold-rim mx-auto max-w-[1040px] rounded-[32px] p-px">
        <div className="hi-champagne relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[31px] p-8 md:grid-cols-[1.15fr_1fr] md:gap-12 md:p-12">
          <div className="pointer-events-none absolute -top-40 left-[30%] h-[560px] w-32 rotate-[28deg] hi-ray hi-ray-55" />

          {/* Copy + form */}
          <div className="relative">
            <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(32px, 3.4vw, 46px)", lineHeight: 1.08 }}>
              <MaskedText delay={0.25}>{title || `${finalCta.titleA} ${finalCta.titleB}`}</MaskedText>
            </h2>
            <span className="mt-5 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
            <Reveal delay={0.4}>
              <p className="mt-5 text-[16px] text-hi-ink">{subtitle || finalCta.subtitle}</p>
            </Reveal>

            <Reveal delay={0.55} className="mt-7">
            <form onSubmit={start} noValidate className="hi-gold-rim rounded-[30px] p-px sm:rounded-full">
              <div className="hi-frost-pill flex flex-col gap-2 rounded-[29px] p-1.5 sm:flex-row sm:items-center sm:rounded-full">
                <input
                  ref={email}
                  type="email"
                  placeholder={finalCta.placeholder}
                  aria-label={finalCta.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-5 py-3 text-[15px] font-medium text-hi-ink outline-none placeholder:text-hi-ink/50"
                />
                <button ref={ctaRef} type="submit" aria-haspopup="dialog" className="hi-btn hi-btn-navy hi-magnetic !px-6 !py-3.5 !text-[14px]" data-testid="final-cta-btn">
                  {finalCta.cta}
                </button>
              </div>
            </form>
            </Reveal>

            <ul className="mt-6 flex flex-col gap-2.5">
              {finalCta.perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] font-medium text-hi-ink">
                  <span className="hi-gold-chip flex h-5 w-5 items-center justify-center rounded-full text-[#b8873f]">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Gold-framed photo with a floating rating badge */}
          <div className="relative">
            <div className="hi-gold-frame overflow-hidden rounded-[26px]">
              <RevealImage
                src={img || assets.ctaBg}
                alt=""
                // the default photo is shown whole, in a frame with its own landscape proportions; photos passed in by other pages keep the portrait frame
                className={`w-full rounded-[20px] ${img ? "aspect-[4/5] md:aspect-[4/4.6]" : "aspect-[1960/1503]"}`}
                imgStyle={{ objectPosition: imgPosition }}
                delay={0.15}
              />
            </div>
            <span
              className="hi-gold-rim absolute -bottom-4 -left-4 inline-flex rounded-full p-px md:-left-6"
              aria-label={`Rated ${stats.googleRating} out of 5 on Google`}
            >
              <span className="hi-frost-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5">
                <span className="hi-display text-[18px] leading-none text-hi-ink">{stats.googleRating.toFixed(1)}</span>
                <RatingStars value={stats.googleRating} size={13} color="#c58a2c" />
                <span className="text-[12px] font-semibold text-hi-ink">{stats.rating}</span>
              </span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default FinalCTA;
