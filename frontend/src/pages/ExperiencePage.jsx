import React from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { destinationPages } from "@/data/pages";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import Button from "@/components/Button";
import { GenericSection } from "@/components/ContentBlocks";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import FinalCTA from "@/components/FinalCTA";
import { useProposal } from "@/components/ProposalContext";

// URL prefix → collection in experiences.json, and how the kind reads in copy
export const experienceKinds = {
  hotels: { prefix: "/destination-hotels", label: "Stays", cta: "Plan a stay here" },
  tours: { prefix: "/destination-tours", label: "Tours", cta: "Plan this tour" },
  activities: { prefix: "/destinations-activities", label: "Experiences", cta: "Add this to your offsite" },
};

// a template photo the live site left on every tour page (unrelated to the tour), so it's skipped
const leftoverImg = /cebcd1_4\.png$/;

// The other stays, tours and experiences in the same destination
const MoreHere = ({ item, dest }) => {
  const { data } = useContent("experiences.json");
  const mine = dest && data && data.byDestination && data.byDestination[dest.slug];
  if (!mine) return null;
  const others = Object.entries(experienceKinds).flatMap(([kind, k]) =>
    (mine[kind] || [])
      .filter((slug) => slug !== item.slug)
      .map((slug) => (data[kind] || {})[slug])
      .filter(Boolean)
      .map((it) => ({ it, k }))
  );
  if (!others.length) return null;
  return (
    <section className="bg-hi-surface px-3 py-6 md:px-5" data-testid="experience-more">
      <div className="hi-champagne relative overflow-hidden rounded-[32px] py-16 md:py-20">
        <div className="hi-container relative">
          <SectionHeading oneLine compact subtitle="Stays, tours and experiences we can combine into one programme.">
            {`More in ${dest.name}`}
          </SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 6).map(({ it, k }, i) => (
              <Reveal key={`${k.prefix}/${it.slug}`} delay={(i % 3) * 0.06} className="h-full">
                <PostCard to={`${k.prefix}/${it.slug}`} img={(it.card && it.card.img) || (it.hero && it.hero.img)} title={(it.card && it.card.title) || it.name} tag={k.label} cta="Explore" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = ({ item, kind }) => {
  const { openProposal } = useProposal();
  const dest = destinationPages.find((d) => d.slug === item.destination);
  const name = item.name || (item.hero && item.hero.eyebrow) || "";
  return (
    <main data-testid="experience-page">
      <PageLoader />
      <PageHero title={(item.hero && item.hero.title) || name} img={item.hero && item.hero.img} alt={name} testId="experience-hero" />

      <section className="bg-hi-surface pt-14">
        <div className="hi-container flex flex-col items-center gap-5 text-center">
          {dest && (
            <SmartLink to={`/destinations/${dest.slug}`} className="hi-link inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-hi-ink">
              <ArrowLeft size={14} /> {dest.name}
            </SmartLink>
          )}
          {name && <p className="hi-display text-[30px] text-hi-ink">{name}</p>}
          {item.hero && item.hero.subtitle && <p className="max-w-[680px] text-[17px] leading-relaxed text-hi-ink">{item.hero.subtitle}</p>}
          <Button variant="navy" onClick={() => openProposal(dest ? { destination: dest.name } : {})} data-testid="experience-cta">
            {(item.hero && item.hero.cta) || experienceKinds[kind].cta}
          </Button>
        </div>
      </section>

      {(item.sections || []).map((s) => ({ ...s, imgs: (s.imgs || []).filter((u) => !leftoverImg.test(u)) })).map((s, i) => (
        <GenericSection key={i} section={s} alt={name} tone={i % 2 ? "champagne" : "plain"} />
      ))}
      <MoreHere item={item} dest={dest} />
      <FinalCTA
        title={dest ? `Plan Your Offsite in ${dest.name}` : undefined}
        img={item.hero && item.hero.img}
      />
    </main>
  );
};

// /destination-hotels/<slug>, /destination-tours/<slug>, /destinations-activities/<slug>
const ExperiencePage = ({ kind }) => {
  const { slug } = useParams();
  const state = useContent("experiences.json", (all) => (all[kind] || {})[slug], `${kind}/${slug}`);
  return <ContentGate state={state}>{(item) => <Experience key={slug} item={item} kind={kind} />}</ContentGate>;
};

export default ExperiencePage;
