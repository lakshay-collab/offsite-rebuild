import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { hero } from "@/data/content";

const fieldTypes = { company: "text", email: "email", phone: "tel", destination: "text" };
const fieldAutocomplete = { company: "organization", email: "email", phone: "tel-national", destination: "off" };
const inputCls =
  "w-full rounded-2xl border border-[#e3dccd] bg-[#f6f2ea] px-5 py-4 text-[16px] text-hi-ink outline-none transition-all placeholder:text-hi-ink/45 focus:border-[#c9a061] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,160,97,0.18)]";

// The proposal form (company, email, phone with country code, destination) and its thank-you state.
// Used inside the popup and inline on the Contact page.
// NOTE: submission is front-end only for now — wire `submit` to the backend/CRM when ready.
const ProposalForm = ({ prefill = {}, firstFieldRef, onClose }) => {
  const f = hero.proposalForm;
  const [sent, setSent] = useState(false);
  const [country, setCountry] = useState(f.countries[0]);

  const submit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return e.currentTarget.reportValidity();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center" data-testid="proposal-success">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hi-navy text-white shadow-[0_0_0_6px_rgba(201,160,97,0.22)]">
          <Check size={24} strokeWidth={2.5} />
        </span>
        <h4 className="hi-display mt-6 text-[30px] text-hi-ink">{f.successTitle}</h4>
        <p className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-hi-ink">{f.successText}</p>
        <button
          type="button"
          onClick={() => (onClose ? onClose() : setSent(false))}
          className="hi-btn hi-btn-navy mt-7 !px-8 !py-3 !text-[14px]"
        >
          {onClose ? "Close" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex h-full flex-col justify-center gap-4" data-testid="proposal-form">
      <input
        ref={firstFieldRef}
        name="company"
        type={fieldTypes.company}
        autoComplete={fieldAutocomplete.company}
        required
        placeholder={f.fields.company.placeholder}
        aria-label={f.fields.company.label}
        className={inputCls}
        data-testid="proposal-company"
      />
      <input
        name="email"
        type={fieldTypes.email}
        autoComplete={fieldAutocomplete.email}
        required
        defaultValue={prefill.email || ""}
        placeholder={f.fields.email.placeholder}
        aria-label={f.fields.email.label}
        className={inputCls}
        data-testid="proposal-email"
      />

      {/* phone with country code */}
      <div className="flex overflow-hidden rounded-2xl border border-[#e3dccd] bg-[#f6f2ea] transition-all focus-within:border-[#c9a061] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(201,160,97,0.18)]">
        <label className="relative flex flex-shrink-0 items-center gap-2 border-r border-[#e3dccd] px-4">
          <img src={`/images/flags/${country.code}.png`} alt="" className="h-[14px] w-[21px] rounded-[2px] object-cover" />
          <span className="text-[16px] text-hi-ink">{country.dial}</span>
          <ChevronDown size={15} className="text-hi-ink" />
          <select
            aria-label="Country code"
            value={country.code}
            onChange={(e) => setCountry(f.countries.find((c) => c.code === e.target.value))}
            className="absolute inset-0 cursor-pointer opacity-0"
            data-testid="proposal-country"
          >
            {f.countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.dial})
              </option>
            ))}
          </select>
        </label>
        <input
          name="phone"
          type={fieldTypes.phone}
          autoComplete={fieldAutocomplete.phone}
          required
          pattern="[0-9\s\(\)\-]{6,}"
          placeholder={f.fields.phone.placeholder}
          aria-label={f.fields.phone.label}
          className="min-w-0 flex-1 bg-transparent px-4 py-4 text-[16px] text-hi-ink outline-none placeholder:text-hi-ink/45"
          data-testid="proposal-phone"
        />
      </div>

      <input
        name="destination"
        type={fieldTypes.destination}
        autoComplete={fieldAutocomplete.destination}
        required
        defaultValue={prefill.destination || ""}
        placeholder={f.fields.destination.placeholder}
        aria-label={f.fields.destination.label}
        className={inputCls}
        data-testid="proposal-destination"
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-full py-4 text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_rgba(0,33,49,0.3)] transition-transform hover:-translate-y-0.5"
        style={{ background: "linear-gradient(90deg, #002131, #174358)" }}
        data-testid="proposal-submit"
      >
        {f.submit}
      </button>
      <p className="text-center text-[13px] text-hi-ink/70">{f.note}</p>
    </form>
  );
};

export default ProposalForm;
