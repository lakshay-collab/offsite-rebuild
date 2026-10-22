import React from "react";
import { megaMenu, destinationPages } from "@/data/pages";
import { useContent } from "@/components/useContent";
import { TextHero } from "@/components/PageHero";
import SmartLink from "@/components/SmartLink";
import Reveal from "@/components/Reveal";
import { experienceKinds } from "@/pages/ExperiencePage";

const Group = ({ title, links }) => {
  if (!links || !links.length) return null;
  return (
    <Reveal className="break-inside-avoid pb-10">
      <h2 className="hi-title text-[18px] text-hi-ink">{title}</h2>
      <span className="mt-3 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <SmartLink to={l.href} className="hi-link text-[15px] text-hi-ink">
              {l.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </Reveal>
  );
};

// /sitemap — every page of the site, built from the same data the pages use
const Sitemap = () => {
  const blog = useContent("blog/index.json").data;
  const exp = useContent("experiences.json").data;
  const cases = useContent("case-studies.json").data;
  const titleOf = (it) => it.name || (it.hero && (it.hero.eyebrow || it.hero.title)) || it.slug;

  const groups = [
    {
      title: "HI Offsite",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Become a Vendor", href: "/become-a-vendor" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/blogs" },
      ],
    },
    ...megaMenu.map((m) => ({ title: m.name, links: [{ label: `All ${m.name}`, href: m.href }, ...(m.services || []).map((s) => ({ label: s.title, href: s.href }))] })),
    { title: "Destinations", links: [{ label: "All destinations", href: "/destinations" }, ...destinationPages.map((d) => ({ label: d.name, href: `/destinations/${d.slug}` }))] },
    ...Object.entries(experienceKinds).map(([kind, k]) => ({
      title: k.label,
      links: exp ? Object.values(exp[kind] || {}).map((it) => ({ label: titleOf(it), href: `${k.prefix}/${it.slug}` })) : [],
    })),
    { title: "Case Studies", links: cases ? (cases.items || []).map((c) => ({ label: c.title, href: `/case-studies/${c.slug}` })) : [] },
    { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms of Service", href: "/terms-of-service" }, { label: "Cookie Settings", href: "/cookies-settings" }] },
  ];
  const posts = blog ? (blog.posts || []).map((p) => ({ label: p.title, href: `/blog-posts/${p.slug}` })) : [];

  return (
    <main data-testid="sitemap-page">
      <TextHero title="Sitemap" subtitle="Every page on HI Offsite, in one place." />
      <section className="bg-hi-surface py-16 md:py-20">
        <div className="hi-container">
          <div className="columns-1 gap-10 sm:columns-2 lg:columns-4">
            {groups.map((g) => (
              <Group key={g.title} title={g.title} links={g.links} />
            ))}
          </div>
          {posts.length > 0 && (
            <div className="mt-6 border-t border-[#c9a061]/30 pt-12">
              <h2 className="hi-title text-[18px] text-hi-ink">{`The HI Offsite Edit (${posts.length} articles)`}</h2>
              <span className="mt-3 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
              <ul className="mt-5 columns-1 gap-10 md:columns-2 lg:columns-3">
                {posts.map((l) => (
                  <li key={l.href} className="mb-2.5 break-inside-avoid">
                    <SmartLink to={l.href} className="hi-link text-[15px] text-hi-ink">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Sitemap;
