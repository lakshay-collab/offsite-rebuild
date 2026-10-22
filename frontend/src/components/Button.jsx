import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SmartLink from "@/components/SmartLink";
import { useMagnetic } from "@/lib/useMagnetic";

// Tactile pill button with an arrow chip. variant: primary | navy | glass | white; arrow: diagonal | right
// `to` links to a site path (our page or the live site, via SmartLink).
// With onClick (and no href/to) it renders a real <button>, e.g. to open the proposal form.
// `magnetic` (primary conversion CTAs only): a few pixels of pull toward a nearby mouse cursor.
const Button = ({ href, to, onClick, variant = "primary", arrow = "diagonal", magnetic = false, children, className = "", ...rest }) => {
  const Icon = arrow === "right" ? ArrowRight : ArrowUpRight;
  const ref = useMagnetic(magnetic);
  const cls = `hi-btn hi-btn-${variant} ${arrow === "right" ? "hi-btn-arrow-right" : ""} ${magnetic ? "hi-magnetic" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="hi-btn-icon">
        <Icon size={18} strokeWidth={2} />
      </span>
    </>
  );
  if (to) {
    return (
      <SmartLink ref={ref} to={to} onClick={onClick} className={cls} {...rest}>
        {inner}
      </SmartLink>
    );
  }
  if (onClick && !href) {
    return (
      <button ref={ref} type="button" onClick={onClick} className={cls} aria-haspopup="dialog" {...rest}>
        {inner}
      </button>
    );
  }
  return (
    <a ref={ref} href={href || "#"} onClick={onClick} className={cls} {...rest}>
      {inner}
    </a>
  );
};

export default Button;
