import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { hero } from "@/data/content";
import ProposalForm from "@/components/ProposalForm";

// Two-panel popup: premium photo on the left, the proposal form on the right.
const ProposalModal = ({ open, onClose, prefill = {} }) => {
  const f = hero.proposalForm;
  const firstField = useRef(null);
  const dialog = useRef(null);

  // Esc to close, keep Tab inside, lock page scroll, focus first field, restore focus on close
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialog.current) {
        const els = dialog.current.querySelectorAll("button, input, select, a[href]");
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current && firstField.current.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      prevFocus && prevFocus.focus && prevFocus.focus();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-[rgba(0,20,30,0.35)] backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="proposal-title"
            className="relative w-full max-w-[1000px]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            data-testid="proposal-modal"
          >
            {/* close button overlapping the top-right corner */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -right-2 -top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-hi-ink shadow-[0_8px_24px_rgba(0,20,30,0.18)] transition-transform hover:rotate-90 md:right-5 md:top-5"
            >
              <X size={18} />
            </button>

            <div className="grid max-h-[90vh] grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_rgba(0,20,30,0.35)] md:grid-cols-[1fr_1.08fr]">
              {/* Left: offsite photo with caption */}
              <div className="relative h-44 md:h-auto md:min-h-[480px]">
                <img src={f.image} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,33,49,0.85) 0%, rgba(0,33,49,0.35) 45%, rgba(0,33,49,0) 75%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white md:text-[14px]">{f.eyebrow}</p>
                  <h3 id="proposal-title" className="hi-display mt-1.5 text-[28px] leading-tight text-white md:text-[40px]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-white md:text-[14px]">{f.caption}</p>
                </div>
              </div>

              {/* Right: form or thank-you (remounts each time the popup opens, so it always starts fresh) */}
              <div data-lenis-prevent className="overflow-y-auto p-6 md:p-12">
                <ProposalForm prefill={prefill} firstFieldRef={firstField} onClose={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProposalModal;
