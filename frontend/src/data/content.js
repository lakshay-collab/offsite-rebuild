// All homepage content. Images are local files in public/images/site/ (saved from the live site).

export const assets = {
  logoNav: "/images/site/6a3cf7e4a7d30df8b5ee485a_New-Hi-offsite-logo-400px-1.png",
  logoFooter: "/images/site/6a3cebce600a1fca50cebcc9_Hi-offsite-logo-1.png",
  heroBg:
    "/images/site/69648d648f7407aabba375aa_home_page_video_-_feb_2024-1080-c0c5ec.jpg",
  heroVideoMp4:
    "/images/site/6a3cebce600a1fca50cebc14_home_page_video_-_feb_2024-1080p-_mp4.mp4",
  heroVideoWebm:
    "/images/site/6a3cebce600a1fca50cebc14_home_page_video_-_feb_2024-1080p-_webm.webm",
  statsPhone: "/images/site/6a3cebce600a1fca50cebc0c_results-wrpaer-items02.png.png",
  statsVendors: "/images/site/6a3cebce600a1fca50cebc0d_vendor_partner_stats.png.png",
  whyImage: "/images/site/6a3cebce600a1fca50cebc4c_image-1.png",
  whyShadow: "/images/site/6a3cebce600a1fca50cebc4d_Background-Shadow.svg",
  ctaBg: "/images/site/cta-beach.jpg",
  newsletterBrush: "/images/site/6a3cebce600a1fca50cebc6e_Frame-2147225864.png",
  mailIcon: "/images/site/6a3cebce600a1fca50cebc71_Newsletter-image.svg",
};

export const nav = {
  menu: ["Capabilities", "Destinations", "Resources", "About Us"],
  capabilities: [
    { title: "Corporate Offsites", desc: "Get your teams out of the boardroom and into environments that spark vision, and bold thinking." },
    { title: "Incentive Travel", desc: "Luxury reward trips that inspire loyalty, drive performance, and say more than any bonus ever could." },
    { title: "Conferences & Events", desc: "From 50-person conferences to 5,000-seat galas – events your audience will remember." },
    { title: "Corporate Workations", desc: "Swap the office for the extraordinary – productive mornings with a view, team bonding evenings in stunning locations." },
    { title: "MICE", desc: "End-to-end Meetings, Incentives, Conferences, and Exhibitions management for flawless corporate events." },
    { title: "Educational Trips", desc: "Curated learning journeys that take students beyond the classroom." },
    { title: "Remote Offsites", desc: "Bring distributed teams together for moments that matter." },
  ],
  explore: [
    { title: "Destinations", desc: "Explore 100+ vetted destinations across six continents." },
    { title: "Case Studies", desc: "Real offsites. Real teams. Measurable outcomes." },
  ],
  resources: [
    { title: "Blogs", desc: "Tips, trends, and ideas to plan better team experiences." },
    { title: "Case Studies", desc: "See how we delivered for the world's best teams." },
  ],
};

export const hero = {
  title: "Where Teams Come Together",
  titleA: "Where Teams",
  titleB: "Come Together",
  eyebrow: "Corporate Offsites · Incentive Travel · MICE",
  clientsLabel: "Trusted by teams at",
  subtitle:
    "Great offsites don't happen by chance. HI Offsite plans and runs every detail \u2014 from venue and logistics to on-the-ground execution \u2014 so your team can simply show up and connect.",
  cta: "Plan Your Offsite Now",
  // Glass planner bar (visual only, like the rest of the CTAs)
  planner: {
    where: { label: "Where to?", placeholder: "Goa, Bali, Dubai…" },
    // kept short so the compact bar never truncates a chosen value
    size: { label: "Team size", options: ["10–25", "25–50", "50–100", "100–250", "250+"] },
    when: { label: "When", options: ["< 1 month", "1–3 months", "3–6 months", "6+ months", "Flexible"] },
    cta: "Get a Free Proposal",
  },
  // Proposal request popup (opened from the hero button)
  proposalForm: {
    eyebrow: "Plan your",
    title: "Corporate Offsite",
    caption: "Leadership retreats · Team offsites · Incentive trips",
    // sunset team session by the lake (served from public/images)
    image: "/images/proposal-offsite.jpg",
    fields: {
      company: { label: "Company name", placeholder: "Company name" },
      email: { label: "Work email", placeholder: "Email address" },
      phone: { label: "Phone", placeholder: "Enter your phone number" },
      destination: { label: "Destination", placeholder: "Preferred destination (e.g. Goa, Bali)" },
    },
    countries: [
      { code: "in", dial: "+91", name: "India" },
      { code: "ae", dial: "+971", name: "UAE" },
      { code: "sg", dial: "+65", name: "Singapore" },
      { code: "gb", dial: "+44", name: "United Kingdom" },
      { code: "us", dial: "+1", name: "United States" },
    ],
    submit: "Get my proposal",
    note: "Free, no obligation. We never share your details.",
    successTitle: "Thank you!",
    successText: "Our offsite specialists will be in touch shortly with your custom proposal.",
  },
  proof: "500,000+ attendees hosted",
  trust: ["30+ years of expertise", "100+ curated destinations", "1,000+ vendor partners"],
  clientsTitle: "Trusted by teams at the world's best companies",
  clients: [
    { name: "Orange", img: "/images/site/6a3cebce600a1fca50cebd2e_1234.png" },
    { name: "Toyota", img: "/images/site/6a3cebce600a1fca50cebd1a_image-copy9.png" },
    { name: "Firefox", img: "/images/site/6a3cebce600a1fca50cebd23_image-copy23.png" },
    { name: "Royal Canin", img: "/images/site/6a3cebce600a1fca50cebd1c_image-copy7.png" },
    { name: "MoGo", img: "/images/site/6a3cebce600a1fca50cebd1d_image-copy6.png" },
    { name: "TCS", img: "/images/site/6a3cebce600a1fca50cebd1e_image-copy4.png" },
    { name: "IFB", img: "/images/site/6a3cebce600a1fca50cebd1f_Tata.png" },
    // white logo artwork: shown on a dark chip
    { name: "Allianz", img: "/images/site/6a3cebce600a1fca50cebd25_121image-copy.png", dark: true },
  ],
};

