import React from "react";
import { ArrowUpRight } from "lucide-react";
import { capabilityPages, megaMenu } from "@/data/pages";
import { useContent } from "@/components/useContent";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartLink from "@/components/SmartLink";
import PostCard from "@/components/PostCard";
import { oneLineSize } from "@/components/PageHero";
import { SectionIntro, CardGrid, PhotoMosaic } from "@/components/ContentBlocks";

// Sections built from each page's own data, so inner pages don't repeat the home page.

// Card grid that stays a sensible width when there are only one or two cards
const gridFor = (n) =>
  n === 1 ? "mx-auto max-w-[420px] grid-cols-1" : n === 2 ? "mx-auto max-w-[880px] grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

const Band = ({ children, testId, tone = "plain" }) =>
  tone === "champagne" ? (
    <section className="bg-hi-surface px-3 py-6 md:px-5" data-testid={testId}>
      <div className="hi-champagne relative overflow-hidden rounded-[32px] py-16 md:py-20">
        <div className="pointer-events-none absolute -top-40 left-[28%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
        <div className="hi-container relative">{children}</div>
      </div>
    </section>
  ) : (
    <section className="bg-hi-surface py-20 md:py-28" data-testid={testId}>
      <div className="hi-container">{children}</div>
    </section>
  );

// Client case studies (optionally the ones whose category matches `match`)
export const CaseStudyTeaser = ({ title = "Experiences That Made an Impact", subtitle, match, exclude, tone }) => {
  const { data } = useContent("case-studies.json");
  const all = ((data && data.items) || []).filter((c) => c.slug !== exclude);
  const preferred = match ? all.filter((c) => match.test(`${c.tag} ${c.industry} ${c.title}`)) : [];
  const list = (preferred.length ? [...preferred, ...all.filter((c) => !preferred.includes(c))] : all).slice(0, 3);
  if (!list.length) return null;
  return (
    <Band testId="case-teaser" tone={tone}>
      <SectionHeading oneLine subtitle={subtitle} fontSize={oneLineSize(title, 56, 30)}>
        {title}
      </SectionHeading>
      <div className={`mt-12 grid gap-6 ${gridFor(list.length)}`}>
        {list.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08} className="h-full">
            <PostCard to={`/case-studies/${c.slug}`} img={c.img} title={c.title} tag={c.client || c.tag} cta="Read the case study" />
          </Reveal>
        ))}
      </div>
    </Band>
  );
};

// Our planning guides that mention this place (from the blog)
export const DestinationGuides = ({ name, aliases = [], title, limit = 3, tone }) => {
  const heading = title || `Planning Guides for ${name}`;
  const { data } = useContent("blog/index.json");
  const words = [name, ...aliases].filter(Boolean).map((w) => w.toLowerCase());
  const posts = ((data && data.posts) || []).filter((p) => words.some((w) => (p.title || "").toLowerCase().includes(w))).slice(0, limit);
  if (!posts.length) return null;
  return (
    <Band testId="destination-guides" tone={tone}>
      <SectionHeading oneLine subtitle="Resorts, activities and itineraries from our planners." fontSize={oneLineSize(heading, 56, 30)}>
        {heading}
      </SectionHeading>
      <div className={`mt-12 grid gap-6 ${gridFor(posts.length)}`}>
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <PostCard to={`/blog-posts/${p.slug}`} img={p.img} title={p.title} tag={p.tag || "Guide"} cta="Read the guide" />
          </Reveal>
        ))}
      </div>
    </Band>
  );
};

// What HI Offsite runs in a destination: the seven services, each opening its page
export const OfferingsIn = ({ name, tone }) => (
  <Band testId="offerings-in" tone={tone}>
    <SectionHeading oneLine subtitle={`Every format we deliver, planned and run on the ground in ${name}.`} fontSize={oneLineSize(`What We Run in ${name}`, 56, 30)}>
      {`What We Run in ${name}`}
    </SectionHeading>
    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {capabilityPages.map((cap, i) => {
        const menu = megaMenu.find((m) => m.href === cap.path);
        return (
          <Reveal key={cap.path} delay={(i % 4) * 0.06} className={`h-full ${i === 0 ? "lg:col-span-2" : ""}`}>
            <SmartLink to={cap.path} className="hi-lift group relative block h-[260px] overflow-hidden rounded-2xl shadow-hi-card">
              <img src={(cap.types && cap.types.items && cap.types.items[0] && cap.types.items[0].img) || cap.hero.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,33,49,0.9), rgba(0,33,49,0.3) 55%, rgba(0,33,49,0.05))" }} />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span>
                  <span className="hi-title block text-[20px] leading-tight text-white">{cap.name}</span>
                  {menu && menu.services && <span className="mt-1 block text-[13px] text-white">{menu.services.length} formats</span>}
                </span>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-hi-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </SmartLink>
          </Reveal>
        );
      })}
    </div>
  </Band>
);

// A service category's own photos and audience, gathered from its sub-service pages
export const CategoryShowcase = ({ path, name }) => {
  const { data } = useContent("subservices.json");
  const subs = Object.values(data || {}).filter((s) => s.parent === path);
  if (!subs.length) return null;
  const photos = Array.from(new Set(subs.flatMap((s) => (s.action && s.action.imgs) || []))).slice(0, 5);
  const audience = subs.find((s) => s.audience && (s.audience.items || []).length);
  const included = subs[0].included;
  return (
    <>
      {photos.length > 0 && (
        <Band testId="category-action">
          <SectionIntro title={`${name} in Action`} subtitle="Real programmes we have planned and run for teams like yours." />
          <PhotoMosaic imgs={photos} alt={name} />
        </Band>
      )}
      {included && (included.items || []).length > 0 && (
        <Band testId="category-included">
          <SectionIntro title="Every Detail, Covered" subtitle={included.subtitle} />
          <CardGrid items={included.items} />
        </Band>
      )}
      {audience && (
        <Band testId="category-audience" tone="champagne">
          <SectionIntro title={audience.audience.title} subtitle={audience.audience.subtitle} />
          <CardGrid items={audience.audience.items} numbered />
        </Band>
      )}
    </>
  );
};
