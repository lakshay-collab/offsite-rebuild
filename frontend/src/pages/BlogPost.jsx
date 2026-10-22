import React from "react";
import { useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader, { introDelay } from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import { useProposal } from "@/components/ProposalContext";

const easeLux = [0.2, 0.8, 0.2, 1];

// Hero for a destination guide: full-bleed photo, dark wash, centered single-colour title.
const GuideHero = ({ guide, img }) => {
  const reduce = useReducedMotion();
  const delay = introDelay();
  const src = guide.heroImg || img;
  const title = guide.title || "";
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-hi-ink md:h-[86svh]" data-testid="guide-hero">
      {src && (
        <motion.img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.18 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 3.2, delay: Math.max(0, delay - 0.4), ease: easeLux }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(rgba(0,33,49,0.5), rgba(0,33,49,0.34) 45%, rgba(0,33,49,0.5) 70%, rgba(0,33,49,0.68))" }}
      />
      <div className="hi-container relative z-10 text-center">
        <Reveal delay={0.06}>
          <h1 className="hi-display mx-auto max-w-[1000px] text-white [text-wrap:balance]" style={{ fontSize: "clamp(38px, 5.4vw, 74px)", lineHeight: 1.06 }}>
            {title}
          </h1>
        </Reveal>
      </div>
    </section>
  );
};

// Why this destination: copy on the left, three photo cards on the right (middle one arched and raised)
const WhySection = ({ why }) => (
  <section className="bg-hi-surface py-20 md:py-28">
    <div className="hi-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        {why.kicker && <p className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#b8873f]">{why.kicker}<span className="h-px w-10 bg-[#c9a061]/60" /></p>}
        <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(30px, 3.6vw, 48px)", lineHeight: 1.08 }}>{why.heading}</h2>
        <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-hi-ink/80">{why.body}</p>
        {why.cta && (
          <Button variant="navy" arrow="right" to={why.cta.to} className="mt-8 !text-[14px]">
            {why.cta.label}
          </Button>
        )}
      </Reveal>

      <Reveal delay={0.1} className="grid grid-cols-3 gap-3 sm:gap-4">
        {why.cards.map((c, i) => {
          const mid = i === 1;
          return (
            <div
              key={i}
              className={`group relative overflow-hidden shadow-[0_24px_50px_-30px_rgba(0,33,49,0.5)] ${mid ? "rounded-b-2xl rounded-t-[80px] sm:-translate-y-6" : "rounded-2xl"}`}
            >
              <div className={`${mid ? "aspect-[3/5]" : "aspect-[3/4]"}`}>
                <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
              </div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,33,49,0) 45%, rgba(0,33,49,0.72))" }} />
              <p className="hi-title absolute inset-x-0 bottom-0 p-3 text-[13px] font-semibold leading-tight text-white sm:p-4 sm:text-[15px]">{c.label}</p>
            </div>
          );
        })}
      </Reveal>
    </div>
  </section>
);

