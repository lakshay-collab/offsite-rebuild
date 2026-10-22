// Capabilities mega menu: order, short taglines, photos and (for Corporate Offsites) the curated link list.
// Category names must match `megaMenu` in pages.js; each category's sub-links come from there.
export const capabilityOrder = [
  {
    name: "Corporate Offsites",
    tagline: "Experiences designed around your team, goals and culture.",
    image: "/images/site/menu-offsite.jpg",
    // curated: label shown in the menu -> title of the service in pages.js
    links: [
      { label: "Team Retreats", match: "Team Retreat" },
      { label: "Leadership Offsites", match: "Leadership Offsite" },
      { label: "Department Offsites", match: "Department Offsite" },
      { label: "Wellness Retreats", match: "Wellness Corporate Retreat" },
      { label: "Luxury Offsites", match: "Luxury Offsite" },
      { label: "Sales Kick-offs", match: "Sales Kick-off" },
      { label: "Team Building Experiences", match: "Team Building Experiences" },
      { label: "Day Offsites", match: "Day Offsite" },
    ],
  },
  {
    name: "Incentive Travel",
    tagline: "Reward trips that motivate your best people and bring them back for more.",
    image: "/images/site/menu-incentive.jpg",
  },
  {
    name: "Conferences & Events",
    tagline: "From focused conferences to galas your audience will remember.",
    image: "/images/site/menu-events.jpg",
  },
  {
    name: "MICE",
    tagline: "Meetings, incentives, conferences and exhibitions, delivered at scale.",
    image: "/images/site/menu-mice.jpg",
  },
  {
    name: "Corporate Workations",
    mobileLabel: "Workations",
    tagline: "Productive escapes in places your team will love working from.",
    image: "/images/site/menu-workation.jpg",
  },
  {
    name: "Educational Trips",
    tagline: "Learning journeys for students, planned end to end.",
    image: "/images/site/menu-education.jpg",
  },
];
