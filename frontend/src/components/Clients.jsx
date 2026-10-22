import React from "react";
import { hero } from "@/data/content";

// Client logos in their real colours, each on its own chip (white artwork gets a navy chip)
const Clients = () => {
  const logos = [...hero.clients, ...hero.clients];
  return (
    <section className="bg-hi-surface pb-6 pt-16" data-testid="clients">
      <p className="hi-container text-center text-[15px] font-medium text-hi-ink">{hero.clientsTitle}</p>
      <div className="hi-marquee-mask mt-8 overflow-hidden py-3">
        <div className="hi-marquee-track fast items-center gap-5 px-3">
          {logos.map((c, i) => (
            <div
              key={i}
              className={`flex h-[76px] w-[190px] flex-shrink-0 items-center justify-center rounded-2xl px-8 transition-transform duration-300 hover:-translate-y-1 ${
                c.dark ? "bg-hi-navy shadow-hi-card" : "hi-card"
              }`}
            >
              <img
                src={c.img}
                alt={i < hero.clients.length ? c.name : ""}
                aria-hidden={i >= hero.clients.length}
                className="max-h-9 w-auto max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
