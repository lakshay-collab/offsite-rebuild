import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ArrowUpRight, X } from "lucide-react";
import { nav, assets, resourcesMenu } from "@/data/content";
import Button from "@/components/Button";
import { useProposal } from "@/components/ProposalContext";
import SmartLink from "@/components/SmartLink";
import { CapabilitiesPanel, MobileCapabilities } from "@/components/CapabilitiesMenu";
import { scrollToTarget } from "@/lib/smoothScroll";

const resourceLinks = { Blogs: "/blogs", "Case Studies": "/case-studies" };

const ResourcesPanel = () => (
  <div className="hi-menu-in absolute left-1/2 top-full z-50 w-[220px] -translate-x-1/2 pt-3" data-testid="resources-panel">
    <div className="hi-card overflow-hidden rounded-[18px] p-2">
      {resourcesMenu.map((r) => (
        <SmartLink
          key={r}
          to={resourceLinks[r]}
          className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-hi-ink transition-colors hover:bg-hi-cream"
          data-testid={`resource-item-${r.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
        >
          {r}
          <ArrowUpRight size={15} />
        </SmartLink>
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const { openProposal } = useProposal();
  const [open, setOpenState] = useState(null);
  const closeTimer = useRef(null);
  // Opening is instant; closing waits a moment so a slightly off-course mouse doesn't snap the menu shut
  const setOpen = (v) => {
    clearTimeout(closeTimer.current);
    setOpenState(v);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenState(null), 220);
  };
  const keepOpen = () => clearTimeout(closeTimer.current);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  // close any open menu once a link has taken us to another page
  const { pathname, hash } = useLocation();
  // Logo: from another page the route change scrolls to the top; on the home page itself the URL
  // doesn't change, so glide back to the top here
  const goHomeTop = (e) => {
    setOpenState(null);
    setMobileOpen(false);
    if (pathname === "/" && !hash) {
      e.preventDefault();
      scrollToTarget(0, { duration: 1.4 });
    }
  };
  useEffect(() => {
    setOpenState(null);
    setMobileOpen(false);
  }, [pathname]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen(false);
    };
    // Layout is read at most every 400ms and state is written once per animation frame, so scrolling never forces a layout
    let heroHeight = 0;
    let measuredAt = -Infinity;
    let frame = 0;
    const update = () => {
      frame = 0;
      const now = performance.now();
      if (now - measuredAt > 400) {
        // Every page opens with a dark hero (first section of <main>); once past it the page behind the capsule is light
        const hero = document.querySelector("main > section");
        heroHeight = hero ? hero.offsetHeight : Math.max(window.innerHeight, 760);
        measuredAt = now;
      }
      const y = window.scrollY;
      setScrolled(y > 90);
      setPastHero(y > heroHeight - 90);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hasDropdown = { Capabilities: true, Resources: true };
  const navLinks = { Destinations: "/destinations", "About Us": "/about" };
  // the mobile menu has no dropdowns, so its dropdown items go to the section/page that lists them
  const mobileLinks = { ...navLinks, Capabilities: "/#expertise", Resources: "/blogs" };
  // Full-width over the hero; a floating glass capsule once scrolled. Opening a menu must not resize the
  // bar, or the item under the cursor slides away and the menu closes.
  const compact = scrolled || mobileOpen;
  // The capsule is nearly transparent, so text follows what's behind it: white over the hero, navy after
  const inkText = pastHero || mobileOpen;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left transition-opacity duration-500"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0, background: "linear-gradient(90deg, #fb7f26, #e75e26)" }}
        aria-hidden="true"
      />
      <header className="hi-nav-in pointer-events-none fixed inset-x-0 top-0 z-50" onMouseLeave={closeSoon} onMouseEnter={keepOpen}>
        <div
          className={`pointer-events-auto mx-auto transition-all duration-500 ease-out ${
            compact ? "mt-3 max-w-[860px] px-3" : "mt-0 max-w-[1280px] px-0"
          }`}
        >
          <nav
            className={`flex items-center justify-between rounded-full transition-all duration-500 ease-out ${
              compact ? `hi-glass-nav h-[52px] pl-5 pr-1.5 ${inkText ? "on-light" : ""}` : "h-[84px] px-5 md:px-8"
            }`}
            data-testid="navbar"
          >
            <Link to="/" onClick={goHomeTop} className="flex items-center" aria-label="HI Offsite home" data-testid="logo-link">
              <img
                src={assets.logoNav}
                alt="HI Offsite"
                className={`w-auto transition-all duration-500 ${compact ? "h-7" : "h-10"} ${inkText ? "" : "brightness-0 invert"}`}
              />
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {nav.menu.map((m) => {
                const itemCls = `flex items-center gap-1.5 rounded-full text-[14px] font-medium transition-all ${compact ? "px-3.5 py-1.5" : "px-4 py-2"} ${
                  inkText
                    ? `text-hi-ink ${open === m ? "bg-white/60" : "hover:bg-white/40"}`
                    : `text-white ${open === m ? "bg-white/20" : "hover:bg-white/15"}`
                }`;
                return (
                <div key={m} className="relative">
                  {navLinks[m] ? (
                    <Link to={navLinks[m]} onMouseEnter={() => setOpen(null)} className={itemCls} data-testid={`nav-${m.toLowerCase().replace(/\s+/g, "-")}`}>
                      {m}
                    </Link>
                  ) : (
                  <button
                    type="button"
                    onMouseEnter={() => setOpen(hasDropdown[m] ? m : null)}
                    onClick={() => setOpen(open === m ? null : hasDropdown[m] ? m : null)}
                    className={itemCls}
                    aria-expanded={hasDropdown[m] ? open === m : undefined}
                    data-testid={`nav-${m.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {m}
                    {hasDropdown[m] && (
                      <ChevronDown size={14} className={`transition-transform ${open === m ? "rotate-180" : ""}`} />
                    )}
                  </button>
                  )}
                  {m === "Resources" && open === "Resources" && <ResourcesPanel />}
                </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="navy"
                magnetic
                className={`hidden !pl-5 !pr-1 !text-[14px] lg:inline-flex ${
                  compact ? "!py-1 [&_.hi-btn-icon]:!h-8 [&_.hi-btn-icon]:!w-8" : "!py-1.5 [&_.hi-btn-icon]:!h-9 [&_.hi-btn-icon]:!w-9"
                }`}
                onClick={() => openProposal()}
                data-testid="get-in-touch-btn"
              >
                Get in touch
              </Button>
              <button
                type="button"
                className={`flex items-center justify-center rounded-full transition-all lg:hidden ${compact ? "h-10 w-10" : "h-12 w-12"} ${
                  inkText ? "bg-hi-navy text-white" : "hi-glass-dark text-white"
                }`}
                onClick={() => setMobileOpen((v) => !v)}
                data-testid="mobile-toggle"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X size={20} />
                ) : (
                  <span className="flex flex-col gap-[5px]">
                    <span className="block h-[1.5px] w-5 rounded bg-current" />
                    <span className="block h-[1.5px] w-5 rounded bg-current" />
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>

        {open === "Capabilities" && (
          <div className="pointer-events-auto hidden lg:block">
            <CapabilitiesPanel />
          </div>
        )}
      </header>

      {mobileOpen && (
        <div data-lenis-prevent className="hi-fade-down fixed inset-0 z-40 overflow-y-auto bg-hi-surface pt-24 lg:hidden">
          <div className="hi-container flex min-h-full flex-col pb-8">
            {nav.menu.map((m, i) =>
              m === "Capabilities" ? (
                // accordion: category > its sub-categories (no promo photo on small screens)
                <MobileCapabilities key={m} onNavigate={() => setMobileOpen(false)} />
              ) : (
                <SmartLink
                  key={m}
                  to={mobileLinks[m] || "/"}
                  className="hi-fade-up flex items-center justify-between border-b border-hi-line py-5"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="hi-display text-[36px] text-hi-ink">{m}</span>
                  <ArrowUpRight size={22} className="text-hi-ink" />
                </SmartLink>
              )
            )}
            <div className="mt-auto pt-10">
              <Button
                variant="navy"
                className="w-full justify-between"
                onClick={() => {
                  setMobileOpen(false);
                  openProposal();
                }}
              >
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
