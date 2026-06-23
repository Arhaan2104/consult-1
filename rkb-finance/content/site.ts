/**
 * R.K. Bansal Finance — site content.
 * Single source of truth. All copy reused verbatim from rkbfinance.in.
 * No invented claims, rates, or figures.
 */

export const site = {
  name: "R.K. Bansal Finance",
  short: "RKB Finance",
  legalName: "R.K. Bansal Finance Private Limited",
  tagline: "Empowering borrowers to meet all their financial needs",
  mission:
    "Build a one-of-a-kind, effortless loan platform that allows customers to get a loan easily and affordably.",
  since: 1984,
  rbiReg: "B-14.00700",
  cin: "U74110DL1984PTC019355",
  established: "Incorporated 21 November 1984 under the Companies Act, 1956",
  registeredAs: "Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India",

  contact: {
    address: "8/9, Pusa Rd, Block 8, WEA, Karol Bagh, New Delhi, Delhi 110005",
    phones: ["+91 87969 24488", "+91 99101 93884", "+91 98999 85495"],
    email: "info@ramfincorp.com",
    hours: "Monday – Friday, 9:00 AM to 6:00 PM",
  },

  grievance: {
    officer: "Mr. Samir Sethi",
    title: "Grievance Redressal Officer (Nodal Officer)",
    phone: "+91 93114 17272",
    email: "samir@ramfincorp.com",
    address: "8/9, 2nd Floor, WEA, Karol Bagh, New Delhi – 110005",
    rbi: "Reserve Bank of India, Dept. of Non-Banking Supervision, 6 Sansad Marg, New Delhi – 110001",
  },

  social: [
    { label: "Facebook", href: "https://facebook.com/ramfincorp/" },
    { label: "Instagram", href: "https://instagram.com/ramfincorpindia/" },
    { label: "Twitter / X", href: "https://x.com/ramfincorp" },
    { label: "YouTube", href: "https://youtube.com/channel/UCJ7sIx8oNxM4Qg9oHkL_nIQ" },
  ],
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

/** Credibility strip — woven from registration facts. */
export const credibility = [
  { k: "Established", v: "1984" },
  { k: "Registration", v: "RBI NBFC · B-14.00700" },
  { k: "Network", v: "61 Sourcing Partners" },
  { k: "Headquarters", v: "Karol Bagh, New Delhi" },
] as const;

export const product = {
  name: "Short Term Loan",
  blurb:
    "Quick access to funds for unexpected expenses, applied for through our app or website.",
  amount: { min: "₹4,000", max: "₹1,00,000" },
  rate: "0.2% – 1% per day",
  rateNote: "Fixed interest rate. No compounding.",
  disbursal: "Within 24 hours of approval",
  features: [
    {
      title: "Instant approval",
      body: "An automated system reviews your application and approves eligible borrowers right away.",
    },
    {
      title: "Funds within 24 hours",
      body: "Once approved, money is disbursed directly to your bank account within a day.",
    },
    {
      title: "One-click renewal",
      body: "Renew an existing loan in a single step, without repeating the full application.",
    },
    {
      title: "Flexible & partial repayment",
      body: "Repay through the app or website. Partial payments settle interest first, then principal, then charges.",
    },
    {
      title: "Transparent terms",
      body: "Rates, fees and the repayment schedule are disclosed in writing, upfront.",
    },
    {
      title: "Open to more borrowers",
      body: "No income threshold and accessible to applicants with limited or poor credit history.",
    },
  ],
} as const;

/** Why borrowers choose RKB — from the homepage feature list. */
export const advantages = [
  { title: "No service fees", body: "We do not charge service fees on our loans." },
  { title: "Among the lowest rates", body: "Competitive interest rates, kept low by a minimal-risk profile." },
  { title: "No pre-approval penalties", body: "No charge to apply and no penalty before approval." },
  { title: "No closure penalties", body: "Close your loan early without a foreclosure penalty." },
  { title: "No income threshold", body: "Eligibility is not gated behind a minimum income requirement." },
  { title: "Fast approvals & payouts", body: "Digital, end-to-end processing removes the traditional wait." },
] as const;

export const process = [
  {
    step: "01",
    title: "Apply online",
    body: "Submit a short application through the website or app with minimal documentation.",
  },
  {
    step: "02",
    title: "Instant automated review",
    body: "Our system assesses your application and returns an approval decision right away.",
  },
  {
    step: "03",
    title: "Funds in your account",
    body: "On approval, the amount is disbursed directly to your bank account within 24 hours.",
  },
] as const;

/** Stats band — heritage proof, not invented figures. */
export const stats = [
  { value: "1984", label: "Lending since", sub: "Over four decades of operation", animate: false },
  { value: "B-14.00700", label: "RBI registration", sub: "Registered NBFC with the Reserve Bank of India", animate: false },
  { value: "61", label: "Sourcing partners", sub: "A trusted, fully digital sourcing network", animate: true },
] as const;

/** Heritage timeline — drawn from registration & positioning facts. */
export const timeline = [
  {
    year: "1984",
    title: "Incorporated in New Delhi",
    body: "R.K. Bansal Finance Private Limited is incorporated on 21 November 1984 under the Companies Act, 1956.",
  },
  {
    year: "NBFC",
    title: "Registered with the RBI",
    body: "Operating as a Non-Banking Financial Company under RBI registration B-14.00700.",
  },
  {
    year: "Today",
    title: "A digital lending platform",
    body: "The personal-loan process is fully digitised — removing extensive physical interactions and long waiting periods.",
  },
] as const;

export const interestTable = [
  { product: "Pay Day Loan", rate: "0.10% – 1.00% per day" },
  { product: "Business Loan", rate: "8% – 25% per annum" },
  { product: "Loan Against Property", rate: "12% – 15% per annum" },
  { product: "EMI Loan", rate: "24% – 365% per annum (tenure up to 6 months)" },
] as const;

export const charges = [
  { item: "Late payment penalty", value: "0.1% per day of outstanding principal" },
  { item: "EMI bounce charges", value: "Up to ₹590 per bounce" },
  { item: "Processing fees", value: "2% – 10%" },
  { item: "Foreclosure (EMI loans, after 3 months)", value: "3% of outstanding principal" },
  { item: "No-Dues Certificate (digital)", value: "Nil" },
  { item: "Cooling-off period", value: "3 days — exit with principal & proportionate APR only" },
] as const;
