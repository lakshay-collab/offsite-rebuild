import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { resources } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SmartLink from "@/components/SmartLink";
import { useContent } from "@/components/useContent";
import { blogPosts } from "@/data/pages";

// Category label: small caps with a short gold dash (no pill)
const Category = ({ children }) => (
  <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-hi-ink">
    <span className="h-px w-6 bg-[#c9a061]" />
    {children || "Blog"}
  </span>
);

// Each card shows its photo at the photo's own proportions (1287x2000) with the copy underneath.
// `hidden` marks the looping duplicates: invisible to screen readers and skipped by the Tab key.
const Card = ({ post, index, hidden = false }) => (
  <SmartLink
    to={post.href || "/blogs"}
    className="group block w-[210px] shrink-0 sm:w-[230px] lg:w-[250px]"
    tabIndex={hidden ? -1 : undefined}
    draggable={false}
    data-testid={hidden ? undefined : `blog-card-${index}`}
  >
    <div className="hi-gold-rim rounded-[24px] p-px">
      <div className="relative aspect-[1287/2000] overflow-hidden rounded-[23px] bg-hi-cream">
        <img
          src={post.img}
          onError={(e) => {
            // our photo isn't there (yet): show the article's own image instead
            if (post.fallbackImg && e.currentTarget.src.indexOf(post.fallbackImg) === -1) e.currentTarget.src = post.fallbackImg;
          }}
          alt={hidden ? "" : post.title}
          width="1287"
          height="2000"
          decoding="async"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.025]"
        />
      </div>
    </div>
    <div className="mt-4 flex items-start justify-between gap-3 px-1">
      <div>
        <Category>{post.tag}</Category>
        <h3 className="hi-title mt-2.5 line-clamp-3 text-[15px] leading-snug text-hi-ink md:text-[16px]">{post.title}</h3>
      </div>
      <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_0_0_1px_rgba(201,160,97,0.45)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
        <ArrowUpRight size={17} />
      </span>
    </div>
  </SmartLink>
);

// ───────────────────────── Marquee ─────────────────────────
// One continuous row travelling right → left, deliberately slow: one full loop takes about a minute on desktop.
// It is a single Web Animation on the track's transform, i.e. GPU-friendly and never touching layout. The loop is
// seamless because the track is [the posts][first few posts again] and it travels exactly the width of "the posts"
// before restarting; the repeated part is only as long as the screen.
const LOOP_SECONDS = (w) => (w < 640 ? 42 : w < 1024 ? 52 : 62); // phone / tablet / desktop
const MAX_POSTS = 10; // the row shows a handful; "View all" opens the full Blogs page
const mod = (a, n) => ((a % n) + n) % n;

// The row is for our core services: offsites, MICE and (incentive / group) trips. Posts are sorted into those three
// themes from their title and tag, so new articles on these topics are picked up automatically. Culture, remote-work
// and team-building articles stay on the Blogs page.
const OFF_TOPIC = /team[- ]?build|icebreaker|culture|virtual|remote|mindful|diverse|inclusive|stress|bonding|satisfaction|gratitude|leadership skills|science of|wellness practices|millennials|in-office/i;
const THEMES = [
  ["mice", /\bmice\b|conference|trade show|expo|exhibition|dealer meet|corporate events?|business meetings?|corporate meeting|industry events?|networking/i],
  ["offsite", /off-?site|retreat|workcation/i],
  ["trips", /incentive|\btrips?\b|travel|\btours?\b|cruise|destination|resort|itinerary|outing/i],
];
const themeOf = (p) => {
  const text = `${p.title} ${p.tag || ""}`;
  if (OFF_TOPIC.test(text)) return null;
  const hit = THEMES.find(([, re]) => re.test(text));
  return hit ? hit[0] : null;
};
// alternate offsite → MICE → trips so the row shows all three, newest first within each
const mixThemes = (items, limit) => {
  const buckets = { offsite: [], mice: [], trips: [] };
  items.forEach((p) => {
    const t = themeOf(p);
    if (t) buckets[t].push(p);
  });
  const order = ["offsite", "mice", "trips"];
  const out = [];
  for (let i = 0; out.length < limit && order.some((k) => buckets[k].length > 0); i++) {
    const k = order[i % order.length];
    if (buckets[k].length) out.push(buckets[k].shift());
  }
  return out;
};

