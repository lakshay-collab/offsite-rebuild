import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { megaMenu } from "@/data/pages";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SectionIntro, CardGrid, PhotoMosaic, GenericSection } from "@/components/ContentBlocks";
import { CaseStudyTeaser } from "@/components/PageSections";
import FinalCTA from "@/components/FinalCTA";
import { useProposal } from "@/components/ProposalContext";

// Who it's for: audience cards on a champagne panel
const Audience = ({ audience }) => {
  if (!audience || !(audience.items || []).length) return null;
  return (
    <section className="bg-hi-surface px-3 py-6 md:px-5" data-testid="sub-audience">
      <div className="hi-champagne relative overflow-hidden rounded-[32px] py-16 md:py-20">
        <div className="pointer-events-none absolute -top-40 left-[30%] h-[640px] w-40 rotate-[28deg] hi-ray hi-ray-50" />
        <div className="hi-container relative">
          <SectionIntro title={audience.title} subtitle={audience.subtitle} />
          <CardGrid items={audience.items} numbered />
        </div>
      </div>
    </section>
  );
};

// Other services in the same category, to keep exploring
const Siblings = ({ page }) => {
  const cat = megaMenu.find((m) => m.href === page.parent) || megaMenu.find((m) => (m.services || []).some((s) => s.href === page.path));
  const others = cat ? cat.services.filter((s) => s.href !== page.path) : [];
  if (!others.length) return null;
  return (
    <section className="bg-hi-surface py-20" data-testid="sub-siblings">
      <div className="hi-container">
        <SectionHeading oneLine compact>
          {`More ${cat.name}`}
        </SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s, i) => (
            <Reveal key={s.href} delay={(i % 3) * 0.06}>
              <SmartLink to={s.href} className="hi-cream-card hi-lift group flex h-full items-start justify-between gap-4 rounded-[20px] p-6">
                <span>
                  <span className="hi-title block text-[17px] text-hi-ink">{s.title}</span>
                  {s.desc && <span className="mt-1.5 block text-[14px] leading-relaxed text-hi-ink">{s.desc}</span>}
                </span>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_0_0_1px_rgba(201,160,97,0.45)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubService = ({ page }) => {
  const { openProposal } = useProposal();
  const cat = megaMenu.find((m) => m.href === page.parent);
  return (
    <main data-testid="subservice-page">
      <PageLoader />
      <PageHero title={page.hero.title || page.name} img={page.hero.img} alt={page.name} testId="sub-hero" wrap={(page.hero.title || "").length > 70} />

      {/* intro band: back to the category, the live subtitle, and the page's own CTA */}
      <section className="bg-hi-surface pt-14">
        <div className="hi-container flex flex-col items-center gap-6 text-center">
          {cat && (
            <SmartLink to={cat.href} className="hi-link inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-hi-ink">
              <ArrowLeft size={14} /> {cat.name}
            </SmartLink>
          )}
          {page.hero.subtitle && <p className="max-w-[680px] text-[18px] leading-relaxed text-hi-ink">{page.hero.subtitle}</p>}
          <Button variant="navy" onClick={() => openProposal()} data-testid="sub-cta">
            {page.hero.cta || "Plan your offsite"}
          </Button>
        </div>
      </section>


      {page.action && (page.action.title || (page.action.imgs || []).length > 0) && (
        <section className="bg-hi-surface py-20 md:py-28" data-testid="sub-action">
          <div className="hi-container">
            <SectionIntro title={page.action.title} subtitle={page.action.subtitle} />
            <PhotoMosaic imgs={page.action.imgs} alt={page.name} />
          </div>
        </section>
      )}

      {page.included && (page.included.items || []).length > 0 && (
        <section className="bg-hi-surface pb-20 md:pb-24" data-testid="sub-included">
          <div className="hi-container">
            <SectionIntro title={page.included.title} subtitle={page.included.subtitle} />
            <CardGrid items={page.included.items} />
          </div>
        </section>
      )}

      <Audience audience={page.audience} />
      {(page.extra || []).map((s, i) => (
        <GenericSection key={i} section={s} alt={page.name} />
      ))}
      <Siblings page={page} />
      <CaseStudyTeaser subtitle="Real programmes, real teams, and what changed afterwards." />
      <FinalCTA
        title={page.hero.cta || `Plan Your ${page.name}`}
        img={(page.action && page.action.imgs && page.action.imgs[0]) || page.hero.img}
      />
    </main>
  );
};

// /corporate-offsites/team-retreat, /incentive-travels/…, /mice-solutions/… — one template for all 46
const SubServicePage = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "");
  const state = useContent("subservices.json", (all) => all[path], path);
  return <ContentGate state={state}>{(page) => <SubService key={path} page={page} />}</ContentGate>;
};

export default SubServicePage;