export const successStories = {
  eyebrow: "Success Stories",
  title: "We've Done This Before",
  titleA: "We've Done ",
  titleB: "This Before",
  subtitle: "Seamless Offsites. Stronger Teams. Exceptional Outcomes.",
  tagline: "Memories we've created",
  images: [
    "/images/site/6a3cebce600a1fca50cebd32_Pi7_image_tool.jpeg",
    "/images/site/6a3cebce600a1fca50cebd31_Pi7_image_tool-2.jpeg",
    "/images/site/6a3cebce600a1fca50cebd33_Pi7_image_tool-4.jpeg",
    "/images/site/6a3cebce600a1fca50cebd34_Pi7_image_tool-3.jpeg",
    "/images/site/6a3cebce600a1fca50cebd35_Pi7_image_tool-1.jpeg",
    "/images/site/6a3cebce600a1fca50cebd36_Pi7_image_tool-6.jpeg",
    "/images/site/6a3cebce600a1fca50cebd37_Pi7_image_tool-7.jpeg",
    "/images/site/6a3cebce600a1fca50cebd38_1.jpeg",
    "/images/site/6a3cebce600a1fca50cebd39_Pi7_image_tool-5.jpeg",
  ],
};

export const stats = {
  title: "Where Strategy Meets Experience",
  titleA: "Where Strategy Meets ",
  titleB: "Experience",
  items: [
    { kind: "stars", value: "5 Stars", label: "Five star average Google reviews" },
    { kind: "phone", value: "500,000 +", label: "Attendees hosted", img: assets.statsPhone },
    { kind: "vendors", value: "1 k +", label: "Vendor partners", img: assets.statsVendors },
  ],
  // Animated count-up band
  counters: [
    { count: 30, suffix: "+", label: "Years of expertise" },
    { count: 500000, suffix: "+", label: "Attendees hosted" },
    { count: 1000, suffix: "+", label: "Vendor partners" },
    { count: 100, suffix: "+", label: "Curated destinations" },
  ],
  rating: "Google Reviews",
  googleRating: 4.6, // single source for every Google rating badge on the site
};

