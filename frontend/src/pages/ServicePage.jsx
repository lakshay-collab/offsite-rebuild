import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import PageLoader from "@/components/PageLoader";
import PageHero, { oneLineSize } from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import { CategoryShowcase, CaseStudyTeaser } from "@/components/PageSections";
import FinalCTA from "@/components/FinalCTA";

// The service's sub-types (e.g. Team Retreat, Luxury Offsite…) as image cards linking to their own pages
const Types = ({ types }) => {
  if (!types || !types.items || !types.items.length) return null;
  return (
    <section className="bg-hi-surface py-20 md:py-28" data-testid="service-types">
      <div className="hi-container">
        <SectionHeading oneLine subtitle={types.subtitle} fontSize={oneLineSize(types.title, 56, 30)}>
          {types.title}
        </SectionHeading>
        {types.note && (
          <Reveal className="mt-6 flex items-center justify-center gap-3 text-center text-[14px] italic text-hi-ink">
            <span className="hidden h-px w-8 bg-[#c9a061] sm:block" />
            {types.note}
            <span className="hidden h-px w-8 bg-[#c9a061] sm:block" />
          </Reveal>
        )}

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {types.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.1} className="h-full">
              <SmartLink to={item.href} className="hi-gold-rim group block h-full rounded-[26px] p-px" data-testid={`service-type-${i}`}>
                <div className="flex h-full flex-col overflow-hidden rounded-[25px] bg-[#fffaf1]">
                  {item.img && <RevealImage src={item.img} alt={item.title} delay={(i % 3) * 0.1} className="h-[220px]" />}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="hi-title text-[20px] text-hi-ink">{item.title}</h3>
                    {item.desc && <p className="mt-2 flex-1 text-[14px] leading-relaxed text-hi-ink">{item.desc}</p>}
                    <span className="mt-6 flex items-center justify-between border-t border-[#c9a061]/30 pt-5 text-[14px] font-semibold text-hi-ink">
                      Learn more
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_0_0_1px_rgba(201,160,97,0.45)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </div>
                </div>
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Which client case studies to lead with on each service page
const caseMatch = {
  "/company-offsite": /offsite|team/i,
  "/conferences-events": /event|conference/i,
  "/mice": /event|conference/i,
  "/corporate-workations": /offsite/i,
  "/remote-offsite": /team/i,
};

// One template for all seven capability pages (/company-offsite, /incentive-travel, …).
// Everything below the hero comes from this service's own pages: its formats, its photos,
// who it's for, matching case studies — nothing repeated from the home page.
const ServicePage = ({ page }) => {
  const types = (page.types && page.types.items) || [];
  return (
    <main data-testid="service-page">
      <PageLoader />
      <PageHero title={page.hero.title || page.name} img={page.hero.img} alt={page.name} testId="service-hero" />
      {page.hero.subtitle && (
        <section className="bg-hi-surface pt-14">
          <Reveal className="hi-container max-w-[760px] text-center text-[18px] leading-relaxed text-hi-ink">{page.hero.subtitle}</Reveal>
        </section>
      )}
      <Types types={page.types} />
      <CategoryShowcase path={page.path} name={page.name} />
      <CaseStudyTeaser match={caseMatch[page.path]} subtitle="How teams like yours used it, and what changed afterwards." />
      <FinalCTA
        title={page.hero.cta || `Plan Your ${page.name}`}
        subtitle="Share your goals and group size. A custom proposal lands in 24–48 hours."
        img={types[0] && types[0].img}
      />
    </main>
  );
};

export default ServicePage;