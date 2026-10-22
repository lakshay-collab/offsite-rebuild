import React, { useState } from "react";
import { Instagram, Facebook, Linkedin, ArrowRight, Mail, Check } from "lucide-react";
import { footer, assets } from "@/data/content";
import SmartLink from "@/components/SmartLink";

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  // NOTE: front-end only for now — send the address to the mailing-list provider when it's chosen
  const subscribe = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return e.currentTarget.reportValidity();
    setSubscribed(true);
  };
  return (
    <footer className="bg-hi-surface pt-20" data-testid="footer">
      <div className="hi-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <img src={assets.logoNav} alt="HI Offsite" className="h-11 w-auto" />
            <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-hi-ink">{footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2">
              {[
                [Instagram, "Instagram"],
                [Facebook, "Facebook"],
                [Linkedin, "LinkedIn"],
              ].map(([Icon, label]) => (
                <SmartLink
                  key={label}
                  to={footer.social[label]}
                  className="hi-card flex h-11 w-11 items-center justify-center !rounded-full text-hi-ink transition-all duration-300 hover:-translate-y-1 hover:bg-hi-navy hover:text-white"
                  aria-label={`HI Offsite on ${label}`}
                >
                  <Icon size={17} />
                </SmartLink>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="hi-title text-[15px] text-hi-ink">{col.title}</h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <SmartLink to={footer.links[l]} className="hi-link text-[14px] text-hi-ink">
                        {l}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-4">
            <div className="hi-navy-grad relative overflow-hidden rounded-3xl p-7">
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-hi-orange/30 blur-[70px]" />
              <span className="hi-glass-dark relative flex h-11 w-11 items-center justify-center rounded-full text-white">
                <Mail size={18} />
              </span>
              <h4 className="hi-display relative mt-5 text-[26px] text-white">
                {footer.newsletter.titleA}
                {footer.newsletter.titleB}
              </h4>
              <p className="relative mt-2 text-[14px] leading-relaxed text-white">{footer.newsletter.desc}</p>
              {subscribed ? (
                <p className="relative mt-6 flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-[14px] text-white" data-testid="newsletter-done">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-hi-ink">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  You're on the list. Watch your inbox.
                </p>
              ) : (
                <form className="relative mt-6" onSubmit={subscribe} noValidate>
                  <div className="flex items-center rounded-full bg-white p-1.5">
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder={footer.newsletter.placeholder}
                      aria-label={footer.newsletter.placeholder}
                      className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-hi-ink outline-none placeholder:text-hi-ink/50"
                      data-testid="newsletter-input"
                    />
                    <button
                      type="submit"
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-hi-navy text-white transition-transform hover:scale-105"
                      aria-label={footer.newsletter.cta}
                      data-testid="newsletter-subscribe"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                  <label className="mt-4 flex items-center gap-2.5 text-[13px] text-white">
                    <input type="checkbox" name="agree" required className="h-4 w-4 accent-[#c9a061]" />
                    <span>
                      I agree with <span className="underline underline-offset-2">Terms &amp; Conditions</span>
                    </span>
                  </label>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hi-line py-7 md:flex-row">
          <p className="text-[13px] text-hi-ink">{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-6">
            {footer.legal.map((l) => (
              <SmartLink key={l} to={footer.links[l]} className="hi-link text-[13px] text-hi-ink">
                {l}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
