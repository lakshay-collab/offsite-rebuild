import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import { about, hero, footer } from "@/data/content";
import { contactPage } from "@/data/pages";
import Reveal from "@/components/Reveal";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import ProposalForm from "@/components/ProposalForm";

// Pick an icon from what the detail is (by its link, else its label)
const iconFor = (d) => {
  const s = `${d.href || ""} ${d.label || ""}`.toLowerCase();
  if (s.includes("mailto") || s.includes("email")) return Mail;
  if (s.includes("wa.me") || s.includes("whatsapp")) return MessageCircle;
  if (s.includes("tel:") || s.includes("phone") || s.includes("call")) return Phone;
  if (s.includes("hour") || s.includes("time")) return Clock;
  return MapPin;
};

// The live page shows email/phone/address as plain text; make each one actionable here
const withLink = (d) => {
  if (d.href) return d;
  const v = d.value || "";
  if (/@/.test(v)) return { ...d, href: `mailto:${v.trim()}` };
  if (/^[+\d\s()-]{7,}$/.test(v)) return { ...d, href: `tel:${v.replace(/[^\d+]/g, "")}` };
  if (/address/i.test(d.label || "")) return { ...d, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}` };
  return d;
};

const Contact = () => {
  const c = contactPage || {};
  const intro = c.hero || {};
  const details = (c.details || []).filter((d) => d && d.value).map(withLink);
  const wa = footer.whatsapp;
  if (wa) details.push({ label: "WhatsApp", value: wa.display, href: `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.message)}` });
  return (
    <main data-testid="contact-page">
      <PageLoader />
      <PageHero
        title={intro.title || "Let's Plan Something Remarkable"}
        img={intro.img || about.team.groupImg}
        alt="The HI Offsite team"
        testId="contact-hero"
      />

      <section className="bg-hi-surface py-20 md:py-28" data-testid="contact-body">
        <Reveal className="hi-container mb-14 text-center">
          <h2 className="hi-display text-hi-ink md:whitespace-nowrap" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            {(c.extra || []).find((x) => x.text && !/@/.test(x.text))?.text || "Talk to a Specialist"}
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
          {(c.formSubtitle || intro.subtitle) && (
            <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-hi-ink">{c.formSubtitle || intro.subtitle}</p>
          )}
        </Reveal>
        <div className="hi-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left: how to reach us */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              {details.map((d, i) => {
                const Icon = iconFor(d);
                const body = (
                  <>
                    <span className="hi-gold-chip flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-hi-ink transition-all duration-500 group-hover:!bg-none group-hover:!bg-hi-navy group-hover:text-white">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-hi-ink">{d.label}</span>
                      <span className="mt-1 block break-words text-[16px] leading-snug text-hi-ink">{d.value}</span>
                    </span>
                    {d.href && <ArrowUpRight size={17} className="flex-shrink-0 text-hi-ink transition-transform duration-500 group-hover:rotate-45" />}
                  </>
                );
                const cls = "hi-cream-card hi-lift group flex items-center gap-4 rounded-[20px] p-5";
                return (
                  <Reveal key={`${d.label}-${i}`} delay={i * 0.06}>
                    {d.href ? (
                      <SmartLink to={d.href} className={cls} data-testid={`contact-detail-${i}`}>
                        {body}
                      </SmartLink>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

          </div>

          {/* Right: the proposal form inline, framed like the popup */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="hi-gold-rim rounded-[30px] p-px">
              <div className="grid overflow-hidden rounded-[29px] bg-white md:grid-cols-[0.8fr_1fr]">
                <div className="relative hidden md:block">
                  <img src={hero.proposalForm.image} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,33,49,0.8), rgba(0,33,49,0) 60%)" }} />
                  <p className="hi-display absolute inset-x-0 bottom-0 p-7 text-[28px] leading-tight text-white">Plan your corporate offsite</p>
                </div>
                <div className="p-6 md:p-10" data-testid="contact-form">
                  <ProposalForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default Contact;
