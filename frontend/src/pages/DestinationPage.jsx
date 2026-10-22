import React from "react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/content";
import { destinationPages } from "@/data/pages";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import Button from "@/components/Button";
import { OfferingsIn, DestinationGuides } from "@/components/PageSections";
import FinalCTA from "@/components/FinalCTA";
import { useProposal } from "@/components/ProposalContext";
import { useContent } from "@/components/useContent";
import PostCard from "@/components/PostCard";
import { slugify } from "@/components/Destinations";
import { experienceKinds } from "@/pages/ExperiencePage";

// "What we have ready": the destination's three track-record numbers on a champagne card
const Stats = ({ page }) => {
  if (!page.stats || !page.stats.length) return null;
  return (
    <section className="bg-hi-surface px-5 pt-16" data-testid="destination-stats">
      <div className="hi-gold-rim mx-auto max-w-[1160px] rounded-[32px] p-px">
        <div className="hi-champagne relative overflow-hidden rounded-[31px] px-6 py-12 md:px-12 md:py-14">
          <div className="pointer-events-none absolute -top-40 left-[30%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
          {page.statsTitle && (
            <SectionHeading oneLine compact>
              {page.statsTitle}
            </SectionHeading>
          )}
          <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
            {page.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className={`text-center sm:px-6 ${i ? "sm:border-l sm:border-[#c9a061]/35" : ""}`}>
                <div className="hi-display leading-none text-hi-ink" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
                  {s.value}
                </div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-hi-ink">{s.label}</div>
                {s.caption && <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-relaxed text-hi-ink">{s.caption}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// "Discover": the destination's story beside an arched, gold-framed photo
const Discover = ({ page }) => {
  const { openProposal } = useProposal();
  const a = page.about;
  if (!a) return null;
  return (
    <section className="bg-hi-surface py-20 md:py-28" data-testid="destination-about">
      <div className="hi-container grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        {a.img && (
          <div className="relative mx-auto w-full max-w-[440px] lg:col-span-5">
            <div className="hi-gold-frame overflow-hidden rounded-b-[28px] rounded-t-[999px]">
              <RevealImage src={a.img} alt={page.name} className="h-[500px] rounded-b-[22px] rounded-t-[999px]" />
            </div>
          </div>
        )}
        <div className={a.img ? "lg:col-span-7 lg:pl-6" : "lg:col-span-12 text-center"}>
          <Reveal>
            <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.1 }}>
              {a.title}
            </h2>
            <span className="mt-6 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
          </Reveal>
          {a.text && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[600px] text-[17px] leading-[1.8] text-hi-ink">{a.text}</p>
            </Reveal>
          )}
          <Reveal delay={0.2} className="mt-9">
            <Button variant="navy" onClick={() => openProposal({ destination: page.name })} data-testid="destination-plan">
              Plan an offsite in {page.name}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Where to stay, tours and things to do in this destination (only some destinations have them)
const Experiences = ({ page }) => {
  const { data } = useContent("experiences.json");
  const mine = data && data.byDestination && data.byDestination[page.slug];
  if (!mine) return null;
  const groups = Object.entries(experienceKinds)
    .map(([kind, k]) => ({ kind, ...k, items: (mine[kind] || []).map((slug) => (data[kind] || {})[slug]).filter(Boolean) }))
    .filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <section className="bg-hi-surface px-3 py-6 md:px-5" data-testid="destination-experiences">
      <div className="hi-champagne relative overflow-hidden rounded-[32px] py-16 md:py-20">
        <div className="pointer-events-none absolute -top-40 left-[26%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
        <div className="hi-container relative">
          <SectionHeading oneLine subtitle="Handpicked stays, curated tours and experiences, all managed end to end.">
            {`Stay, Explore & Experience ${page.name}`}
          </SectionHeading>
          {groups.map((g) => (
            <div key={g.kind} className="mt-14">
              <Reveal className="flex items-center gap-4">
                <h3 className="hi-title text-[22px] text-hi-ink">{g.label}</h3>
                <span className="h-px flex-1 bg-gradient-to-r from-[#c9a061] to-transparent" />
              </Reveal>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it, i) => {
                  const card = it.card || {};
                  return (
                    <Reveal key={it.slug} delay={(i % 3) * 0.08} className="h-full">
                      <PostCard
                        to={`${g.prefix}/${it.slug}`}
                        img={card.img || (it.hero && it.hero.img)}
                        title={card.title || it.name}
                        tag={g.label}
                        testId={`dest-${g.kind}-${i}`}
                        cta="Explore"
                      />
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Three other destinations to keep exploring
const MoreDestinations = ({ page }) => {
  const others = destinationPages.filter((d) => d.slug !== page.slug);
  const start = Math.max(0, destinationPages.findIndex((d) => d.slug === page.slug)) % Math.max(1, others.length);
  const picks = [0, 1, 2].map((k) => others[(start + k) % others.length]).filter(Boolean);
  const cardImg = (d) => destinations.items.find((x) => x.name === d.name)?.img || d.hero.img;
  return (
    <section className="bg-hi-surface pb-24" data-testid="destination-more">
      <div className="hi-container">
        <SectionHeading oneLine compact>
          Keep Exploring
        </SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {picks.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.1}>
              <SmartLink to={`/destinations/${d.slug}`} className="hi-lift group relative block h-[300px] overflow-hidden rounded-2xl shadow-hi-card">
                <img src={cardImg(d)} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,33,49,0.85), rgba(0,33,49,0.25) 40%, rgba(0,33,49,0) 65%)" }} />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                  <h3 className="hi-display text-[30px] leading-none text-white">{d.name}</h3>
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-hi-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
                    <ArrowUpRight size={18} />
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

// other spellings our articles use for a destination
const guideAliases = { "andaman-islands": ["Andaman"], "jim-corbett": ["Corbett"], "sri-lanka": ["Sri Lanka"] };

// The banner uses the same picture as the destination's card on the home page (its `hero` artwork);
// destinations without one keep their own hero photo.
const heroFor = (page) => {
  const item = destinations.items.find((d) => slugify(d.name) === page.slug);
  return (item && item.hero) || page.hero.img;
};

// One template for every /destinations/<slug> page
const DestinationPage = ({ page }) => (
  <main data-testid="destination-page">
    <PageLoader />
    <PageHero title={page.hero.title || page.name} img={heroFor(page)} alt={page.name} testId="destination-hero" />
    <Stats page={page} />
    <Discover page={page} />
    <Experiences page={page} />
    <OfferingsIn name={page.name} />
    <DestinationGuides name={page.name} aliases={guideAliases[page.slug]} tone="champagne" />
    <MoreDestinations page={page} />
    <FinalCTA
      title={`Plan Your Offsite in ${page.name}`}
      subtitle={page.hero.tagline || undefined}
      img={(page.about && page.about.img) || page.hero.img}
    />
  </main>
);

export default DestinationPage;
