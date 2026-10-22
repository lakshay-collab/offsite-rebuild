import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/FinalCTA";

const PAGE_SIZE = 12;

const Blog = ({ data }) => {
  const posts = data.posts || [];
  const tags = ["All", ...Array.from(new Set(posts.map((p) => p.tag).filter(Boolean)))];
  const [tag, setTag] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const list = tag === "All" ? posts : posts.filter((p) => p.tag === tag);
  const [first, ...rest] = list;
  const visible = rest.slice(0, shown - 1);

  return (
    <main data-testid="blog-page">
      <PageLoader />
      <PageHero title={(data.hero && data.hero.title) || "The HI Offsite Edit"} img={posts[0] && posts[0].img} testId="blog-hero" />

      <section className="bg-hi-surface py-20 md:py-28">
        <div className="hi-container">
          {data.hero && data.hero.subtitle && (
            <Reveal className="mx-auto mb-10 max-w-[640px] text-center text-[17px] leading-relaxed text-hi-ink">{data.hero.subtitle}</Reveal>
          )}
          {tags.length > 2 && (
            <div className="mb-10 flex justify-center">
              <div className="hi-card inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5" role="tablist" aria-label="Filter articles">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tag === t}
                    onClick={() => {
                      setTag(t);
                      setShown(PAGE_SIZE);
                    }}
                    className="relative rounded-full px-5 py-2.5 text-[14px] font-semibold"
                  >
                    {tag === t && <motion.span layoutId="blog-pill" className="absolute inset-0 rounded-full bg-hi-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className={`relative ${tag === t ? "text-white" : "text-hi-ink"}`}>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {first && (
            <Reveal>
              <PostCard featured to={`/blog-posts/${first.slug}`} img={first.img} title={first.title} tag={first.tag} excerpt={first.excerpt} testId="blog-featured" />
            </Reveal>
          )}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
                <PostCard to={`/blog-posts/${p.slug}`} img={p.img} title={p.title} tag={p.tag} meta={p.date} testId={`blog-card-${i}`} />
              </Reveal>
            ))}
          </div>
          {rest.length > visible.length && (
            <div className="mt-12 flex justify-center">
              <button type="button" onClick={() => setShown((n) => n + PAGE_SIZE)} className="hi-btn hi-btn-navy" data-testid="blog-more">
                <span>Load more articles ({rest.length - visible.length})</span>
                <span className="hi-btn-icon">
                  <ChevronDown size={18} />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA title="Ready to Turn Ideas Into an Offsite?" img={posts[1] && posts[1].img} />
    </main>
  );
};

const BlogIndex = () => {
  const state = useContent("blog/index.json");
  return <ContentGate state={state}>{(data) => <Blog data={data} />}</ContentGate>;
};

export default BlogIndex;