// About Us page (content from hioffsite.com/about-us and /our-team)
export const about = {
  hero: {
    title: "Built to Move Teams Forward",
    subtitle:
      "HI Offsite is a global corporate retreat company with 30+ years of experience planning offsites, retreats, and MICE events across 100+ destinations worldwide.",
    cta: "Explore What We Do",
    img: "/images/site/about-banner.jpg",
  },
  story: {
    title: "The Problem We Were Built to Solve",
    img: "/images/site/6a3cebce600a1fca50cebd0c_tcs-3-p-800.png",
    inset: "/images/site/6a3cebce600a1fca50cebd16_orange-5-1-p-800.jpg",
    paragraphs: [
      "For over 30 years, we noticed the same problem. Most corporate retreats were just meetings in a different room with the same agenda, hierarchy, and outcomes. Teams left having spent a budget, not having gained an experience.",
      "HI Offsite was built to change that. We design transformational, high-impact experiences that break teams out of their routine, align with their corporate goals, and deliver real performance and morale gains that outlast the event.",
      "Over three decades, HI Offsite has evolved into a trusted partner for global organizations, having successfully executed complex corporate offsites, MICE programs, incentive travel, and leadership retreats for Fortune 500 companies and fast-scaling enterprises across India, Asia, the Middle East, Europe, and beyond.",
    ],
    mission:
      "The mission has not changed: design personalized, high-impact offsite experiences that bring corporate teams together, fostering collaboration, innovation, and measurable business growth.",
    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "100+", label: "Destinations worldwide" },
      { value: "500+", label: "Programs planned" },
      { value: "200+", label: "Organizations served" },
    ],
  },
  values: {
    title: "The Standards We Hold Ourselves To",
    subtitle: "Not principles on a wall, but commitments we're accountable to on every program.",
    items: [
      { title: "Our Mission", desc: "Create experiences where teams don't just meet but transform." },
      { title: "Our Vision", desc: "To be the world's most trusted offsite design partner." },
      { title: "Our Promise", desc: "Every program delivered exactly as briefed. No exceptions." },
      { title: "Our Passion", desc: "Building human connection through purposefully designed experiences." },
      { title: "Our Focus", desc: "Outcomes, not itineraries. Results that last beyond the event." },
      { title: "Our Commitment", desc: "Transparent, end-to-end partnership from brief to debrief." },
    ],
  },
  team: {
    title: "People Who've Planned 500+ Programs",
    subtitle: "Ensuring every HI Offsite engagement delivers exactly what was promised, so you come as clients, but leave as friends.",
    people: [
      {
        name: "Prem Syal",
        role: "CEO, Founder",
        line: "Thirty years of building retreats that change how teams work together",
        img: "/images/site/6a3e62d6bc83fcf1001d9bf0_Premsyalpic-1.png",
      },
      {
        name: "Satpal Sisodia",
        role: "Chief Customer Success",
        line: "Obsessed with making sure every detail lands exactly right for your team",
        img: "/images/site/6a3cebce600a1fca50cebca0_image-4.png",
      },
    ],
    groupTitle: "The Humans Behind Your Experience",
    groupText: "No bots. No call centers. Just real people who obsess over every detail – so your team can have the time of their lives.",
    groupImg: "/images/site/6a587c5a52daf64ea9a3599d_Team-pic.webp",
    groupImg2: "/images/site/team-pic-2.webp",
  },
  faq: {
    titleParts: ["What People Ask ", "Before They Book"],
    note: "Not seeing your answer? We will get back to you directly.",
    contactTitle: "Can't find your answer?",
    items: [
      { q: "What does HI Offsite do, and how is it different from a travel agency?", a: "HI Offsite is a corporate offsite management company, not a travel agency. We design and execute corporate retreats, MICE events, leadership summits, incentive travel, educational trips, and workations as structured programs with defined objectives. Every engagement starts with your business goals, not a destination catalog." },
      { q: "How long has HI Offsite been operating?", a: "HI Offsite has been operating for 30+ years. Over three decades, we have evolved into a trusted partner for global organizations, executing complex corporate offsites, MICE programs, and incentive travel for Fortune 500 companies and fast-scaling enterprises. Our client portfolio includes 200+ organizations and 100+ destinations globally, among them Toyota, TCS, and Allianz." },
      { q: "What types of organizations does HI Offsite work with?", a: "Organizations of all sizes and sectors, from fast-scaling startups to global enterprises: HR and people teams planning retreats, CMOs and sales heads managing dealer meets and incentive programs, procurement teams sourcing MICE events, and founders planning leadership alignment programs. The common factor is a client who treats the event as a strategic investment." },
      { q: "Does HI Offsite plan international offsites or only within India?", a: "Both. We manage corporate event planning across India and internationally, including Asia, the Middle East, Europe, and beyond, with the same end-to-end management: destination selection, ground logistics, visa coordination where applicable, and dedicated on-ground support throughout." },
      { q: "How do I get a proposal from HI Offsite?", a: "Use the proposal form on this page. Share your team size, preferred dates, and what you want the program to achieve. We respond within 24 to 48 hours with a destination shortlist, a draft program outline, and a transparent cost estimate. No commitments are required at that stage." },
    ],
  },
};

// "Why choose us" block (replaces the old stats band)
export const whyChoose = {
  titleA: "Why Some of the World’s Most Skilled",
  titleB: "Teams Choose HI OFFSITE?",
  subtitle:
    "Companies with highly engaged workforces are 23% more profitable and 18% more productive. We design the experiences that get them there. Here is what sets us apart.",
  left: [
    { title: "End-to-End Planning", desc: "One team manages venue, logistics, agenda, and execution. Your leadership walks in ready, not exhausted from planning." },
    { title: "30+ Years of Expertise", desc: "Three decades of running corporate offsites across six continents. That history shows up in the details." },
    { title: "100+ Curated Destinations", desc: "Every destination on our list is vetted for infrastructure, experience quality, connectivity and group logistics." },
  ],
  right: [
    { title: "Dedicated Key-Account Manager", desc: "One named contact who knows your goals, your budget, and your team’s history. No call center, no ticket system." },
    { title: "Transparent Pricing", desc: "No hidden costs. No surprise line items at checkout. You see exactly what you’re paying for before you commit." },
    { title: "On-Ground Trip Management", desc: "Our team is present at every event. If something changes on the day, they handle it before you even hear about it." },
  ],
};

