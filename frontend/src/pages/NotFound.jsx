import React from "react";
import { TextHero } from "@/components/PageHero";
import Button from "@/components/Button";
import Destinations from "@/components/Destinations";
import FinalCTA from "@/components/FinalCTA";

const NotFound = () => (
  <main data-testid="not-found">
    <TextHero title="This Page Took a Different Route" subtitle="The page you were looking for has moved or no longer exists. These will get you back on track.">
      <div className="relative mt-9 flex flex-wrap justify-center gap-3">
        <Button variant="navy" to="/">
          Back to home
        </Button>
        <Button variant="white" to="/contact-us">
          Contact us
        </Button>
      </div>
    </TextHero>
    <Destinations />
    <FinalCTA />
  </main>
);

export default NotFound;
