import React, { useState } from "react";
import { Check } from "lucide-react";
import { useContent } from "@/components/useContent";
import ContentGate from "@/components/ContentGate";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { GenericSection } from "@/components/ContentBlocks";

const vendorInputCls =
  "w-full rounded-2xl border border-[#e3dccd] bg-[#f6f2ea] px-5 py-4 text-[16px] text-hi-ink outline-none transition-all placeholder:text-hi-ink/45 focus:border-[#c9a061] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,160,97,0.18)]";

const vendorInputType = (f) => {
  const s = `${f.type || ""} ${f.label || ""}`.toLowerCase();
  if (s.includes("email")) return "email";
  if (s.includes("phone") || s.includes("mobile") || s.includes("tel")) return "tel";
  if (s.includes("website") || s.includes("url")) return "url";
  return "text";
};

// Partner application built from the live form's fields.
// NOTE: front-end only for now — connect `submit` to Zoho/CRM before launch.
const VendorForm = ({ form }) => {
  const [sent, setSent] = useState(false);
  const fields = (form && form.fields) || [];
  const submit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return e.currentTarget.reportValidity();
    setSent(true);
  };
  if (!fields.length) return null;
  return (
    <section className="bg-hi-surface py-20 md:py-28" id="apply" data-testid="vendor-form">
      <div className="hi-container max-w-[860px]">
        <Reveal className="text-center">
          <h2 className="hi-display text-hi-ink md:whitespace-nowrap" style={{ fontSize: "clamp(30px, 3.6vw, 50px)" }}>
            {form.title || "Apply to Partner With Us"}
          </h2>
          <span className="mx-auto mt-6 block h-[2px] w-14 rounded-full bg-gradient-to-r from-[#b8873f] to-[#e2c08a]" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <div className="hi-gold-rim rounded-[30px] p-px">
            <div className="rounded-[29px] bg-white p-6 md:p-10">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center" data-testid="vendor-success">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hi-navy text-white shadow-[0_0_0_6px_rgba(201,160,97,0.22)]">
                    <Check size={24} strokeWidth={2.5} />
                  </span>
                  <p className="hi-display mt-6 text-[28px] text-hi-ink">Application received</p>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-hi-ink">Thank you. Our partnerships team will review it and get back to you.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {fields.map((f, i) => {
                    const long = /textarea|multi|message|describe|tell us|additional/i.test(`${f.type} ${f.label}`);
                    const options = (f.options || []).filter(Boolean);
                    const common = { name: `field-${i}`, "aria-label": f.label, required: !/optional/i.test(f.label || ""), className: vendorInputCls };
                    return (
                      <div key={i} className={long || options.length > 6 ? "md:col-span-2" : ""}>
                        {options.length ? (
                          <select {...common} defaultValue="">
                            <option value="" disabled>
                              {f.label}
                            </option>
                            {options.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        ) : long ? (
                          <textarea {...common} rows={4} placeholder={f.label} />
                        ) : (
                          <input {...common} type={vendorInputType(f)} placeholder={f.label} />
                        )}
                      </div>
                    );
                  })}
                  <button
                    type="submit"
                    className="mt-2 rounded-full py-4 text-[16px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_rgba(0,33,49,0.3)] transition-transform hover:-translate-y-0.5 md:col-span-2"
                    style={{ background: "linear-gradient(90deg, #002131, #174358)" }}
                    data-testid="vendor-submit"
                  >
                    Submit application
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const VendorPage = ({ data }) => {
  const hero = data.hero || {};
  return (
    <main data-testid="vendor-page">
      <PageLoader />
      <PageHero title={hero.title || "Partner With HI Offsite"} img={hero.img} testId="vendor-hero">
        {hero.subtitle && <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-white">{hero.subtitle}</p>}
      </PageHero>
      {(data.sections || []).map((s, i) => (
        <GenericSection key={i} section={s} tone={i % 2 ? "champagne" : "plain"} />
      ))}
      <VendorForm form={data.form} />
    </main>
  );
};

// /become-a-vendor
const Vendor = () => {
  const state = useContent("vendor.json");
  return <ContentGate state={state}>{(data) => <VendorPage data={data} />}</ContentGate>;
};

export default Vendor;