export const expertise = {
  eyebrow: "Our Expertise",
  titleA: "Corporate Offsites, ",
  titleB: "Curated to ",
  titleAccent: "Perfection", // rendered in the brand orange
  subtitle: "From leadership retreats to company-wide gatherings, we design offsites, MICE and experiences that bring people together and create a lasting impact.",
  // img: photos with the HI OFFSITE branding built into the scene (public/images/site/mock-*.jpg).
  cards: [
    { title: "Corporate Offsites", href: "/company-offsite", img: "/images/site/mock-offsite.jpg" },
    { title: "Team Building Experiences", href: "/corporate-offsites/team-building-experiences", img: "/images/site/mock-teambuilding.jpg" },
    { title: "Incentive Travel", href: "/incentive-travel", img: "/images/site/mock-incentive.jpg" },
    { title: "MICE (Meetings, Incentives, Conferences & Exhibitions)", short: "MICE", href: "/mice", img: "/images/site/mock-mice.jpg" },
    { title: "Leisure Offsites", href: "/corporate-offsites/team-retreat", img: "/images/site/mock-leisure.jpg" },
    { title: "Workations", href: "/corporate-workations", img: "/images/site/mock-workation.jpg" },
  ],
};

export const destinations = {
  eyebrow: "Top Destinations",
  titleA: "The ",
  titleB: "World",
  titleC: " Is Your Corporate Playground",
  subtitle: "Exceptional destinations for leadership retreats and unforgettable team offsites.",
  banner: { titleA: "Ready to Plan Your", titleB: "Offsite?", subtitle: "Explore pre-built events in the best locations.", cta: "Get in touch", bg: "/images/site/offsite-banner-main.jpg", inset: "/images/site/offsite-banner-inset.jpg" },
  filters: ["All", "India", "International"],
  india: ["Udaipur", "Kerala", "Goa", "Rishikesh", "Andaman Islands", "Coorg", "Jodhpur", "Jim Corbett"],
  // card: full card artwork (name + arrow are part of the picture); img: plain photo used by small avatars
  items: [
    { name: "Thailand", img: "/images/site/6a3cebce600a1fca50cebce0_69899c4d0c16856351da0aa1_photo--d2fe88.jpeg", card: "/images/site/dest-thailand.jpg" },
    { name: "Udaipur", img: "/images/site/6a3cebce600a1fca50cebd8f_69899c4c3eb0daf100047335_photo--0197fe.jpeg", card: "/images/site/dest-udaipur.jpg" },
    { name: "Bali", img: "/images/site/69899c4cf0f0ea30e4f42b71_photo-1537996194471-e657df975ab4.jpeg", card: "/images/site/dest-bali.jpg" },
    { name: "Kerala", img: "/images/site/6a3cebce600a1fca50cebd5d_69899c4c96f56128c7e8d00c_photo--2822f9.jpeg", card: "/images/site/dest-kerala.jpg" },
    { name: "Goa", img: "/images/site/6a3cebce600a1fca50cebc32_69899c4c58b69753b1da097e_photo--9dd2de.jpeg", card: "/images/site/dest-goa.jpg" },
    { name: "Rishikesh", img: "/images/site/6a3cebce600a1fca50cebe68_photo-1545389336-cf090694435e.jpeg", card: "/images/site/dest-rishikesh.jpg" },
    { name: "Andaman Islands", img: "/images/site/6a3cebce600a1fca50cebe6a_photo-1559628233-100c798642d4.jpeg", card: "/images/site/dest-andaman-islands.jpg" },
    { name: "Coorg", img: "/images/site/6a3cebce600a1fca50cebe76_photo-1506905925346-21bda4d32df4.jpeg", card: "/images/site/dest-coorg.jpg" },
    { name: "Jodhpur", img: "/images/site/6a3cebce600a1fca50cebe6e_photo-1477587458883-47145ed94245.jpeg", card: "/images/site/dest-jodhpur.jpg" },
    { name: "Maldives", img: "/images/site/6a3cebce600a1fca50cebe61_photo-1514282401047-d79a71a590e8.jpeg", card: "/images/site/dest-maldives.jpg" },
    { name: "Jim Corbett", img: "/images/site/6a3cebce600a1fca50cebe5a_photo-1581793745862-99fde7fa73d2.jpeg", card: "/images/site/dest-jim-corbett.jpg", hero: "/images/site/dest-hero-jim-corbett.jpg" },
    { name: "Singapore", img: "/images/site/6a3cebce600a1fca50cebe55_photo-1525625293386-3f8f99389edd.jpeg", card: "/images/site/dest-singapore.jpg" },
    { name: "Sri Lanka", img: "/images/site/6a3d08b67ed473d53ef4f583_Adam_s-Peak-p-1080.webp", card: "/images/site/dest-sri-lanka.jpg" },
    { name: "Vietnam", img: "/images/site/6a3cebce600a1fca50cebe50_photo-1557750255-c76072a7aad1.jpeg", card: "/images/site/dest-vietnam.jpg" },
    { name: "Dubai", img: "/images/site/6a3cebce600a1fca50cebe4a_photo-1512453979798-5ea266f8880c.jpeg", card: "/images/site/dest-dubai.jpg" },
  ],
};

