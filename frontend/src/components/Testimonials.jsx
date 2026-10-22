import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Plane, UserRound } from "lucide-react";
import { testimonials } from "@/data/content";
import RatingStars from "@/components/RatingStars";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

// Sample (placeholder) reviews are only shown outside production builds
const SHOW_SAMPLES = process.env.NODE_ENV !== "production";
const reviews = testimonials.cards.filter((c) => SHOW_SAMPLES || !c.sample);
const tabs = testimonials.tabs.filter((t) => reviews.some((c) => c.team === t));

// Gentle 3D tilt toward the cursor
const tilt = (e) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(card, { rotateY: x * 6, rotateX: -y * 6, y: -6, duration: 0.6, ease: "power3.out", overwrite: "auto" });
};
const untilt = (e) =>
  gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.6)", overwrite: "auto" });

const Testimonials = () => {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(0); // tab whose cards are currently rendered
  const grid = useRef(null);
  const entered = useRef(false);
  const visible = reviews.filter((c) => c.team === tabs[shown]);

  // First appearance: cards rise and unfold in a stagger as the section scrolls in
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hi-review", {
        y: 70,
        rotateX: -18,
        opacity: 0,
        scale: 0.94,
        transformPerspective: 1000,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: grid.current, start: "top 82%", once: true },
        onComplete: () => (entered.current = true),
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  // Tab change: current cards drift out, the next set flips in
  const switchTab = (i) => {
    if (i === tab) return;
    setTab(i);
    const cards = grid.current.querySelectorAll(".hi-review");
    gsap.to(cards, {
      y: -24,
      opacity: 0,
      rotateX: 10,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.05,
      overwrite: true,
      onComplete: () => setShown(i),
    });
  };
  const step = (dir) => switchTab((tab + dir + tabs.length) % tabs.length);

  useLayoutEffect(() => {
    if (!entered.current && shown === 0) return;
    const cards = grid.current.querySelectorAll(".hi-review");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, rotateX: -14, scale: 0.96, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.85, ease: "power3.out", stagger: 0.1, overwrite: true }
    );
  }, [shown]);

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #fbf9f3 0%, #f6f1e7 100%)" }}
      data-testid="testimonials"
    >
      {/* dashed flight path + plane, top right (desktop) */}
      <svg className="pointer-events-none absolute right-[6%] top-16 hidden h-[190px] w-[300px] lg:block" viewBox="0 0 300 190" fill="none" aria-hidden="true">
        <path d="M20 190 C 70 110, 170 70, 262 28" stroke="#fb7f26" strokeOpacity="0.7" strokeWidth="1.3" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
      <Plane size={26} strokeWidth={1.8} className="pointer-events-none absolute right-[5%] top-[52px] hidden -rotate-[18deg] fill-hi-orange text-hi-orange lg:block" aria-hidden="true" />

      <div className="hi-container relative">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <div className="flex items-center justify-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-hi-ink/70">
            <span>{testimonials.eyebrow}</span>
            <span className="h-px w-16 bg-hi-orange" />
          </div>
          <h2 className="hi-display mt-5 text-hi-ink" style={{ fontSize: "clamp(34px, 4.6vw, 62px)", lineHeight: 1.08 }}>
            {testimonials.titleA}
            {testimonials.titleB}
            <br className="hidden sm:block" />
            {testimonials.titleAccent}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-hi-ink">{testimonials.subtitle}</p>
        </Reveal>

        <div className="relative mt-9 flex items-center justify-center">
          <div className="hi-card no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5" role="tablist" aria-label="Testimonials by team">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === i}
                onClick={() => switchTab(i)}
                className="relative flex-shrink-0 rounded-full px-5 py-2.5 text-[14px] font-semibold"
                data-testid={`testimonial-tab-${i}`}
              >
                {tab === i && (
                  <motion.span layoutId="tst-pill" className="absolute inset-0 rounded-full bg-hi-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className={`relative ${tab === i ? "text-white" : "text-hi-ink"}`}>{t}</span>
              </button>
            ))}
          </div>

          {/* previous / next group */}
          <div className="absolute right-0 hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous group of reviews"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_6px_18px_rgba(60,40,10,0.12)] transition-transform duration-300 hover:-translate-x-0.5"
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next group of reviews"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-hi-orange text-white shadow-[0_8px_20px_rgba(251,127,38,0.35)] transition-transform duration-300 hover:translate-x-0.5"
              data-testid="testimonial-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div ref={grid} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3" style={{ perspective: 1200 }} role="tabpanel">
          {visible.map((c, i) => (
            <figure
              key={`${shown}-${i}`}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              className="hi-review relative grid grid-rows-[2fr_3fr] overflow-hidden rounded-[22px] bg-white text-hi-ink shadow-hi-card ring-1 ring-[#c9a061]/15 [transform-style:preserve-3d]"
              data-testid={`testimonial-card-${i}`}
            >
              {/* photo header: 40% of the card's height (text gets the other 60%), with a soft white swoosh along its lower edge */}
              <div className="relative w-full">
                {c.photo && <img src={c.photo} alt="" className="absolute inset-0 h-full w-full object-cover" width="1800" height="1050" decoding="async" loading="lazy" />}
                <svg className="absolute inset-x-0 -bottom-px h-[34px] w-full" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 22 C 70 4, 150 2, 230 14 C 300 25, 360 24, 400 8 L400 35 L0 35 Z" fill="#fff" />
                </svg>
                <span className="pointer-events-none absolute -bottom-px right-0 h-[34px] w-1/2 bg-[radial-gradient(ellipse_70%_100%_at_100%_100%,rgba(251,127,38,0.16),transparent_70%)]" />
              </div>

              <div className="relative flex min-h-0 flex-col px-7 pb-6 pt-4">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[15px] font-semibold tabular-nums leading-none">{c.rating.toFixed(1)}</span>
                  <RatingStars value={c.rating} size={16} />
                </div>
                <blockquote className="relative mt-5 flex-1 font-title text-[17px] font-normal leading-[1.65] tracking-[-0.005em]">
                  {c.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-hi-line pt-4">
                  <div className="flex items-center gap-3">
                    {c.avatar ? (
                      <img src={c.avatar} alt={c.name || ""} className="h-12 w-12 rounded-full object-cover ring-2 ring-white" loading="lazy" />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hi-cream">
                        <UserRound size={21} strokeWidth={1.6} />
                      </span>
                    )}
                    <div>
                      {c.name && <div className="text-[16px] font-semibold leading-tight">{c.name}</div>}
                      <div className={c.name ? "mt-0.5 text-[14px] text-hi-ink/75" : "text-[15px] font-semibold"}>{c.role}</div>
                    </div>
                  </div>
                  {/* only genuine reviews carry a client logo */}
                  {!c.sample && c.logo && (
                    <span className="flex h-11 items-center rounded-full bg-white px-4 ring-1 ring-black/[0.06]">
                      <img src={c.logo} alt="" className="h-5 w-auto max-w-[80px] object-contain" loading="lazy" />
                    </span>
                  )}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
