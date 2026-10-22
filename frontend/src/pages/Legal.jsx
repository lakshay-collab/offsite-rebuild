import React from "react";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import { TextHero } from "@/components/PageHero";
import RichText from "@/components/RichText";
import SmartLink from "@/components/SmartLink";

const legalTitles = { "privacy-policy": "Privacy Policy", "terms-of-service": "Terms of Service", "cookies-settings": "Cookie Settings" };

// /privacy-policy, /terms-of-service, /cookies-settings — calm reading layout, no loader curtain
const Legal = ({ doc }) => {
  const state = useContent("legal.json", (all) => all[doc], doc);
  return (
    <ContentGate state={state}>
      {(page) => (
        <main data-testid="legal-page">
          <TextHero title={page.title || legalTitles[doc]} subtitle={page.updated || undefined} />
          <section className="bg-hi-surface py-16 md:py-20">
            <article className="hi-container max-w-[820px]">
              <RichText html={page.html} />
              <nav className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#c9a061]/30 pt-8" aria-label="Legal">
                {Object.entries(legalTitles)
                  .filter(([slug]) => slug !== doc)
                  .map(([slug, title]) => (
                    <SmartLink key={slug} to={`/${slug}`} className="hi-link text-[14px] font-semibold text-hi-ink">
                      {title}
                    </SmartLink>
                  ))}
              </nav>
            </article>
          </section>
        </main>
      )}
    </ContentGate>
  );
};

export default Legal;
