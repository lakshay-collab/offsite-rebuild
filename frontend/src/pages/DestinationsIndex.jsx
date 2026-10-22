import React from "react";
import { destinations } from "@/data/content";
import PageLoader from "@/components/PageLoader";
import PageHero from "@/components/PageHero";
import Destinations from "@/components/Destinations";
import { DestinationGuides } from "@/components/PageSections";
import { destinationPages } from "@/data/pages";
import FinalCTA from "@/components/FinalCTA";

// every destination name (plus a few our articles cover) — guides mentioning any of them are listed
const guideWords = [...destinationPages.map((d) => d.name), "Manali", "Lonavala", "Corbett"];

const heroImg = destinations.items.find((d) => d.name === "Maldives")?.img;

// /destinations — every destination at once ("Destinations" in the menu)
const DestinationsIndex = () => (
  <main data-testid="destinations-page">
    <PageLoader />
    <PageHero title="100+ Destinations. All Vetted. All Ready." img={heroImg} alt="Overwater villas in the Maldives" testId="destinations-hero" />
    <Destinations showAll />
    <DestinationGuides name="" title="Destination Planning Guides" aliases={guideWords} limit={6} tone="champagne" />
    <FinalCTA title="Not Sure Where to Go? We'll Shortlist It." subtitle="Tell us your team size, dates and budget. We'll come back with the right destinations." />
  </main>
);

export default DestinationsIndex;
