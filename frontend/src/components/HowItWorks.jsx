import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { howItWorks } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import { EASE } from "@/lib/motion";

// "Effortless by Design" — a horizontal expanding image accordion.
// Desktop: three connected photo panels; the active one grows to ~60% while the others
// stay narrow. Hovering (or focusing) a panel smoothly animates the widths, scales the
// image, and reveals that panel's description. A minimal three-part progress line below
// tracks the active panel in brand orange.
// Phones / reduced motion: the three panels stack as full, readable cards.

const OPEN = 820; // ms — premium, no bounce

const HowItWorks = () => {
  const reduce = useReducedMotion();
  const steps = howItWorks.steps;
  const [active, setActive] = useState(0);
  const panels = useRef([]);
  // While the page is scrolling, the browser fires mouseenter on whatever panel slides under a
  // still cursor — which would pop a card open uninvited. We suppress hover until scrolling settles,
  // so the section always arrives on the first card and only reacts once the user pauses and moves.
  const scrollQuietUntil = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bump = () => (scrollQuietUntil.current = Date.now() + 260);
    window.addEventListener("scroll", bump, { passive: true });
    window.addEventListener("wheel", bump, { passive: true });
    window.addEventListener("touchmove", bump, { passive: true });
    return () => {
      window.removeEventListener("scroll", bump);
      window.removeEventListener("wheel", bump);
      window.removeEventListener("touchmove", bump);
    };
  }, []);

  // Hover only takes effect once the page has stopped scrolling for a beat.
  const hoverActivate = (i) => {
    if (Date.now() < scrollQuietUntil.current) return;
    setActive(i);
  };

  // Touch / small screens: set the active panel to whichever card is most centred as you scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const i = panels.current.indexOf(e.target);
            if (i >= 0) setActive(i);
          }
        });
      },
      { threshold: [0.6], rootMargin: "-20% 0px -20% 0px" }
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <section className="relative z-10 bg-hi-surface py-20 md:py-28" data-testid="how-it-works">
      <div className="hi-container">
        <SectionHeading subtitle={howItWorks.subtitle}>
          {howItWorks.titleA}
          {howItWorks.titleB}
        </SectionHeading>

        {/* ------- Desktop: horizontal expanding accordion ------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12 hidden lg:block lg:mt-16"
        >
          <div
            className="flex gap-[2px] overflow-hidden rounded-[28px] bg-[#e7ddcb] shadow-[0_30px_70px_-45px_rgba(23,67,88,0.55)]"
            style={{ height: "clamp(460px, 56vh, 580px)" }}
            onMouseLeave={() => {}}
          >
            {steps.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.title}
                  ref={(el) => (panels.current[i] = el)}
                  role="button"
                  tabIndex={0}
                  aria-label={s.title}
                  onMouseEnter={() => hoverActivate(i)}
                  onMouseMove={() => hoverActivate(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="group relative min-w-[96px] cursor-pointer overflow-hidden outline-none"
                  style={{
                    flexGrow: isActive ? 3 : 1,
                    flexBasis: 0,
                    transition: `flex-grow ${OPEN}ms var(--hi-ease)`,
                  }}
                  data-testid={`step-${i + 1}`}
                >
                  {/* photo — full height, scales gently as the panel opens */}
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(1.08)",
                      filter: isActive ? "brightness(1) saturate(1)" : "brightness(0.62) saturate(0.88)",
                      transition: `transform ${OPEN + 180}ms var(--hi-ease), filter ${OPEN}ms var(--hi-ease)`,
                    }}
                  />
                  {/* extra teal veil deepens the dim on the resting panels */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: "#0a1c24",
                      opacity: isActive ? 0 : 0.28,
                      transition: `opacity ${OPEN}ms var(--hi-ease)`,
                    }}
                  />
                  {/* bottom-to-top dark overlay for legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(10,28,36,0.86) 0%, rgba(10,28,36,0.34) 42%, rgba(10,28,36,0) 70%)"
                        : "linear-gradient(to top, rgba(10,28,36,0.72) 0%, rgba(10,28,36,0.2) 55%, rgba(10,28,36,0) 85%)",
                      transition: `background ${OPEN}ms var(--hi-ease)`,
                    }}
                  />

                  {/* copy, bottom-left */}
                  <div className="absolute inset-x-0 bottom-0 p-7 xl:p-9">
                    <h3
                      className="hi-display text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
                      style={{
                        fontSize: isActive ? "clamp(30px, 2.6vw, 44px)" : "clamp(20px, 1.5vw, 24px)",
                        lineHeight: 1.08,
                        transition: `font-size ${OPEN}ms var(--hi-ease)`,
                      }}
                    >
                      {s.title}
                    </h3>
                    {/* restrained orange accent under the active title */}
                    <span
                      className="mt-4 block h-[3px] rounded-full bg-hi-orange-deep"
                      style={{
                        width: isActive ? 54 : 0,
                        opacity: isActive ? 1 : 0,
                        transition: `width ${OPEN}ms var(--hi-ease), opacity ${OPEN}ms var(--hi-ease)`,
                      }}
                    />
                    {/* description — revealed only when expanded */}
                    <div
                      className="overflow-hidden"
                      style={{
                        maxHeight: isActive ? 140 : 0,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                        transition: `max-height ${OPEN}ms var(--hi-ease), opacity ${OPEN}ms var(--hi-ease), transform ${OPEN}ms var(--hi-ease)`,
                      }}
                    >
                      <p className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-white/90">{s.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* minimal three-part progress line */}
          <div className="mx-auto mt-8 flex max-w-[520px] gap-2">
            {steps.map((s, i) => (
              <span
                key={s.title}
                className="h-[3px] flex-1 rounded-full"
                style={{
                  background: active === i ? "#E75E26" : "rgba(23,67,88,0.14)",
                  transition: `background ${OPEN}ms var(--hi-ease)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ------- Phones / reduced motion: readable stacked cards ------- */}
        <div className="mt-10 flex flex-col gap-5 lg:hidden">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              ref={(el) => (panels.current[i] = el)}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative h-[380px] overflow-hidden rounded-[24px] shadow-[0_24px_50px_-38px_rgba(23,67,88,0.6)]"
              data-testid={`step-m-${i + 1}`}
            >
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,28,36,0.86) 0%, rgba(10,28,36,0.3) 46%, rgba(10,28,36,0) 72%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="hi-display text-white" style={{ fontSize: "clamp(26px, 7vw, 34px)", lineHeight: 1.1 }}>
                  {s.title}
                </h3>
                <span className="mt-3 block h-[3px] w-12 rounded-full bg-hi-orange-deep" />
                <p className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-white/90">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