export const whyPartner = {
  eyebrow: "Why Us",
  title: "Why Partner with HI Offsite",
  titleA: "Why Partner with ",
  titleB: "HI Offsite",
  subtitle: "Why some of the world's best corporates and companies choose us.",
  compare: { title: "Why HI Offsite is worth it", own: "On your own", us: "With HI Offsite" },
  left: [
    { title: "End-to-End Planning", desc: "One team handles venue, logistics, agenda, and execution \u2014 so your leadership walks in ready." },
    { title: "30+ Years of Expertise", desc: "Three decades of running corporate offsites across six continents." },
    { title: "100+ Curated Destinations", desc: "Every destination vetted for infrastructure, experience, connectivity, and group logistics." },
  ],
  right: [
    { title: "Dedicated Account Manager", desc: "One named contact who knows your goals, budget, and team. No call center, no tickets." },
    { title: "Transparent Pricing", desc: "No hidden costs, no surprise line items. You see exactly what you pay for upfront." },
    { title: "On-Ground Management", desc: "Our team is present at every event \u2014 if anything changes, they handle it instantly." },
  ],
};

export const howItWorks = {
  eyebrow: "How It Works",
  titleA: "Effortless ",
  titleB: "by Design.",
  subtitle: "Curated with care. Delivered seamlessly.",
  steps: [
    { n: "1", title: "Share your goals", desc: "Team size, budget, dates, vibe. Five minutes is all we need to get started.", img: "/images/site/howitworks-1.jpg" },
    { n: "2", title: "Review your proposal", desc: "A fully custom plan in 24\u201348 hours. We refine it together until it's exactly right.", img: "/images/site/howitworks-2.jpg" },
    { n: "3", title: "Show up", desc: "We handle the rest. Our trip managers run everything on the ground, from the first transfer to the final night.", img: "/images/site/howitworks-3.jpg" },
  ],
};

const AVATAR = "/images/site/6a3cebce600a1fca50cebc15_Placeholder-Avatar-5.png";
export const testimonials = {
  eyebrow: "Testimonials",
  titleA: "Teams That Travel Together, ",
  titleB: "",
  titleAccent: "Grow Together", // second line, brand orange
  subtitle: "Real experiences from teams who\u2019ve gone beyond the usual, with HI Offsite.",
  badge: "Google Reviews",
  // Add reviewCount (e.g. 1240) to show "(1,240)" next to the badge. The rating itself is stats.googleRating.
  reviewCount: null,
  tabs: ["HR & People", "Operations", "Sales", "Management"],
  // team must match one of `tabs`; rating is 4.5\u20135.
  // IMPORTANT: entries with `sample: true` are placeholder copy written for layout only. They show in
  // development/preview with a "Sample" tag and are stripped from production builds. Replace them with
  // genuine client reviews (and remove `sample`) before relying on them.
  cards: [
    // Genuine reviews (from the existing site)
    { team: "HR & People", rating: 5, photo: "/images/site/tst-hr-dinner.jpg", quote: "We just showed up and everything was taken care of. From airport pickups to the final dinner \u2013 flawless execution. Our team is still talking about it.", name: "Priya Sharma", role: "HR Director", avatar: AVATAR, logo: "/images/site/6a3cebce600a1fca50cebc63_tb-kiva.png" },
    { team: "Management", rating: 5, photo: "/images/site/tst-mgmt-goa.jpg", quote: "HI Offsite turned our chaotic team retreat idea into a seamless 3-day experience in Goa. Zero stress for us, maximum fun for the team.", name: "Rajesh Menon", role: "Founder & CEO", avatar: AVATAR, logo: "/images/site/6a3cebce600a1fca50cebc65_Vector12321.png" },
    { team: "Operations", rating: 5, photo: "/images/site/tst-ops-vendors.jpg", quote: "We've worked with multiple vendors before. HI Offsite is the first one where I didn't have to follow up constantly. They just handled it.", name: "Caden D.", role: "Manager, Customer Success", avatar: AVATAR, logo: "/images/site/6a3cebce600a1fca50cebc68_tb-mosaic-logo_aifhwk.svg.png" },

    // SAMPLE placeholders \u2014 replace with real reviews
    { sample: true, team: "HR & People", rating: 4.8, photo: "/images/site/tst-hr-terrace.jpg", quote: "Planning a 200-person offsite usually eats my whole quarter. This time I approved a proposal in two days and spent the trip actually connecting with our people.", role: "Head of People, SaaS company" },
    { sample: true, team: "HR & People", rating: 4.6, photo: "/images/site/tst-hr-yoga.jpg", quote: "The wellness retreat in Rishikesh was beautifully paced \u2013 workshops in the morning, free afternoons, and not a single scheduling hiccup.", role: "L&D Manager, Consulting firm" },
    { sample: true, team: "Operations", rating: 4.9, photo: "/images/site/tst-ops-flights.jpg", quote: "Flights for 140 people from four cities, all landing within the same two hours. The on-ground team had coaches waiting every single time.", role: "Operations Lead, E-commerce company" },
    { sample: true, team: "Operations", rating: 4.7, photo: "/images/site/tst-ops-budget.jpg", quote: "One point of contact, a clear itemised budget and zero surprises on the final invoice. That's rare.", role: "Procurement Manager, Manufacturing group" },
    { sample: true, team: "Sales", rating: 5, photo: "/images/site/tst-sales-bali.jpg", quote: "Our President's Club trip to Bali set the bar for next year's targets. The team still talks about the sunset dinner on the cliffs.", role: "VP Sales, Fintech company" },
    { sample: true, team: "Sales", rating: 4.8, photo: "/images/site/tst-sales-goa.jpg", quote: "The sales kick-off in Goa had all the energy we wanted and none of the logistics we didn't want to think about.", role: "Regional Sales Director, FMCG brand" },
    { sample: true, team: "Sales", rating: 4.5, photo: "/images/site/tst-sales-incentive.jpg", quote: "Incentive travel that actually feels like a reward \u2013 upgraded stays, private experiences, nothing generic.", role: "Head of Channel Sales, Electronics company" },
    { sample: true, team: "Management", rating: 4.9, photo: "/images/site/tst-mgmt-udaipur.jpg", quote: "Our leadership offsite in Udaipur gave us the space to settle three decisions we had been circling for months.", role: "COO, Logistics startup" },
    { sample: true, team: "Management", rating: 4.7, photo: "/images/site/tst-mgmt-board.jpg", quote: "Discreet, polished and on top of every detail \u2013 exactly what our board retreat needed.", role: "Chief of Staff, Financial services firm" },
  ],
};