// Curated resort cards
const ResortsSection = ({ resorts }) => (
  <section className="bg-hi-surface pb-6 md:pb-10">
    <div className="hi-container">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[640px]">
          {resorts.kicker && <p className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#b8873f]">{resorts.kicker}<span className="h-px w-10 bg-[#c9a061]/60" /></p>}
          <h2 className="hi-display text-hi-ink" style={{ fontSize: "clamp(28px, 3.3vw, 44px)", lineHeight: 1.08 }}>{resorts.heading}</h2>
        </div>
        {resorts.cta && (
          <SmartLink to={resorts.cta.to} className="hi-btn hi-btn-white hi-btn-arrow-right flex-shrink-0 !text-[14px]">
            <span>{resorts.cta.label}</span>
            <span className="hi-btn-icon"><ArrowRight size={18} /></span>
          </SmartLink>
        )}
      </div>
      {resorts.subtitle && <p className="mt-5 max-w-[720px] text-[16px] leading-relaxed text-hi-ink/70">{resorts.subtitle}</p>}

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {resorts.items.map((r, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <SmartLink to={r.to || "#"} className="group block overflow-hidden rounded-[20px] border border-hi-line bg-white shadow-[0_20px_46px_-32px_rgba(0,33,49,0.45)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,33,49,0.5)]">
              <div className="aspect-[16/11] overflow-hidden">
                <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-5">
                <span>
                  <span className="hi-title block text-[18px] font-semibold leading-snug text-hi-ink">{r.name}</span>
                  {r.location && (
                    <span className="mt-1 flex items-center gap-1.5 text-[13px] text-hi-ink/60">
                      <MapPin size={14} className="text-[#b8873f]" /> {r.location}
                    </span>
                  )}
                </span>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-hi-ink/20 text-hi-ink transition-colors duration-300 group-hover:border-transparent group-hover:bg-hi-navy group-hover:text-white">
                  <ArrowRight size={16} />
                </span>
              </div>
            </SmartLink>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// Signature experiences on a dark band with a faded photo backdrop
const ExperiencesSection = ({ experiences, img }) => (
  <section className="relative overflow-hidden bg-hi-ink py-20 md:py-28" data-testid="guide-experiences">
    {img && <img src={img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.14]" loading="lazy" />}
    <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,33,49,0.72), rgba(0,33,49,0.92))" }} />
    <div className="hi-container relative z-10">
      <Reveal className="max-w-[720px]">
        {experiences.kicker && <p className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e2c08a]">{experiences.kicker}<span className="h-px w-10 bg-[#c9a061]/50" /></p>}
        <h2 className="hi-display text-white" style={{ fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1.08 }}>{experiences.heading}</h2>
        {experiences.subtitle && <p className="mt-5 text-[16px] leading-relaxed text-white/75">{experiences.subtitle}</p>}
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {experiences.items.map((x, i) => (
          <Reveal key={i} delay={i * 0.06} className="flex gap-5 border-t border-white/15 pt-6">
            <span className="hi-display text-[26px] leading-none text-[#c9a061]">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="hi-title block text-[18px] font-semibold text-white">{x.title}</span>
              {x.desc && <span className="mt-2 block text-[14px] leading-relaxed text-white/70">{x.desc}</span>}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// "More from the Edit": three other articles (the next ones in the index, wrapping around)
const MorePosts = ({ slug }) => {
  const { data } = useContent("blog/index.json");
  const posts = (data && data.posts) || [];
  const at = Math.max(0, posts.findIndex((p) => p.slug === slug));
  const picks = [1, 2, 3].map((k) => posts[(at + k) % posts.length]).filter((p) => p && p.slug !== slug);
  if (!picks.length) return null;
  return (
    <section className="bg-hi-surface pb-24" data-testid="post-more">
      <div className="hi-container">
        <SectionHeading oneLine compact>
          More from the Edit
        </SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {picks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <PostCard to={`/blog-posts/${p.slug}`} img={p.img} title={p.title} tag={p.tag} meta={p.date} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Shared article body (the long-form content + sticky proposal card)
const ArticleBody = ({ post }) => {
  const { openProposal } = useProposal();
  return (
    <section id="guide-body" className="bg-hi-surface py-16 md:py-20" data-testid="post-article">
      <div className="hi-container grid grid-cols-1 gap-12 xl:grid-cols-[1fr_300px]">
        <article className="mx-auto w-full max-w-[760px]">
          <SmartLink to="/blogs" className="hi-link mb-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-hi-ink">
            <ArrowLeft size={14} /> The HI Offsite Edit
          </SmartLink>
          {post.excerpt && <p className="hi-title mb-8 text-[21px] leading-relaxed text-hi-ink">{post.excerpt}</p>}
          <RichText html={post.html} />
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <div className="hi-gold-rim rounded-[24px] p-px">
              <div className="hi-champagne rounded-[23px] p-7">
                <p className="hi-display text-[24px] leading-tight text-hi-ink">Planning an offsite like this?</p>
                <p className="mt-3 text-[14px] leading-relaxed text-hi-ink">Tell us your team size and dates. A custom proposal lands in 24–48 hours.</p>
                <Button variant="navy" className="mt-6 !text-[14px]" onClick={() => openProposal()}>
                  Get a proposal
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

const Post = ({ post }) => {
  const guide = post.guide;
  const meta = [post.tag, post.date, post.readTime].filter(Boolean);
  return (
    <main data-testid="post-page">
      <PageLoader />

      {guide ? (
        <>
          <GuideHero guide={guide} img={post.img} />
          {guide.why && <WhySection why={guide.why} />}
          {guide.resorts && <ResortsSection resorts={guide.resorts} />}
          {guide.experiences && <ExperiencesSection experiences={guide.experiences} img={guide.heroImg || post.img} />}
        </>
      ) : (
        <PageHero title={post.title} img={post.img} wrap={post.title.length > 48} testId="post-hero">
          {meta.length > 0 && (
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
              {meta.map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-[#e2c08a]" />}
                  <span>{m}</span>
                </React.Fragment>
              ))}
            </p>
          )}
        </PageHero>
      )}

      <ArticleBody post={post} />

      <MorePosts slug={post.slug} />
      <FinalCTA title="Turn This Guide Into Your Next Offsite" img={post.img} />
    </main>
  );
};

// /blog-posts/<slug>
const BlogPost = () => {
  const { slug } = useParams();
  // only plain slugs map to a content file
  const safe = /^[a-z0-9-]+$/i.test(slug || "") ? slug : "_missing";
  const state = useContent(`blog/${safe}.json`);
  return <ContentGate state={state}>{(post) => <Post key={slug} post={post} />}</ContentGate>;
};

export default BlogPost;
