import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { capabilitiesMenu } from "@/data/content";
import { megaMenu } from "@/data/pages";
import { capabilityOrder } from "@/data/capabilitiesMenu";
import { useProposal } from "@/components/ProposalContext";
import SmartLink from "@/components/SmartLink";

// Live-site menu data (each category and service has a real page); the local list is only a fallback
const source = megaMenu.length ? megaMenu : capabilitiesMenu;

// Merge the live menu with our curated order, taglines, photos and link labels
const buildMenu = () =>
  capabilityOrder
    .map((meta) => {
      const cap = source.find((c) => c.name === meta.name);
      if (!cap) return null;
      const items = meta.links
        ? meta.links
            .map((l) => {
              const s = cap.services.find((x) => x.title === l.match);
              return s && { title: l.label, href: s.href };
            })
            .filter(Boolean)
        : cap.services.map((s) => ({ title: s.title, href: s.href }));
      return { name: cap.name, mobileLabel: meta.mobileLabel || cap.name, href: cap.href || "/#expertise", tagline: meta.tagline, image: meta.image, items };
    })
    .filter(Boolean);

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// ───────────────────────── Desktop ─────────────────────────
// Three columns: categories | sub-categories | photo CTA. Hovering a category cross-fades columns 2 and 3 in place
// (the panel never closes/reopens). A short hover-intent delay stops the content flickering as the cursor passes.
export const CapabilitiesPanel = () => {
  const menu = useMemo(buildMenu, []);
  const { openProposal } = useProposal();
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0])); // photos load the first time their category is shown
  const intent = useRef(null);

  const show = (i) => {
    setActive(i);
    setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
  };
  const onEnter = (i) => () => {
    clearTimeout(intent.current);
    if (i === active) return;
    intent.current = setTimeout(() => show(i), 120);
  };
  const cancel = () => clearTimeout(intent.current);
  useEffect(() => () => clearTimeout(intent.current), []);

  const fade = (on) => ({
    opacity: on ? 1 : 0,
    visibility: on ? "visible" : "hidden",
    transition: `opacity 220ms ${EASE}, visibility 0s linear ${on ? "0s" : "220ms"}`,
  });

  return (
    // pt (not mt) so the gap under the bar is part of the hover area and the panel doesn't close mid-way
    <div className="hi-menu-in mx-auto w-[84vw] max-w-[1450px] pt-3" data-testid="capabilities-panel">
      <div
        className="grid max-h-[600px] min-h-[440px] grid-cols-[22fr_45fr_33fr] overflow-hidden rounded-[26px] border border-[#c9a061]/25 bg-[#fbf8f1] p-3 shadow-hi-card-hover"
        onMouseLeave={cancel}
      >
        {/* 1 — categories */}
        <nav className="hi-menu-col flex flex-col gap-1 px-2 py-3" style={{ "--i": 0 }} aria-label="Capabilities">
          <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-hi-ink/60">Capabilities</p>
          {menu.map((c, i) => (
            <SmartLink
              key={c.name}
              to={c.href}
              onMouseEnter={onEnter(i)}
              onFocus={() => {
                cancel();
                show(i);
              }}
              className={`group flex items-center justify-between rounded-[14px] px-4 py-3 text-[15.5px] font-medium text-hi-ink transition-colors duration-200 ${
                active === i ? "bg-[#fbeedd]" : "hover:bg-[#f3ecdf]"
              }`}
              aria-current={active === i ? "true" : undefined}
              data-testid={`cap-tab-${i}`}
            >
              {c.name}
              <ArrowRight
                size={16}
                className={`text-hi-orange transition-all duration-200 ${active === i ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
              />
            </SmartLink>
          ))}
        </nav>

        {/* 2 — sub-categories (all categories stacked in one cell so the panel height never jumps) */}
        <div className="hi-menu-col grid border-x border-[#c9a061]/15 px-9 py-6" style={{ "--i": 1 }}>
          {menu.map((c, i) => (
            <div key={c.name} className="col-start-1 row-start-1 flex flex-col" style={fade(active === i)} aria-hidden={active !== i}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hi-orange">{c.name}</p>
              <p className="hi-display mt-3 max-w-[460px] text-[26px] leading-[1.18] text-hi-ink">{c.tagline}</p>
              <div className="mt-6 grid grid-cols-2 gap-x-8">
                {c.items.map((s) => (
                  <SmartLink
                    key={s.title}
                    to={s.href || c.href}
                    tabIndex={active === i ? 0 : -1}
                    className="group flex items-center justify-between border-b border-[#c9a061]/15 py-[11px] text-[15px] font-medium text-hi-ink"
                  >
                    <span className="transition-transform [transition-duration:250ms] group-hover:translate-x-[4px]">{s.title}</span>
                    <ArrowRight size={14} className="-translate-x-1.5 text-hi-orange opacity-0 transition-all [transition-duration:250ms] group-hover:translate-x-0 group-hover:opacity-100" />
                  </SmartLink>
                ))}
              </div>
              <SmartLink
                to={c.href}
                tabIndex={active === i ? 0 : -1}
                className="group mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-hi-ink"
                data-testid={i === 0 ? "cap-learn-more" : undefined}
              >
                <span className="hi-link">Explore all {c.name}</span>
                <ArrowRight size={16} className="text-hi-orange transition-transform duration-200 group-hover:translate-x-1" />
              </SmartLink>
            </div>
          ))}
        </div>

        {/* 3 — photo CTA */}
        <div className="hi-menu-col p-1 pl-4" style={{ "--i": 2 }}>
          <button
            type="button"
            onClick={() => openProposal()}
            aria-haspopup="dialog"
            className="group relative block h-full min-h-[300px] w-full overflow-hidden rounded-[20px] text-left"
            data-testid="dropdown-cta-btn"
          >
            {menu.map((c, i) =>
              seen.has(i) ? (
                <img
                  key={c.name}
                  src={c.image}
                  alt=""
                  width="760"
                  height="1040"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.04)",
                    transition: `opacity 400ms ${EASE}, transform 600ms ${EASE}`,
                  }}
                />
              ) : null
            )}
            <div className="absolute inset-x-0 bottom-0 h-[58%]" style={{ background: "linear-gradient(to top, rgba(0,24,37,0.88), rgba(0,33,49,0.4) 60%, rgba(0,33,49,0))" }} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="hi-display text-[24px] leading-[1.12] text-white">Planning your next offsite?</p>
                <p className="mt-2 max-w-[260px] text-[14px] leading-snug text-white/90">From 20 people to 2,000. We handle it end-to-end.</p>
                <span className="mt-4 inline-flex text-[14px] font-semibold text-white">
                  <span className="hi-link">Start Planning</span>
                </span>
              </div>
              <span className="mb-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-hi-orange text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── Mobile ─────────────────────────
// Drill-down accordion: Capabilities > category > its sub-categories. No promotional photo.
export const MobileCapabilities = ({ onNavigate }) => {
  const menu = useMemo(buildMenu, []);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState(null);

  return (
    <div className="border-b border-hi-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
        data-testid="mobile-capabilities"
      >
        <span className="hi-display text-[36px] text-hi-ink">Capabilities</span>
        <ChevronDown size={24} className={`text-hi-ink transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          {menu.map((c) => {
            const expanded = cat === c.name;
            return (
              <div key={c.name} className="border-t border-hi-line/70">
                <button
                  type="button"
                  onClick={() => setCat(expanded ? null : c.name)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between py-3.5 pl-2 text-left"
                >
                  <span className={`text-[20px] font-medium ${expanded ? "text-hi-orange" : "text-hi-ink"}`}>{c.mobileLabel}</span>
                  <ChevronDown size={18} className={`text-hi-ink transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="flex flex-col pb-3 pl-6">
                      {c.items.map((s) => (
                        <SmartLink key={s.title} to={s.href || c.href} onClick={onNavigate} tabIndex={expanded ? 0 : -1} className="py-2.5 text-[16px] text-hi-ink">
                          {s.title}
                        </SmartLink>
                      ))}
                      <SmartLink to={c.href} onClick={onNavigate} tabIndex={expanded ? 0 : -1} className="inline-flex items-center gap-2 py-2.5 text-[16px] font-semibold text-hi-ink">
                        Explore all {c.mobileLabel} <ArrowRight size={15} className="text-hi-orange" />
                      </SmartLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