export const resources = {
  eyebrow: "Resources & Insights",
  titleA: "The ",
  titleB: "HI Offsite",
  titleC: " Edit",
  subtitle: "Tips, trends, and ideas to plan better team experiences.",
  cta: "View all",
  // Home-page picks, in this order, with our own photos (public/images/blog/…); the live
  // article image is used if a photo file is missing
  picks: [
    { href: "/blog-posts/corporate-offsite-in-rishikesh-resorts-activities-complete-guide", img: "/images/blog/rishikesh-uhd.jpg" },
    { href: "/blog-posts/manali-corporate-offsite-best-resorts-activities-itinerary-ideas", img: "/images/blog/manali-uhd.jpg" },
    { href: "/blog-posts/jim-corbett-corporate-offsite-complete-guide-for-corporate-groups", img: "/images/blog/jim-corbett-uhd.jpg" },
    { href: "/blog-posts/udaipur-corporate-offsite-best-resorts-activities-budget", img: "/images/blog/udaipur-uhd.jpg" },
    { href: "/blog-posts/goa-corporate-offsite-complete-planning-guide-for-companies", img: "/images/blog/goa-uhd.jpg" },
    { href: "/blog-posts/how-to-create-a-2-day-corporate-offsite-agenda-that-balances-work-fun", img: "/images/blog/twoday-uhd.jpg" },
    { href: "/blog-posts/why-mice-travel-companies-are-essential-for-corporate-success", img: "/images/blog/mice-uhd.jpg" },
  ],
  posts: [
    { tag: "Offsite", title: "Workcation vs. Work Offsite: What\u2019s the Difference?", img: "/images/site/6a3cebce600a1fca50cebfd5_685f09569809559e568ac33f_full-s-d4c1b2.jpeg" },
    { tag: "Incentive", title: "Why Vietnam Is Emerging as Asia\u2019s Hidden Gem for Incentive Travel Programs", img: "/images/site/6a3cebce600a1fca50cebfd4_69046a31e2ebbb04bb15e5d6_fishin-a9fe69.jpeg" },
    { tag: "Incentive", title: "Why Should You Organize Incentive Travel With HI Offsite", img: "/images/site/6a3cebce600a1fca50cebfd3_68ad49a3c6bb14c0d3c7c51a_medium-f41b09.jpeg" },
  ],
};

