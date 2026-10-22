import React from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import FinalCTA from "@/components/FinalCTA";

const CaseGrid = ({ items, exclude }) => {
  const list = items.filter((c) => c.slug !== exclude);
  return (
    <div className={`mt-10 grid grid-cols-1 gap-6 ${list.length > 1 ? "md:grid-cols-2" : ""} ${list.length > 2 ? "lg:grid-cols-3" : ""}`}>
      {list.map((c, i) => (
        <Reveal key={c.slug} delay={i * 0.08} className="h-full">
          <PostCard to={`/case-studies/${c.slug}`} img={c.img} title={c.title} tag={c.tag || c.client} testId={`case-card-${i}`} />
        </Reveal>
      ))}
    </div>
  );
};

// /case-studies
export const CaseStudiesIndex = () => {
  const state = useContent("case-studies.json");
  return (
    <ContentGate state={state}>
      {(data) => {
        const items = data.items || [];
        return (
          <main data-testid="cases-page">
            <PageLoader />
            <PageHero title={(data.hero && data.hero.title) || "Experiences That Made an Impact"} img={items[0] && items[0].img} testId="cases-hero" />
            <section className="bg-hi-surface py-20 md:py-28">
              <div className="hi-container">
                {data.hero && data.hero.subtitle && (
                  <Reveal className="mx-auto max-w-[640px] text-center text-[17px] leading-relaxed text-hi-ink">{data.hero.subtitle}</Reveal>
                )}
                <CaseGrid items={items} />
              </div>
            </section>
            <FinalCTA title="Your Team Could Be the Next Story" img={items[1] && items[1].img} />
          </main>
        );
      }}
    </ContentGate>
  );
};

// /case-studies/<slug>
export const CaseStudyPage = () => {
  const { slug } = useParams();
  const state = useContent("case-studies.json", (data) => ({ all: data.items || [], item: (data.items || []).find((c) => c.slug === slug) }), slug);
  const gate = { ...state, data: state.data && state.data.item ? state.data : null };
  return (
    <ContentGate state={gate}>
      {({ all, item }) => (
        <main key={slug} data-testid="case-page">
          <PageLoader />
          <PageHero title={item.title} img={item.heroImg || item.img} wrap={item.title.length > 48} testId="case-hero">
            {(item.client || item.tag) && (
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white">{[item.client, item.tag].filter(Boolean).join(" · ")}</p>
            )}
          </PageHero>

          {(item.facts || []).length > 0 && (
            <section className="bg-hi-surface px-5 pt-16">
              <div className="hi-gold-rim mx-auto max-w-[1060px] rounded-[30px] p-px">
                <div className="hi-champagne grid grid-cols-2 gap-6 rounded-[29px] px-6 py-10 md:grid-cols-4 md:px-10">
                  {item.facts.map((f, i) => (
                    <Reveal key={i} delay={i * 0.06} className="text-center">
                      <div className="hi-display text-[34px] leading-none text-hi-ink">{f.value}</div>
                      <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-hi-ink">{f.label}</div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-hi-surface py-16 md:py-20">
            <article className="hi-container max-w-[820px]">
              <SmartLink to="/case-studies" className="hi-link mb-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-hi-ink">
                <ArrowLeft size={14} /> All case studies
              </SmartLink>
              {item.excerpt && <p className="hi-title mb-8 text-[21px] leading-relaxed text-hi-ink">{item.excerpt}</p>}
              <RichText html={item.html} />
            </article>
          </section>

          {all.length > 1 && (
            <section className="bg-hi-surface pb-24">
              <div className="hi-container">
                <SectionHeading oneLine compact>
                  More Experiences That Made an Impact
                </SectionHeading>
                <CaseGrid items={all} exclude={slug} />
              </div>
            </section>
          )}
          <FinalCTA title="Your Team Could Be the Next Story" img={item.img} />
        </main>
      )}
    </ContentGate>
  );
};
