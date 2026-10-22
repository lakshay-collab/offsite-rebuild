import React, { useEffect, useRef } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Award, Compass, Handshake } from "lucide-react";
import { hero, assets, successStories } from "@/data/content";
import { useProposal } from "@/components/ProposalContext";

const ease = [0.22, 1, 0.36, 1];
const trustIcons = [Award, Compass, Handshake];

// Headline words rise in one after another
const Words = ({ text, delay, reduce }) =>
  text.split(" ").map((w, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay: delay + i * 0.09, ease }}
      >
        {w}&nbsp;
      </motion.span>
    </span>
  ));

const Hero = () => {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } };
  const { openProposal } = useProposal();
  const ctaRef = useMagnetic(true, 4); // the hero conversion CTA leans a few px toward a nearby cursor

  // Decode the hero video only while it is on screen: a playing 1080p video behind the rest of the page costs frames while scrolling
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative" data-testid="hero">
      <div className="relative flex min-h-[760px] w-full items-center overflow-hidden bg-hi-ink md:h-[100svh]">
        <motion.div className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease }}>
          <video
            ref={videoRef}
            className="hi-kenburns absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={assets.heroBg}
          >
            <source src={assets.heroVideoWebm} type="video/webm" />
            <source src={assets.heroVideoMp4} type="video/mp4" />
          </video>
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(0,33,49,0.45), rgba(0,33,49,0.15) 40%, rgba(0,33,49,0.75))" }}
        />

        <div className="hi-container relative z-10 flex flex-col items-center pb-20 pt-32 text-center">
          <h1 className="hi-display text-white md:whitespace-nowrap" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.05 }}>
            <Words text={hero.title} delay={0.45} reduce={reduce} />
          </h1>

          {/* Social proof: compact, no background */}
          <motion.div {...rise(0.95)} className="mt-5 inline-flex items-center gap-2.5">
            <span className="flex -space-x-2">
              {successStories.images.slice(0, 3).map((src) => (
                <img key={src} src={src} alt="" className="h-7 w-7 rounded-full object-cover ring-[1.5px] ring-white" />
              ))}
            </span>
            <span className="text-[13px] font-medium text-white">{hero.proof}</span>
            <span className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={11} className="fill-hi-orange text-hi-orange" />
              ))}
            </span>
          </motion.div>

          {/* Single CTA in a glass ring with a glowing gold rim — opens the proposal form */}
          <motion.div {...rise(1.1)} className="hi-planner-ring mt-8 inline-flex rounded-full p-[3px]">
            <span className="hi-planner-rim inline-flex rounded-full p-px">
              <button
                ref={ctaRef}
                type="button"
                onClick={() => openProposal()}
                className="hi-planner-cta !px-9 !py-4 !text-[15px]"
                aria-haspopup="dialog"
                data-testid="hero-cta"
              >
                {hero.planner.cta}
              </button>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Peach trust strip */}
      <motion.div className="bg-hi-peach" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.35, ease }}>
        <div className="hi-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4">
          {hero.trust.map((t, i) => {
            const Icon = trustIcons[i];
            return (
              <span key={t} className="flex items-center gap-2.5 text-[15px] text-hi-ink">
                {i > 0 && <span className="mr-6 hidden h-5 w-px bg-hi-ink/20 md:block" />}
                <Icon size={18} />
                <span className="font-medium">{t}</span>
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