export const faq = {
  eyebrow: "Got Questions?",
  titleParts: ["Offsite ", "Essentials"],
  note: "Not seeing your answer? Our team will get back to you directly.",
  contactTitle: "Can't find your answer?",
  items: [
    { q: "How far in advance should we start planning our corporate offsite?", a: "We recommend at least 3\u20135 weeks for most corporate offsites. For larger groups, international company offsite locations, or peak-season dates, 1\u20133 months gives us the lead time to lock in the best venues and strongest rates." },
    { q: "Can you design a corporate offsite around specific business goals?", a: "That is the only way we work. Every corporate offsite package is built from scratch around your objectives. We do not sell itineraries; we design experiences." },
    { q: "How transparent is your pricing?", a: "Fully transparent. Our proposals are detailed and itemized. There are no hidden fees, no surprise add-ons, and no ambiguity. What you approve is what you pay." },
    { q: "Which company offsite locations do you cover?", a: "100+ destinations globally: Goa, Udaipur, Manali, Jim Corbett, Lonavala, Kerala, Sri Lanka, Egypt, Bali, Thailand, Singapore, Dubai, the Maldives and beyond. Not on the list? We will source it." },
    { q: "What makes HI Offsite different from other corporate retreat planning services?", a: "Three things: 30+ years of expertise, 1 million+ travelers handled, and a team that is physically on the ground with yours. Other vendors plan. We execute." },
  ],
};

export const finalCta = {
  eyebrow: "Let's Do This",
  title: "Ready to Plan Your Next Experience?",
  titleA: "Ready to Plan Your",
  titleB: "Next Experience?",
  subtitle: "One conversation. That's all it takes to get started.",
  cta: "Get a Free Proposal",
  email: "hi@hioffsite.com",
  placeholder: "Your work email",
  perks: ["Custom proposal in 24–48 hours", "Transparent, itemised pricing", "Our team on the ground"],
};

export const footer = {
  tagline: "Leading the Way in Offsite Experiences",
  columns: [
    { title: "Services", links: ["Corporate Offsite", "Incentive Travel", "MICE Events", "Corporate Workation", "Educational Trips", "Conferences and Events", "Remote/Virtual Offsite"] },
    { title: "Sitelinks", links: ["Destinations", "Case Studies", "Blog", "Sitemap"] },
    { title: "Company", links: ["About Us", "Our Team", "Become a Vendor", "Contact Us"] },
  ],
  newsletter: { title: "Join the Offsite Insider", titleA: "Join the Offsite ", titleB: "Insider", desc: "Tips, destination ideas, and exclusive offers \u2013 straight to your inbox.", placeholder: "Your email address", cta: "Subscribe", agree: "I agree with Terms & Conditions" },
  copyright: "\u00a9 2026 HI Offsite. All Rights Reserved.",
  legal: ["Privacy Policy", "Terms of Services", "Cookies Settting"],
  // Where each footer entry goes (paths as on the live site; SmartLink decides our page vs live page)
  links: {
    "Corporate Offsite": "/company-offsite",
    "Incentive Travel": "/incentive-travel",
    "MICE Events": "/mice",
    "Corporate Workation": "/corporate-workations",
    "Educational Trips": "/educational-trips",
    "Conferences and Events": "/conferences-events",
    "Remote/Virtual Offsite": "/remote-offsite",
    Destinations: "/destinations",
    "Case Studies": "/case-studies",
    Blog: "/blogs",
    Sitemap: "/sitemap",
    "About Us": "/about",
    "Our Team": "/about#team",
    "Become a Vendor": "/become-a-vendor",
    "Contact Us": "/contact-us",
    "Privacy Policy": "/privacy-policy",
    "Terms of Services": "/terms-of-service",
    "Cookies Settting": "/cookies-settings",
  },
  // floating WhatsApp chat button (bottom right, every page)
  whatsapp: {
    number: "918082008200",
    display: "+91 80820 08200",
    message: "Hi, I’m interested in planning a corporate offsite. Please get in touch to discuss the details.",
    label: "Chat with us",
  },
  social: {
    Instagram: "https://www.instagram.com/hioffsite/",
    Facebook: "https://www.facebook.com/hioffsite/",
    LinkedIn: "https://www.linkedin.com/company/hi-offsite/",
  },
};

// ===== Capabilities mega-menu =====
const miceServices = [
  { title: "Corporate Meetings", desc: "Boardrooms to ballrooms \u2013 we manage meetings of every scale." },
  { title: "Incentive Programs", desc: "Structured reward programs with travel, experiences, and recognition." },
  { title: "Conference Management", desc: "Multi-day conferences with speakers, panels, and breakouts \u2013 perfected." },
  { title: "Exhibition Services", desc: "Trade shows with custom booth design and on-ground management." },
  { title: "Destination Management", desc: "Local expertise in 100+ destinations \u2013 transport, tours, dining, and more." },
  { title: "Venue Sourcing", desc: "We find, vet, and secure the perfect space for your event goals." },
  { title: "Event Production", desc: "Stage design, AV, lighting, and live production \u2013 brought to life." },
  { title: "Delegate Management", desc: "Registration and communication, every attendee covered." },
];

