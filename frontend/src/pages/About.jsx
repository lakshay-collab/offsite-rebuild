import React from "react";
import { Target, Eye, ShieldCheck, Heart, Crosshair, Handshake } from "lucide-react";
import { about } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import CountUp from "@/components/CountUp";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import { CaseStudyTeaser } from "@/components/PageSections";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

const valueIcons = [Target, Eye, ShieldCheck, Heart, Crosshair, Handshake];

const Story = () => {
  const s = about.story;
  return (
    <section className="bg-hi-surface py-20 md:py-28" data-testid="about-story">
      <div className="hi-container">
        <SectionHeading oneLine>{s.title}</SectionHeading>

        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Collage: arched main image + round inset */}
          <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5">
            <div className="hi-gold-frame overflow-hidden rounded-b-[28px] rounded-t-[999px]">
              <RevealImage src={s.img} alt="A corporate team on an HI Offsite retreat" className="h-[480px] rounded-b-[22px] rounded-t-[999px]" />
            </div>
            <div className="hi-gold-frame absolute -bottom-6 -right-2 h-36 w-36 rounded-full md:-right-8 md:h-44 md:w-44">
              <RevealImage src={s.inset} alt="" className="h-full w-full rounded-full" delay={0.35} />
            </div>
            <Reveal delay={0.5} className="absolute -left-2 top-10 md:-left-8">
              <span className="hi-gold-rim inline-flex rounded-2xl p-px">
                <span className="hi-frost-pill flex flex-col rounded-[15px] px-5 py-3">
                  <span className="hi-display text-[30px] leading-none text-hi-ink"><CountUp value={s.stats[0].value} /></span>
                  <span className="mt-1 text-[12px] font-medium text-hi-ink">{s.stats[0].label}</span>
                </span>
              </span>
            </Reveal>
          </div>

          {/* Story copy */}
          <div className="lg:col-span-7 lg:pl-6">
            {s.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`text-[16px] leading-[1.8] text-hi-ink ${i ? "mt-5" : ""}`}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <blockquote className="mt-8 border-l-2 border-[#c9a061] pl-6">
                <p className="hi-title text-[19px] leading-snug text-hi-ink">{s.mission}</p>
              </blockquote>
            </Reveal>

            {/* stats row */}
            <div className="mt-10 grid grid-cols-2 gap-y-6 border-t border-[#c9a061]/40 pt-8 sm:grid-cols-4">
              {s.stats.map((st, i) => (
                <Reveal key={st.label} delay={0.1 + i * 0.08} className={`sm:px-4 ${i ? "sm:border-l sm:border-[#c9a061]/30" : "sm:pl-0"}`}>
                  <div className="hi-display text-[34px] leading-none text-hi-ink"><CountUp value={st.value} /></div>
                  <div className="mt-2 text-[13px] text-hi-ink">{st.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  const v = about.values;
  return (
    <section className="bg-hi-surface px-5 py-10" data-testid="about-values">
      <div className="hi-gold-rim mx-auto max-w-[1160px] rounded-[32px] p-px">
        <div className="hi-champagne relative overflow-hidden rounded-[31px] px-6 py-14 md:px-12 md:py-16">
          <div className="pointer-events-none absolute -top-40 left-[26%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
          <SectionHeading oneLine subtitle={v.subtitle}>
            {v.title}
          </SectionHeading>
          <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {v.items.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={item.title} delay={(i % 3) * 0.1}>
                  <div className="hi-cream-card hi-lift group h-full rounded-[22px] p-7">
                    <span className="hi-gold-chip flex h-12 w-12 items-center justify-center rounded-full text-hi-ink transition-all duration-500 group-hover:!bg-none group-hover:!bg-hi-navy group-hover:text-white">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <h3 className="hi-title mt-5 text-[19px] text-hi-ink">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-hi-ink">{item.desc}</p>
                    <span className="mt-5 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a] transition-all duration-500 group-hover:w-20" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const t = about.team;
  return (
    <section id="team" className="scroll-mt-24 bg-hi-surface py-20 md:py-28" data-testid="about-team">
      <div className="hi-container">
        <SectionHeading oneLine subtitle={t.subtitle}>
          {t.title}
        </SectionHeading>

        {/* Leadership portraits */}
        <div className="mx-auto mt-14 grid max-w-[880px] grid-cols-1 gap-10 sm:grid-cols-2">
          {t.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.15} className="group text-center" data-testid={`leader-${i}`}>
              <div className="relative mx-auto max-w-[350px] pb-4 pr-4">
                {/* offset gold hairline frame — slides in to meet the portrait on hover */}
                <span className="absolute bottom-0 left-4 right-0 top-4 rounded-[26px] border border-[#c9a061] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2" />
                <span className="absolute -left-2 -top-2 h-10 w-10 rounded-tl-[30px] border-l-2 border-t-2 border-[#c9a061]" />
                <div className="hi-shimmer relative overflow-hidden rounded-[26px] shadow-[0_30px_60px_-20px_rgba(0,33,49,0.35)]">
                  <RevealImage
                    src={p.img}
                    alt={`${p.name}, ${p.role}`}
                    delay={i * 0.15}
                    className="aspect-[4/5] bg-[#eef0f1]"
                    imgClassName="object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,33,49,0.75)] to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-left">
                    <h3 className="hi-display text-[24px] leading-tight text-white">{p.name}</h3>
                    <p className="mt-1 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      <span className="h-px w-5 bg-[#e2c08a]" />
                      {p.role}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mx-auto mt-6 max-w-[320px] text-[15px] leading-relaxed text-hi-ink">{p.line}</p>
            </Reveal>
          ))}
        </div>

        {/* Whole team */}
        <Reveal className="mx-auto mt-20 max-w-[1160px]">
          <div className="hi-gold-rim rounded-[30px] p-px">
            <div className="hi-champagne relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[29px] px-8 py-14 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-16 md:py-20">
              {/* soft light ray */}
              <div className="pointer-events-none absolute -top-40 left-[20%] h-[560px] w-32 rotate-[28deg] hi-ray hi-ray-50" />

              {/* Photo: shown whole at its own aspect ratio, in a gold frame */}
              <div className="relative mx-auto w-full max-w-[440px] px-3">
                <div className="hi-gold-frame group rounded-[28px]">
                  <div className="relative overflow-hidden rounded-[22px]">
                    <img
                      src={t.groupImg2}
                      alt="The HI Offsite team celebrating an award in the office"
                      className="block aspect-[606/667] w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_-60px_80px_-40px_rgba(0,33,49,0.35)]" />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="relative z-10 text-center md:text-left">
                <h3 className="hi-display text-hi-ink" style={{ fontSize: "clamp(30px, 3.6vw, 52px)" }}>
                  {t.groupTitle}
                </h3>
                <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-hi-ink md:mx-0 mx-auto">{t.groupText}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const About = () => (
  <main data-testid="about-page">
    <PageLoader />
    <PageHero title={about.hero.title} img={about.hero.img} alt="The HI Offsite team" testId="about-hero" low />
    <Story />
    <Values />
    <Team />
    <CaseStudyTeaser subtitle="A few of the programmes behind the numbers." tone="champagne" />
    <FAQ data={about.faq} wideHeading />
    <FinalCTA title="Plan Your Next Offsite With Our Team" img="/images/site/about-cta.webp" imgPosition="28% center" />
  </main>
);

export default About;
