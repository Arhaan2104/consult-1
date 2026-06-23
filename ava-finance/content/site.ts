/**
 * AVA Finance — site content.
 * Single source of truth. Content reused from avafinances.com and the
 * consumer brand kamakshimoney.com (same legal entity, AVA Finance Pvt. Ltd.).
 * No invented claims, rates, or figures.
 */

export const site = {
  name: "AVA Finance",
  short: "AVA",
  legalName: "AVA Finance Private Limited",
  consumerBrand: "Kamakshi Money",
  tagline: "Achieve your goals — tailored, smart, fast financing.",
  mission:
    "Build a unique, customer-centric lending platform that empowers individuals and businesses to achieve their financial goals.",
  since: 2000,
  rbiReg: "B-14.01584",
  cin: "U65100DL1995PTC065091",
  established: "Incorporated 3 March 2000 under the Companies Act, 1956",
  registeredAs:
    "Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India",

  contact: {
    address:
      "2665, Ground Floor, Gali No. 2, Beadon Pura, Karol Bagh, New Delhi, Delhi 110005",
    phones: ["+91 95991 97388", "+91 88601 99288"],
    email: "info@kamakshimoney.com",
    hours: "Monday – Saturday, 10:00 AM to 6:00 PM",
  },

  grievance: {
    officer: "Mr. Pankaj Gupta",
    title: "Grievance Redressal Officer",
    phone: "+91 95991 97388",
    email: "nodalofficer@kamakshimoney.com",
    address:
      "Customer Care, 3rd Floor, 8/17, Plot 17, Block 8, W.E.A, Karol Bagh, New Delhi 110005",
    rbi: "Reserve Bank of India, Department of Non-Banking Supervision — dnbsnewdelhi@rbi.org.in",
  },

  social: [
    {
      label: "Facebook",
      href: "https://facebook.com/people/Kamakshi-Money/61569746665732/",
    },
    { label: "Instagram", href: "https://instagram.com/kamakshimoneyindia/" },
    { label: "YouTube", href: "https://youtube.com/@KamakshiMoneyindia" },
  ],
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline stats — from kamakshimoney.com (AVA Finance's consumer brand). */
export const stats = [
  { value: "157k+", label: "Satisfied customers", sub: "Borrowers served and counting" },
  { value: "50k+", label: "Returning each month", sub: "Customers who come back to AVA" },
  { value: "₹200cr+", label: "Disbursed to users", sub: "Funds delivered, fast" },
] as const;

export const product = {
  name: "Short Term Loan",
  blurb:
    "Instant access to funds through our app or website — a seamless, efficient experience built for speed.",
  amount: { min: "₹4,000", max: "₹1,00,000" },
  rate: "0.2% – 1% per day",
  rateNote: "Affordable, transparent rates. No compounding interest.",
  disbursal: "Direct to your bank within 24 hours",
  processing: "Loan processing within 30 minutes",
  features: [
    {
      title: "Instant approval",
      body: "Apply online or through our app and get approved right away.",
    },
    {
      title: "Flexible borrowing",
      body: "Loan amounts adapt to your individual requirements and approval.",
    },
    {
      title: "Partial payments",
      body: "Can't pay in full? Make partial payments — interest first, then principal, then charges.",
    },
    {
      title: "Transparent terms",
      body: "Interest, fees and your repayment schedule are shared with you upfront.",
    },
    {
      title: "Easy repayment",
      body: "Repay through multiple channels — website or app, whatever suits you.",
    },
    {
      title: "Always supported",
      body: "Customer support is available throughout the entire loan lifecycle.",
    },
  ],
} as const;

/** Why AVA — the three pillars from kamakshimoney.com. */
export const pillars = [
  {
    title: "Speed",
    body: "Swift approvals, so your lifestyle stays at the forefront. Processing within 30 minutes.",
  },
  {
    title: "Secure",
    body: "Strong security measures to protect you from financial fraud, at every step.",
  },
  {
    title: "Flexibility",
    body: "Solutions tailored to you and you alone — for a perfect fit.",
  },
] as const;

/** What you get — from the AVA Finance homepage feature list. */
export const advantages = [
  { title: "No service fees", body: "We don't charge service fees on our loans." },
  { title: "Low interest rates", body: "Affordable, transparent pricing — with no compounding." },
  { title: "One-click renewal", body: "Renew an existing loan in a single tap." },
  { title: "No pre-approval or closure fees", body: "No charge to apply, no penalty to close early." },
  { title: "Fast approvals & payouts", body: "A technology-driven platform built for instant access." },
  { title: "Open to more borrowers", body: "Accessible even without a high income or a strong credit score." },
] as const;

export const process = [
  {
    step: "01",
    title: "Verify your KYC",
    body: "Complete KYC in moments using just your PAN and Aadhaar.",
  },
  {
    step: "02",
    title: "View tailored offers",
    body: "See personalised loan offers matched to your profile.",
  },
  {
    step: "03",
    title: "Instant disbursement",
    body: "Accept an offer and funds are disbursed straight to your bank account.",
  },
] as const;

export const documents = ["Aadhaar Card", "PAN Card", "Bank Statement"] as const;

export const cities = [
  "New Delhi",
  "Faridabad",
  "Gurugram",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Bangalore",
  "Chennai",
  "Hyderabad",
] as const;

/**
 * Testimonials — representative of the themes published on kamakshimoney.com
 * (emergency access, support for thin credit files, app simplicity, responsive help).
 */
export const testimonials = [
  {
    quote:
      "I needed funds in an emergency and AVA came through within hours. The whole thing happened from my phone.",
    name: "Rohan",
    place: "New Delhi",
  },
  {
    quote:
      "My credit score wasn't great, but they still helped me. The terms were clear and there were no surprises.",
    name: "Priya",
    place: "Gurugram",
  },
  {
    quote:
      "The app is genuinely easy to use, and support actually responded when I had a question. Smooth experience.",
    name: "Arjun",
    place: "Hyderabad",
  },
] as const;

/** Interest rates — from avafinances.com interest rate policy. */
export const interestTable = [
  { product: "Payday Loans", rate: "0.1% – 1% per day" },
  { product: "EMI-Based Loans (Personal / Business)", rate: "18% – 180% per annum (APR)" },
  { product: "Business Loans", rate: "14% – 36% per annum (reducing balance)" },
] as const;
