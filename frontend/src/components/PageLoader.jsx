// There is no loading screen: pages open straight into their own entrance (nav, headline, copy, CTA, visual in
// sequence). This file keeps the old exports so existing pages keep working; the curtain itself is gone.
const intro = { done: false };

// Called once the first page has rendered
export const markIntroSeen = () => {
  intro.done = true;
};

// Seconds page heroes wait before their entrance starts: just enough for the nav to begin (first visit),
// and almost nothing afterwards
export const introDelay = () => (intro.done ? 0.05 : 0.2);

const PageLoader = () => null;

export default PageLoader;
