import React from "react";
import { Check, X } from "lucide-react";
import { whyPartner } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// "On your own vs. with HI Offsite" comparison, after hi.tours' "worth it" table.
// Sized to fit in a single desktop screen.
const grid = "grid grid-cols-[1fr_56px_72px] items-center gap-2 px-5 md:grid-cols-[1fr_130px_160px] md:px-7";

const WhyPartner = () => {
  const rows = [...whyPartner.left, ...whyPartner.right];
  const c = whyPartner.compare;
  return (
    <section className="flex min-h-0 flex-col justify-center bg-hi-surface py-16 lg:min-h-screen lg:py-12" data-testid="why-partner">
      <div className="hi-container">
        <SectionHeading compact subtitle={whyPartner.subtitle}>
          {c.title}
        </SectionHeading>

        <Reveal className="hi-card mx-auto mt-8 max-w-[1000px] overflow-hidden">
          <div className={`hi-navy-grad ${grid} py-3.5 text-white`}>
            <span className="hi-title text-[15px]">
              {whyPartner.titleA}
              {whyPartner.titleB}
            </span>
            <span className="text-center text-[12px] font-semibold md:text-[13px]">{c.own}</span>
            <span className="text-center text-[12px] font-semibold md:text-[13px]">{c.us}</span>
          </div>
          {rows.map((f, i) => (
            <div
              key={f.title}
              className={`${grid} py-3 transition-colors hover:bg-white ${i % 2 ? "bg-hi-apricot/60" : "bg-hi-cream"}`}
              data-testid={`why-${f.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
            >
              <div>
                <h3 className="hi-title text-[15px] text-hi-ink">{f.title}</h3>
                <p className="mt-0.5 text-[13px] leading-snug text-hi-ink">{f.desc}</p>
              </div>
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-hi-mist/50 text-hi-ink">
                <X size={13} strokeWidth={2.5} />
              </span>
              <span
                className="mx-auto flex h-8 w-8 items-center justify-center rounded-full text-white shadow-[0_6px_16px_rgba(231,94,38,0.35)]"
                style={{ background: "linear-gradient(135deg, #fb7f26, #e75e26)" }}
              >
                <Check size={15} strokeWidth={3} />
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default WhyPartner;
