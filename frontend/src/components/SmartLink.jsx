import React from "react";
import { Link } from "react-router-dom";

// Old live-site paths (some already dead there) that map onto pages of this site
const aliases = { "/about-us": "/about", "/our-team": "/about#team", "/contact": "/contact-us", "/services": "/company-offsite", "/work": "/case-studies" };

export const resolveHref = (to = "/") => {
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    // absolute links to this site's own domain become in-app links
    const own = to.match(/^https?:\/\/(?:www\.)?hioffsite\.com(\/[^?#]*)?([?#].*)?$/i);
    if (!own) return { external: true, href: to };
    to = (own[1] || "/") + (own[2] || "");
  }
  const [path, hash] = to.split("#");
  const clean = path.replace(/\/+$/, "") || "/";
  let target = aliases[clean] || clean;
  if (/^\/post\//.test(clean)) target = clean.replace(/^\/post\//, "/blog-posts/");
  else if (/^\/services\//.test(clean)) target = "/company-offsite";
  if (hash && !target.includes("#")) target += `#${hash}`;
  return { external: false, href: target };
};

// One link component for every CTA and in-text link: client-side navigation inside the site,
// a normal link (new tab for web addresses) for anything outside it.
const SmartLink = ({ to, children, newTab, ...rest }) => {
  const { external, href } = resolveHref(to);
  if (!external) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const blank = newTab ?? /^https?:/.test(href);
  return (
    <a href={href} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
};

export default SmartLink;
