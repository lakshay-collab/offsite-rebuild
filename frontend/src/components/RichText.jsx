import React from "react";
import { useNavigate } from "react-router-dom";
import { resolveHref } from "@/components/SmartLink";

// Article body (blog posts, case studies, legal pages). The HTML is sanitised at extraction time
// (whitelisted tags, only href/src/alt attributes). Links to this site navigate in-app; others open in a new tab.
const RichText = ({ html, className = "" }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const { external, href } = resolveHref(a.getAttribute("href"));
    if (external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      return;
    }
    e.preventDefault();
    navigate(href);
  };
  if (!html) return null;
  return (
    <div className={`hi-prose ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default RichText;