export const capabilitiesMenu = [
  {
    name: "Corporate Offsites",
    desc: "Get your teams out of the boardroom and into environments that spark vision, and bold thinking.",
    services: [
      { title: "Team Retreat", desc: "Immersive getaways that reconnect and recharge your team." },
      { title: "Wellness Corporate Retreat", desc: "Rejuvenating retreats focused on health and team wellbeing." },
      { title: "Luxury Offsite", desc: "Five-star stays with bespoke experiences for exceptional teams." },
      { title: "Department Offsite", desc: "Team-specific retreats to bond, align, and tackle goals." },
      { title: "Day Offsite", desc: "Private settings for board discussions and key decisions." },
      { title: "Leadership Offsite", desc: "Executive retreats to align vision and leadership goals." },
      { title: "Team Building Experiences", desc: "Fun activities that strengthen bonds and boost collaboration." },
      { title: "Sales Kick-off", desc: "High-energy events to motivate and align your sales team." },
      { title: "Startup Offsite", desc: "Fast-paced retreats for growing teams to align and build culture." },
    ],
  },
  {
    name: "Incentive Travel",
    desc: "Luxury reward trips that inspire loyalty, drive performance, and say more than any bonus ever could.",
    services: [
      { title: "Sales Incentive Trips", desc: "Reward your sales champions with destinations." },
      { title: "Presidents Club Trips", desc: "Exclusive luxury trips for your highest achievers and top performers." },
      { title: "Dealer Incentive Programs", desc: "Trips that reward channel partner loyalty." },
      { title: "Employee Reward Travel", desc: "Celebrate milestones and achievements." },
      { title: "Luxury Incentive Trips", desc: "Five-star stays for rewards that match the achievement." },
      { title: "Adventure Incentive Trips", desc: "Safaris, treks, and expeditions for teams that want adrenaline." },
      { title: "Wellness Incentive Retreats", desc: "Spa retreats and wellness escapes that refresh mind, body, and soul." },
      { title: "International Incentive Trips", desc: "Paris, Dubai, Bali, Maldives \u2013 the world's reward destinations." },
    ],
  },
  {
    name: "Conferences & Events",
    desc: "From 50-person conferences to 5,000-seat galas \u2013 events your audience will remember.",
    services: [
      { title: "Annual Conferences", desc: "Large-scale gatherings with keynotes, and networking." },
      { title: "Product Launches", desc: "High-impact launch events that create buzz." },
      { title: "Award Ceremonies", desc: "Elegant recognition events that celebrate your company's best." },
      { title: "Gala Dinners", desc: "Black-tie dining experiences with entertainment, awards." },
      { title: "Networking Events", desc: "Curated meetups that spark meaningful connections." },
      { title: "Seminars & Workshops", desc: "Focused learning sessions with expert speakers." },
      { title: "Town Halls", desc: "Company-wide addresses that connect leadership." },
      { title: "Hybrid Events", desc: "Focused offsites to review performance, set targets, and plan." },
    ],
  },
  {
    name: "Corporate Workations",
    desc: "Swap the office for the extraordinary \u2013 productive mornings with a view, team bonding evenings in stunning locations.",
    services: [
      { title: "Beach Workations", desc: "Laptops by the ocean \u2013 productive mornings and sunset team bonding." },
      { title: "Mountain Workations", desc: "Fresh air and clear minds \u2013 hill station work retreats where ideas flow." },
      { title: "International Workations", desc: "Work from Bali, Lisbon, Dubai \u2013 anywhere the wifi reaches." },
      { title: "Weekend Workations", desc: "Quick 2-3 day escapes \u2013 short trips, big impact on team morale." },
      { title: "Extended Workations", desc: "1-4 week work-travel programs for deep project sprints and bonding." },
      { title: "Startup Workations", desc: "Build fast, bond faster \u2013 sprint-style workations for startup teams." },
      { title: "Creative Workations", desc: "Design sprints and content sessions in locations that fuel imagination." },
      { title: "Wellness Workations", desc: "Morning yoga, afternoon work, evening meditation, mindful." },
    ],
  },
  {
    name: "MICE",
    desc: "End-to-end Meetings, Incentives, Conferences, and Exhibitions management for flawless corporate events.",
    services: miceServices,
  },
  {
    name: "Educational Trips",
    desc: "End-to-end Meetings, Incentives, Conferences, and Exhibitions management for flawless corporate events.",
    services: miceServices,
  },
  {
    name: "Remote Offsites",
    desc: "End-to-end Meetings, Incentives, Conferences, and Exhibitions management for flawless corporate events.",
    services: miceServices,
  },
];

export const resourcesMenu = ["Blogs", "Case Studies"];

export const dropdownCta = {
  titleA: "Ready to Plan Your Next ",
  titleB: "Experience?",
  subtitle: "One conversation. That's all it takes to get started.",
  cta: "Get a Free Proposal",
  bg: assets.ctaBg,
};