const Marquee = ({ posts }) => {
  const viewport = useRef(null);
  const track = useRef(null);
  const copy = useRef(null);
  const anim = useRef(null);
  const raf = useRef(0);
  const resumeTimer = useRef(0);
  // the row keeps moving while the cursor is over it; it stops only while someone presses/clicks it
  // (press = mouse button or finger held down, including a drag), or has keyboard focus, or is off screen
  const want = useRef({ press: false, focus: false, drag: false, away: false });
  const [vw, setVw] = useState(1280);

  // how many cards from the start repeat after the last one: enough to cover one screen width
  const step = vw < 640 ? 210 + 20 : vw < 1024 ? 230 + 24 : 250 + 24;
  const extra = Math.max(2, Math.ceil(vw / step) + 1);
  const repeated = useMemo(() => Array.from({ length: extra }, (_, i) => posts[i % posts.length]), [posts, extra]);

  // ease the playback rate to a target (0 = paused): smooth stop and smooth resume from the same spot
  const ramp = (target, ms) => {
    cancelAnimationFrame(raf.current);
    const a = anim.current;
    if (!a) return;
    const from = a.playbackRate;
    if (from === target) return;
    if (!(ms > 0)) {
      // instant change (e.g. the row scrolled off screen): no ramp, and never a division by zero
      a.playbackRate = target;
      return;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.max(0, Math.min(1, (now - t0) / ms));
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      a.playbackRate = from + (target - from) * e;
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const sync = (ms) => {
    const w = want.current;
    const paused = w.press || w.focus || w.drag || w.away;
    ramp(paused ? 0 : 1, ms ?? (paused ? 300 : 800));
  };

  // measure the viewport width (rounded, so small resizes don't rebuild the animation)
  useEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setVw(Math.round(el.clientWidth / 40) * 40 || 1280));
    ro.observe(el);
    setVw(Math.round(el.clientWidth / 40) * 40 || 1280);
    return () => ro.disconnect();
  }, []);

  // (re)build the animation when the posts or the screen size change, keeping the current position
  useEffect(() => {
    const t = track.current;
    const c = copy.current;
    if (!t || !c || typeof t.animate !== "function") return undefined;
    const distance = c.offsetWidth; // width of one full set of cards, including its trailing gap
    if (!distance) return undefined;
    const duration = LOOP_SECONDS(window.innerWidth) * 1000;
    const prev = anim.current;
    const progress = prev ? mod(prev.currentTime || 0, prev.effect.getTiming().duration) / prev.effect.getTiming().duration : 0;
    if (prev) prev.cancel();
    const a = t.animate(
      [{ transform: "translate3d(0,0,0)" }, { transform: `translate3d(${-distance}px,0,0)` }],
      { duration, iterations: Infinity, easing: "linear" }
    );
    a.currentTime = progress * duration;
    const w = want.current;
    a.playbackRate = w.press || w.focus || w.drag || w.away ? 0 : 1;
    anim.current = a;
    return () => {
      cancelAnimationFrame(raf.current);
      a.cancel();
      if (anim.current === a) anim.current = null;
    };
  }, [posts, vw]);

  // don't animate while the row is off screen or the tab is hidden
  useEffect(() => {
    const el = viewport.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      want.current.away = !entry.isIntersecting;
      sync(entry.isIntersecting ? 800 : 0);
    });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    clearTimeout(resumeTimer.current);
    cancelAnimationFrame(raf.current);
  }, []);

  // keyboard users: tabbing into a card pauses the row (mouse clicks don't count as keyboard focus)
  const onFocus = (e) => {
    if (!e.target.matches || !e.target.matches(":focus-visible")) return;
    want.current.focus = true;
    sync();
  };
  const onBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    want.current.focus = false;
    sync();
  };

  // drag / swipe: pan-y keeps vertical page scrolling native; horizontal movement drives the animation's position
  const drag = useRef({ x: 0, moved: 0, type: "mouse", on: false });
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const a = anim.current;
    if (!a) return;
    clearTimeout(resumeTimer.current);
    cancelAnimationFrame(raf.current);
    drag.current = { x: e.clientX, moved: 0, type: e.pointerType, on: true };
    // pressing (clicking / touching) the row stops it, quickly but without a snap
    want.current.press = true;
    sync(250);
    const duration = a.effect.getTiming().duration;
    const distance = copy.current.offsetWidth;

    const move = (ev) => {
      const d = drag.current;
      if (!d.on) return;
      const dx = ev.clientX - d.x;
      d.x = ev.clientX;
      d.moved += Math.abs(dx);
      if (d.moved > 6 && !want.current.drag) {
        want.current.drag = true;
        a.playbackRate = 0;
        viewport.current.style.cursor = "grabbing";
      }
      if (want.current.drag) a.currentTime = mod((a.currentTime || 0) - (dx / distance) * duration, duration);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const d = drag.current;
      d.on = false;
      viewport.current && (viewport.current.style.cursor = "");
      const dragged = want.current.drag;
      want.current.drag = false;
      if (dragged) {
        viewport.current.dataset.dragged = "1"; // swallow the click that ends a drag
        setTimeout(() => viewport.current && delete viewport.current.dataset.dragged, 60);
      }
      // once released, glide back into motion (a beat later for touch, so a swipe feels natural)
      resumeTimer.current = setTimeout(
        () => {
          want.current.press = false;
          sync(d.type === "mouse" ? 800 : 1000);
        },
        d.type === "mouse" ? 350 : 900
      );
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };
  const onClickCapture = (e) => {
    if (viewport.current && viewport.current.dataset.dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const edge = "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)";
  return (
    <div
      ref={viewport}
      className="relative -my-6 cursor-grab select-none overflow-hidden py-6"
      style={{ touchAction: "pan-y", WebkitMaskImage: edge, maskImage: edge }}
      onPointerDown={onPointerDown}
      onClickCapture={onClickCapture}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      onDragStart={(e) => e.preventDefault()}
      data-testid="resources-marquee"
    >
      <div ref={track} className="flex w-max will-change-transform">
        <ul ref={copy} className="flex gap-5 pr-5 sm:gap-6 sm:pr-6">
          {posts.map((p, i) => (
            <li key={p.href}>
              <Card post={p} index={i} />
            </li>
          ))}
        </ul>
        <ul className="flex gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden="true">
          {repeated.map((p, i) => (
            <li key={`${p.href}-${i}`}>
              <Card post={p} index={i} hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Resources = () => {
  const reduce = useReducedMotion();
  const blog = useContent("blog/index.json");

  // your hand-picked stories lead (with their own photos); offsite / MICE / trips posts follow, up to 10 in all.
  // The list comes straight from the blog data, so a newly published post on these topics joins the row on its own.
  const posts = useMemo(() => {
    // every published post, as the Blogs page sees it (the short static list covers the moments before it loads)
    const indexed = ((blog.data && blog.data.posts) || []).map((p) => ({ title: p.title, href: `/blog-posts/${p.slug}`, img: p.img, tag: p.tag }));
    const lookup = [...blogPosts, ...indexed];
    const curated = (resources.picks || [])
      .map((pk) => {
        const post = lookup.find((b) => b.href === pk.href);
        return post && { ...post, img: pk.img, fallbackImg: post.img };
      })
      .filter(Boolean);
    const seen = new Set(curated.map((p) => p.href));
    const rest = mixThemes(
      indexed.filter((p) => p.img && !seen.has(p.href)),
      Math.max(0, MAX_POSTS - curated.length)
    );
    const all = [...curated, ...rest].slice(0, MAX_POSTS);
    return all.length ? all : blogPosts.length ? blogPosts : resources.posts;
  }, [blog.data]);

  return (
    <section className="bg-hi-surface py-20 md:py-28" data-testid="resources">
      <div className="hi-container">
        <SectionHeading
          subtitle={resources.subtitle}
          aside={
            <Button variant="navy" to="/blogs" data-testid="resources-view-all">
              {resources.cta}
            </Button>
          }
        >
          {resources.titleA}
          {resources.titleB}
          {resources.titleC}
        </SectionHeading>
      </div>

      {/* only this row moves; it runs edge to edge of the screen and clips cleanly at both sides */}
      <Reveal className="mt-12">
        {reduce ? (
          // reduced motion: no autoplay, a normal horizontally scrollable row
          <ul className="flex gap-5 overflow-x-auto px-5 pb-4 sm:gap-6 md:px-8" data-testid="resources-row">
            {posts.map((p, i) => (
              <li key={p.href}>
                <Card post={p} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          <Marquee posts={posts} />
        )}
      </Reveal>
    </section>
  );
};

export default Resources;
