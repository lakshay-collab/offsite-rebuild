import React, { useState } from "react";
import { Plus, Mail } from "lucide-react";
import { faq, testimonials } from "@/data/content";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { oneLineSize } from "@/components/PageHero";
import { useProposal } from "@/components/ProposalContext";

// data: swap in another FAQ set (e.g. the About page). wideHeading: full-width one-line heading above the grid.
const FAQ = ({ data = faq, wideHeading = false }) => {
  const [open, setOpen] = useState(0);
  const { openProposal } = useProposal();

  return (
    <section className="bg-hi-surface px-3 py-6 md:px-5" data-testid="faq">
      <div className="hi-champagne relative overflow-hidden rounded-[32px] py-20 md:py-28">
        {/* soft light rays */}
        <div className="pointer-events-none absolute -top-40 left-[22%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
        <div className="pointer-events-none absolute -top-40 left-[60%] h-[640px] w-24 rotate-[28deg] hi-ray hi-ray-40" />

        {wideHeading && (
          <Reveal className="hi-container relative mb-12 text-center">
            <h2 className="hi-display text-hi-ink md:whitespace-nowrap" style={{ fontSize: oneLineSize(data.titleParts.join(""), 52) }}>
              {data.titleParts[0]}
              {data.titleParts[1]}
            </h2>
            <span className="mx-auto mt-5 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-hi-ink">{data.note}</p>
          </Reveal>
        )}
        <div className="hi-container relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + contact card */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              {!wideHeading && (
                <>
                  <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(36px, 4.2vw, 60px)" }}>
                    {data.titleParts[0]}
                    {data.titleParts[1]}
                  </h2>
                  <span className="mt-6 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
                  <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-hi-ink">{data.note}</p>
                </>
              )}

              {/* Light frosted contact card with a gold rim */}
              <div className={`hi-gold-rim rounded-[28px] p-px ${wideHeading ? "" : "mt-10"}`}>
                <div className="hi-frost-pill relative overflow-hidden rounded-[27px] p-7">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#e9cf9f]/40 blur-[60px]" />
                  <div className="relative flex items-center gap-4">
                    <span className="relative flex-shrink-0">
                      <span className="hi-gold-chip block rounded-full p-[3px]">
                        <img src={testimonials.cards[0].avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                      </span>
                      <span className="hi-pulse absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-[#25d366] ring-2 ring-white" />
                    </span>
                    <div>
                      <p className="hi-title text-[19px] text-hi-ink">{data.contactTitle}</p>
                      <p className="mt-0.5 text-[14px] text-hi-ink">Talk to a Corporate Offsite Specialist</p>
                    </div>
                  </div>
                  <div className="relative mt-6 h-px bg-gradient-to-r from-[#c9a061]/60 via-[#c9a061]/30 to-transparent" />
                  <div className="relative mt-6 flex flex-wrap gap-3">
                    <Button variant="navy" className="!text-[14px]" onClick={() => openProposal()} data-testid="faq-contact-specialist">
                      Talk to a Specialist
                    </Button>
                    <a
                      href="mailto:hi@hioffsite.com"
                      className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-hi-ink shadow-[0_0_0_1px_rgba(201,160,97,0.45),0_8px_20px_rgba(120,90,40,0.10)] transition-transform hover:-translate-y-0.5"
                    >
                      <Mail size={16} className="text-[#b8873f]" /> hi@hioffsite.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: accordion in one cream card, gold hairlines */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="hi-gold-rim rounded-[28px] p-px">
              <div className="hi-step-face overflow-hidden rounded-[27px]">
                {data.items.map((it, i) => {
                  const isOpen = open === i;
                  return (
                    <div
                      key={i}
                      className={`relative transition-colors duration-500 ${isOpen ? "bg-white/55" : "hover:bg-white/30"}`}
                      data-testid={`faq-item-${i}`}
                    >
                      {i > 0 && <span className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a061]/50 to-transparent" />}
                      {/* gold accent bar on the open item */}
                      <span
                        className="absolute bottom-5 left-0 top-5 w-[3px] origin-top rounded-r-full bg-gradient-to-b from-[#e2c08a] to-[#b8873f] transition-transform duration-500"
                        style={{ transform: `scaleY(${isOpen ? 1 : 0})` }}
                      />
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-5 px-7 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a061]/70 md:px-9"
                        data-testid={`faq-toggle-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                      >
                        <span className="hi-title flex-1 text-[17px] leading-snug text-hi-ink md:text-[18px]">{it.q}</span>
                        <span
                          className={`hi-gold-chip flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                            isOpen ? "rotate-45 !bg-none !bg-hi-navy text-white" : "text-hi-ink"
                          }`}
                        >
                          <Plus size={17} />
                        </span>
                      </button>
                      <div id={`faq-panel-${i}`} className={`hi-faq-body ${isOpen ? "open" : ""}`}>
                        <div>
                          <p
                            className="px-7 pb-7 pr-20 text-[15px] leading-relaxed text-hi-ink transition-all duration-500 md:px-9 md:pr-24"
                            style={{ opacity: isOpen ? 1 : 0, transform: `translateY(${isOpen ? 0 : -6}px)` }}
                          >
                            {it.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
