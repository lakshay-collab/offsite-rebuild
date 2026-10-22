import React from "react";
import { footer } from "@/data/content";

// WhatsApp brand mark
const WhatsAppIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.54 1.75 6.52L3 29l6.65-1.74A12.97 12.97 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2 0-3.96-.54-5.67-1.56l-.4-.24-3.95 1.03 1.05-3.84-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.86-4.74 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.57 1.14 3.08 1.3 3.29.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

// Floating WhatsApp chat button (bottom right on every page). Opens WhatsApp with a ready-made message.
const WhatsAppWidget = () => {
  const w = footer.whatsapp;
  if (!w) return null;
  const href = `https://wa.me/${w.number}?text=${encodeURIComponent(w.message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with HI Offsite on WhatsApp (${w.display})`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 md:bottom-7 md:right-7"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      data-testid="whatsapp-widget"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="hi-wa-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_3px_rgba(255,255,255,0.9),0_0_0_4px_rgba(201,160,97,0.55),0_14px_30px_rgba(0,33,49,0.28)] transition-transform duration-300 group-hover:scale-[1.03]">
          <WhatsAppIcon />
        </span>
      </span>
    </a>
  );
};

export default WhatsAppWidget;
