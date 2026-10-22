import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Expertise from "@/components/Expertise";
import WhyChoose from "@/components/WhyChoose";
import Destinations from "@/components/Destinations";
import SuccessStories from "@/components/SuccessStories";
import HowItWorks from "@/components/HowItWorks";
import WhyPartner from "@/components/WhyPartner";
import Testimonials from "@/components/Testimonials";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BrandMarquee from "@/components/BrandMarquee";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { ProposalProvider } from "@/components/ProposalContext";
import { markIntroSeen } from "@/components/PageLoader";
import About from "@/pages/About";
import ServicePage from "@/pages/ServicePage";
import DestinationPage from "@/pages/DestinationPage";
import DestinationsIndex from "@/pages/DestinationsIndex";
import Contact from "@/pages/Contact";
import SubServicePage from "@/pages/SubServicePage";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import { CaseStudiesIndex, CaseStudyPage } from "@/pages/CaseStudies";
import ExperiencePage from "@/pages/ExperiencePage";
import Vendor from "@/pages/Vendor";
import Legal from "@/pages/Legal";
import Sitemap from "@/pages/Sitemap";
import NotFound from "@/pages/NotFound";
import { capabilityPages, destinationPages } from "@/data/pages";
import { createSmoothScroll, destroySmoothScroll, scrollToTarget } from "@/lib/smoothScroll";

// URL prefixes of the 46 sub-service pages (one template, content in public/content/subservices.json)
const subServicePrefixes = ["corporate-offsites", "incentive-travels", "conference-events", "workation", "mice-solutions", "educational-trips", "remote-offsite"];

const Home = () => (
  <main>
    <Hero />
    <Clients />
    <Expertise />
    <WhyChoose />
    <Destinations />
    <BrandMarquee />
    <SuccessStories />
    <HowItWorks />
    <WhyPartner />
    <Testimonials />
    <Resources />
    <FAQ />
    <FinalCTA />
  </main>
);

// /company-offsite, /incentive-travel, … → the service template; anything else is a 404
const ServiceRoute = () => {
  const { slug } = useParams();
  const page = capabilityPages.find((p) => p.path === `/${slug}`);
  return page ? <ServicePage key={slug} page={page} /> : <NotFound />;
};

// old live-site blog URLs (/post/<slug>) now live at /blog-posts/<slug>
const OldPostRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/blog-posts/${slug}`} replace />;
};

const DestinationRoute = () => {
  const { slug } = useParams();
  const page = destinationPages.find((d) => d.slug === slug);
  return page ? <DestinationPage key={slug} page={page} /> : <Navigate to="/destinations" replace />;
};

// New page → start at the top; links with a #hash (e.g. /about#team) scroll to that section once it renders
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  // the intro curtain belongs to the first page only (whichever page the visit starts on)
  useEffect(() => markIntroSeen(), []);
  // Momentum scrolling for wheel / trackpad (touch stays native); skipped under prefers-reduced-motion
  useEffect(() => {
    createSmoothScroll();
    return destroySmoothScroll;
  }, []);
  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true });
      return;
    }
    // The previous page's scroll effects tear down and images load while the new page settles, which can
    // knock the position off — so keep re-aligning to the target for the first ~1.5s.
    let tries = 0;
    const timers = [];
    const seek = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el || ++tries > 30) {
        clearInterval(seek);
        if (!el) return;
        [0, 300, 700, 1200, 1600].forEach((ms) => timers.push(setTimeout(() => scrollToTarget(el), ms)));
      }
    }, 100);
    const stop = () => timers.forEach(clearTimeout); // user took over scrolling
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      clearInterval(seek);
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [pathname, hash]);
  return null;
};

// Wraps the routes so each new page eases in over ~380ms (opacity + 10px). Only the path (not the #hash) re-triggers it.
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="hi-page-in">
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ProposalProvider>
        <ScrollManager />
        <div className="min-h-screen w-full overflow-x-clip bg-hi-surface">
          <Navbar />
          <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/our-team" element={<Navigate to="/about#team" replace />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/destinations" element={<DestinationsIndex />} />
            <Route path="/destinations/:slug" element={<DestinationRoute />} />
            <Route path="/:slug" element={<ServiceRoute />} />
            {subServicePrefixes.map((pre) => (
              <Route key={pre} path={`/${pre}/:slug`} element={<SubServicePage />} />
            ))}
            <Route path="/blogs" element={<BlogIndex />} />
            <Route path="/blog-posts/:slug" element={<BlogPost />} />
            <Route path="/post/:slug" element={<OldPostRedirect />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/destination-hotels/:slug" element={<ExperiencePage kind="hotels" />} />
            <Route path="/destination-tours/:slug" element={<ExperiencePage kind="tours" />} />
            <Route path="/destinations-activities/:slug" element={<ExperiencePage kind="activities" />} />
            <Route path="/become-a-vendor" element={<Vendor />} />
            <Route path="/privacy-policy" element={<Legal key="privacy-policy" doc="privacy-policy" />} />
            <Route path="/terms-of-service" element={<Legal key="terms-of-service" doc="terms-of-service" />} />
            <Route path="/cookies-settings" element={<Legal key="cookies-settings" doc="cookies-settings" />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
            <Route path="/work" element={<Navigate to="/case-studies" replace />} />
            <Route path="/services/*" element={<Navigate to="/company-offsite" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </PageTransition>
          <Footer />
          <WhatsAppWidget />
        </div>
      </ProposalProvider>
    </BrowserRouter>
  );
}

export default App;
