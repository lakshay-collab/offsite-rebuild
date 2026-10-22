import React from "react";
import { Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import { oneLineSize } from "@/components/PageHero";

// Shared building blocks for content-driven pages (sub-services, hotels/tours/activities, vendor).
// They take the extracted live-site data as-is and skip anything that is empty.

const hasItems = (a) => Array.isArray(a) && a.length > 0;
// text fields may be one string or a list of paragraphs
const paras = (t) => (Array.isArray(t) ? t : t ? [t] : []).filter(Boolean);

// Section heading: one line, auto-sized to its length; subtitle and paragraphs underneath
export const SectionIntro = ({ title, subtitle, text: rawText }) => {
  const text = paras(rawText);
  if (!title && !subtitle && !hasItems(text)) return null;
  return (
    <>
      {title && (
        <SectionHeading oneLine subtitle={subtitle} fontSize={oneLineSize(title, 56, 30)}>
          {title}
        </SectionHeading>
      )}
      {!title && subtitle && <p className="mx-auto max-w-[620px] text-center text-[17px] leading-relaxed text-hi-ink">{subtitle}</p>}
      {hasItems(text) && (
        <Reveal className="mx-auto mt-6 max-w-[760px] text-center">
          {text.map((p, i) => (
            <p key={i} className={`text-[16px] leading-relaxed text-hi-ink ${i ? "mt-4" : ""}`}>
              {p}
            </p>
          ))}
        </Reveal>
      )}
    </>
  );
};

// Cards with optional photo, title and description (3-up on desktop)
export const CardGrid = ({ items, numbered = false }) => {
  if (!hasItems(items)) return null;
  // rows of 3 (4 or 2 when that divides evenly); an incomplete last row is centred
  const perRow = items.length === 4 ? 4 : items.length === 2 ? 2 : 3;
  const width = { 2: "lg:w-[calc(50%-10px)]", 3: "lg:w-[calc(33.333%-14px)]", 4: "lg:w-[calc(25%-15px)]" }[perRow];
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-5">
      {items.map((it, i) => (
        <Reveal key={`${it.title}-${i}`} delay={(i % 3) * 0.08} className={`w-full sm:w-[calc(50%-10px)] ${width}`}>
          <div className="hi-gold-rim group h-full rounded-[24px] p-px">
            <div className="flex h-full flex-col overflow-hidden rounded-[23px] bg-[#fffaf1]">
              {it.img && <RevealImage src={it.img} alt={it.title || ""} delay={(i % 3) * 0.08} className="h-[200px]" />}
              <div className="flex flex-1 flex-col p-7">
                {numbered && !it.img && (
                  <span className="hi-gold-chip mb-5 flex h-11 w-11 items-center justify-center rounded-full font-title text-[15px] font-semibold text-hi-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <div className="flex-1">
                  {it.title && <h3 className="hi-title text-[19px] leading-snug text-hi-ink">{it.title}</h3>}
                  {it.desc && <p className="mt-2 text-[15px] leading-relaxed text-hi-ink">{it.desc}</p>}
                </div>
                <span className="mt-5 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a] transition-all duration-500 group-hover:w-20" />
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

// Editorial photo mosaic: one tall photo and a stack of smaller ones
export const PhotoMosaic = ({ imgs, alt = "" }) => {
  if (!hasItems(imgs)) return null;
  const list = imgs.slice(0, 5);
  if (list.length < 3) {
    return (
      <div className={`mt-12 grid grid-cols-1 gap-5 ${list.length === 2 ? "md:grid-cols-2" : ""}`}>
        {list.map((src, i) => (
          <div key={src} className="hi-gold-rim rounded-[26px] p-px">
            <RevealImage src={src} alt={alt} delay={i * 0.1} className="h-[380px] rounded-[25px]" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2 md:[height:560px]">
      {list.map((src, i) => (
        <div key={src} className={`hi-gold-rim rounded-[24px] p-px ${i === 0 ? "col-span-2 row-span-2" : ""} ${(i > 0 && list.length === 3) || (i === 3 && list.length === 4) ? "md:col-span-2" : ""}`}>
          <RevealImage src={src} alt={alt} delay={i * 0.08} className={`h-full min-h-[180px] rounded-[23px] ${i === 0 ? "min-h-[300px]" : ""}`} />
        </div>
      ))}
    </div>
  );
};

// Titled lists (Highlights / What's included / What to bring…) as cream cards with gold check marks
export const ListGroups = ({ groups }) => {
  const list = (groups || []).filter((g) => g && (g.title || g.value || hasItems(g.items) || paras(g.text).length));
  if (!hasItems(list)) return null;
  return (
    <div className={`mt-12 grid grid-cols-1 gap-5 ${list.length > 1 ? "md:grid-cols-2" : ""} ${list.length === 3 || list.length > 4 ? "lg:grid-cols-3" : ""}`}>
      {list.map((g, i) => (
        <Reveal key={`${g.title}-${i}`} delay={(i % 3) * 0.08} className="h-full">
          <div className="hi-cream-card h-full rounded-[24px] p-7">
            {g.title && <h3 className="hi-title text-[19px] text-hi-ink">{g.title}</h3>}
            {g.value && <p className="hi-display mt-2 text-[26px] leading-tight text-hi-ink">{g.value}</p>}
            {paras(g.text).map((p, k) => (
              <p key={k} className="mt-3 text-[15px] leading-relaxed text-hi-ink">
                {p}
              </p>
            ))}
            {hasItems(g.items) && (
              <ul className="mt-4 flex flex-col gap-3">
                {g.items.map((x, k) => (
                  <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-hi-ink">
                    <span className="mt-[3px] flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-hi-navy text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
};

// Day-by-day / step-by-step itinerary on a gold rail
export const Timeline = ({ items }) => {
  if (!hasItems(items)) return null;
  return (
    <ol className="relative mx-auto mt-12 max-w-[820px] pl-10">
      <span className="absolute bottom-3 left-[13px] top-3 w-px bg-gradient-to-b from-[#e2c08a] via-[#c9a061] to-[#b8873f]" />
      {items.map((it, i) => (
        <Reveal as="li" key={i} delay={i * 0.06} className={`relative ${i ? "mt-8" : ""}`}>
          <span className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-hi-navy text-[12px] font-semibold text-white shadow-[0_0_0_5px_rgba(201,160,97,0.2)]">
            {i + 1}
          </span>
          <div className="hi-cream-card rounded-[20px] p-6">
            {it.title && <h3 className="hi-title text-[18px] text-hi-ink">{it.title}</h3>}
            {it.desc && <p className="mt-2 text-[15px] leading-relaxed text-hi-ink">{it.desc}</p>}
          </div>
        </Reveal>
      ))}
    </ol>
  );
};

// Any extracted section: picks the right layout from what the section contains
export const GenericSection = ({ section, alt = "", tone = "plain" }) => {
  if (!section) return null;
  const s = section;
  const isTimeline = /timeline/i.test(s.type || "") || (hasItems(s.items) && s.items.every((it) => /^(one|two|three|four|five|six|seven|eight|nine|ten|day\s*\d+|step\s*\d+)$/i.test((it.title || "").trim())));
  const empty = !s.title && !s.subtitle && !paras(s.text).length && !hasItems(s.groups) && !hasItems(s.items) && !hasItems(s.imgs);
  if (empty) return null;
  const body = (
    <>
      <SectionIntro title={s.title} subtitle={s.subtitle} text={s.text} />
      <ListGroups groups={s.groups} />
      {isTimeline ? <Timeline items={s.items} /> : <CardGrid items={s.items} numbered={!hasItems(s.imgs) && hasItems(s.items) && s.items.every((it) => !it.img)} />}
      <PhotoMosaic imgs={s.imgs} alt={alt} />
    </>
  );
  if (tone === "champagne") {
    return (
      <section className="bg-hi-surface px-3 py-6 md:px-5">
        <div className="hi-champagne relative overflow-hidden rounded-[32px] py-16 md:py-20">
          <div className="pointer-events-none absolute -top-40 left-[30%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
          <div className="hi-container relative">{body}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-hi-surface py-20 md:py-28">
      <div className="hi-container">{body}</div>
    </section>
  );
};
