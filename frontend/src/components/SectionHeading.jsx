import React from "react";
import Reveal from "@/components/Reveal";
import MaskedText from "@/components/MaskedText";

// Bricolage heading + subtitle. Centred by default (hi.tours style).
// oneLine keeps the heading on a single line from tablet width up (it may wrap on phones)
// compact: smaller title + tighter subtitle, for sections that should fit in one screen
// fontSize overrides the size, e.g. oneLineSize(title) for long headings that must still fit one line
const SectionHeading = ({ children, subtitle, dark = false, align = "center", oneLine = false, compact = false, aside, className = "", fontSize }) => {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? `mx-auto ${oneLine ? "" : "max-w-[780px]"} text-center` : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"} ${className}`}
    >
      <div className={centered ? "" : "max-w-[680px]"}>
        <h2
          className={`hi-display ${dark ? "text-white" : "text-hi-ink"} ${oneLine ? "md:whitespace-nowrap" : ""}`}
          style={{ fontSize: fontSize ? fontSize : compact ?"clamp(30px, 3.4vw, 46px)" : oneLine ? "clamp(32px, 4vw, 56px)" : "clamp(34px, 4.4vw, 58px)" }}
        >
          <MaskedText>{children}</MaskedText>
        </h2>
        {subtitle && (
          <p className={`${compact ? "mt-3 text-[16px]" : "mt-5 text-[17px]"} leading-relaxed ${dark ? "text-white" : "text-hi-ink"} ${centered ? "mx-auto max-w-[620px]" : "max-w-[560px]"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {aside && <div className={centered ? "mt-8 flex justify-center" : "flex-shrink-0"}>{aside}</div>}
    </Reveal>
  );
};

export default SectionHeading;
