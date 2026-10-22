import React from "react";
import { ArrowUpRight } from "lucide-react";
import SmartLink from "@/components/SmartLink";

// Article / case-study card: photo, small-caps category with a gold dash, title, arrow chip.
// `featured` makes a wide card with the title over the photo (first post on the blog index).
const PostCard = ({ to, img, title, tag, meta, excerpt, featured = false, testId, cta = "Read more" }) => {
  if (featured) {
    return (
      <SmartLink to={to} className="hi-gold-rim group block h-full rounded-[26px] p-px" data-testid={testId}>
        <div className="relative h-full min-h-[420px] overflow-hidden rounded-[25px]">
          {img && (
            <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,33,49,0.92), rgba(0,33,49,0.3) 55%, rgba(0,33,49,0.05))" }} />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            {tag && (
              <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                <span className="h-px w-6 bg-[#c9a061]" />
                {tag}
              </span>
            )}
            <h3 className="hi-display mt-4 max-w-[640px] text-white" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.12 }}>
              {title}
            </h3>
            {excerpt && <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white">{excerpt}</p>}
            <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
              Read the story <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </SmartLink>
    );
  }
  return (
    <SmartLink to={to} className="hi-gold-rim group block h-full rounded-[24px] p-px" data-testid={testId}>
      <div className="flex h-full flex-col overflow-hidden rounded-[23px] bg-[#fffaf1]">
        <div className="relative h-[210px] overflow-hidden">
          {img && <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]" />}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {(tag || meta) && (
            <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-hi-ink">
              <span className="h-px w-6 bg-[#c9a061]" />
              {[tag, meta].filter(Boolean).join(" · ")}
            </span>
          )}
          <h3 className="hi-title mt-3 flex-1 text-[18px] leading-snug text-hi-ink">{title}</h3>
          <span className="mt-5 flex items-center justify-between border-t border-[#c9a061]/30 pt-4 text-[14px] font-semibold text-hi-ink">
            {cta}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_0_0_1px_rgba(201,160,97,0.45)] transition-all duration-500 group-hover:rotate-45 group-hover:bg-hi-navy group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </span>
        </div>
      </div>
    </SmartLink>
  );
};

export default PostCard;
