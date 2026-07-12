/**
 * R.K. Bansal Finance — site content.
 * Single source of truth. All copy reused verbatim from rkbfinance.in.
 * No invented claims, rates, or figures.
 *
 * R.K. Bansal Finance is WEB-ONLY — no mobile app exists yet. Do not introduce
 * app / Play-Store / App-Store copy. Offers a SINGLE loan product (Short Term Loan).
 *
 * PLACEHOLDER convention: where a value is invented (not yet confirmed by the
 * client/consultant), flag it with a header comment naming PLACEHOLDER vs grounded
 * fields, plus inline `// PLACEHOLDER` / `// grounded: <source>` annotations. See
 * `heroTrust` below for the pattern.
 */

export const site = {
  name: "R.K. Bansal Finance",
  short: "RKB Finance",
  legalName: "R.K. Bansal Finance Private Limited",
  tagline: "Empowering borrowers to meet all their financial needs",
  mission:
    "Our technology-driven lending platform delivers a smooth, paper-light borrowing experience—from application to disbursal—through a secure, fully digital process with minimal documentation.",
  since: 1984,
  rbiReg: "B-14.00700",
  cin: "U74110DL1984PTC019355",
  established: "Incorporated 21 November 1984 under the Companies Act, 1956",
  registeredAs: "Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India",

  contact: {
    address: "8/9, Pusa Rd, Block 8, WEA, Karol Bagh, New Delhi, Delhi 110005",
    phones: ["+91 87969 24488", "+91 99101 93884", "+91 98999 85495"],
    email: "info@ramfincorp.com",
    hours: "Monday – Saturday, 10:00 AM to 6:00 PM",
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

/**
 * Hero trust band — prominent proof figures.
 * NOTE: disbursal, customer, and pin-code figures are PLACEHOLDERS pending
 * client verification. (India has ~19,100 pin codes — confirm RKB's actual reach.)
 */
export const heroTrust = [
  { prefix: "Over", value: "₹xxx Crore", label: "Loan Disbursed" },
  { prefix: "Over", value: "xxx Crore", label: "Loan Customers" },
  { prefix: "Over", value: "xxx", label: "Pin Codes Serviced" },
] as const;

export const product = {
  name: "Short Term Loan",
  blurb:
    "Quick access to funds for unexpected expenses, applied for, online through our website.",
  // `min`/`max` strings are grounded (rkbfinance.in); `minVal`/`maxVal` mirror them
  // numerically for the loan calculator.
  amount: { min: "₹4,000", max: "₹1,00,000", minVal: 4000, maxVal: 100000 },
  rate: "0.2% – 1% per day",
  rateNote: "Fixed interest rate. No compounding.",
  // Numeric daily-rate band (per cent) for the calculator — mirrors `rate` above.
  dailyRatePct: { min: 0.2, max: 1 },
  disbursal: "Within x hours of approval",
  // PLACEHOLDER — tenure is NOT published on rkbfinance.in's product page. Figures
  // below are illustrative (competitor short-term loans run ~7–90 days); the calculator
  // and headline grid depend on `minDays`/`maxDays`. Confirm exact terms with consultant.
  tenure: { min: "15 days", max: "90 days", minDays: 15, maxDays: 90 },
  tenureNote:
    "Repaid as a single payment on the due date, or in partial repayments beforehand.", // PLACEHOLDER
  // Curated to what the dedicated sections (facts / eligibility / process) do
  // NOT already say — speed, approval and accessibility live in those sections.
  features: [
    {
      icon: "ledger",
      title: "Simple daily interest",
      body: "Interest is simple daily interest on the principal, at a fixed rate, never compounded.",
    },
    {
      icon: "document",
      title: "Transparent terms",
      body: "Rates, fees and the repayment schedule are disclosed in writing, upfront.",
    },
    {
      icon: "calendar",
      title: "Flexible & partial repayment",
      body: "Repay online through your account. Partial payments settle interest first, then principal, then charges.",
    },
    {
      icon: "refresh",
      title: "One-click renewal",
      body: "Renew an existing loan in a single step, without repeating the full application.",
    },
  ],
} as const;

/**
 * "Why borrowers choose us" — the four homepage benefit cards.
 * Copy supplied verbatim by the client (feedback round, 10 Jul 2026), except
 * the disbursal timing on the first card: the client's original "10 minutes"
 * was aligned to the site-wide "within x hours" placeholder for consistency.
 * Swap "x" for the confirmed SLA before launch.
 */
export const whyChooseUs = [
  {
    icon: "bolt",
    title: "Fast Processing and Disbursal",
    body: "Apply online, check your eligibility and get money directly in your bank within x hours.",
  },
  {
    icon: "calendar",
    title: "Easy Repayment Options",
    body: "Repay the loan amount in easy EMI with flexible tenure options.",
  },
  {
    icon: "network",
    title: "100% Paperless",
    body: "No paperwork or physical documentation is required — apply and get a personal loan completely online.",
  },
  {
    icon: "shield",
    title: "Safe, Secure and Transparent",
    body: "Our loan application process is fully secured and safe, and there are no hidden charges.",
  },
] as const;

/** Why borrowers choose RKB — from the homepage feature list. */
export const advantages = [
  { icon: "coin-slash", title: "No service fees", body: "We do not charge service fees on our loans." },
  { icon: "trend-down", title: "Among the lowest rates", body: "Competitive interest rates, kept low by a minimal-risk profile." },
  { icon: "tag", title: "No pre-approval penalties", body: "No charge to apply and no penalty before approval." },
  { icon: "unlock", title: "No closure penalties", body: "Close your loan early without a foreclosure penalty." },
  { icon: "people", title: "Open to limited credit", body: "Applicants with a limited credit history may also be considered." },
  { icon: "bolt", title: "Fast approvals & payouts", body: "Digital, end-to-end processing removes the traditional wait." },
] as const;

export const process = [
  {
    step: "01",
    label: "Application",
    title: "Apply online",
    body: "Submit a short application on our website with minimal documentation.",
    details: [
      "Entirely online, on our website",
      "Minimal documentation: KYC only",
      "No agents, no branch visit",
    ],
  },
  {
    step: "02",
    label: "Underwriting",
    title: "Instant automated review",
    body: "Our system assesses your application and returns an approval decision right away.",
    details: [
      "Automated underwriting",
      "Approval decision right away",
      "No manual back-and-forth",
    ],
  },
  {
    step: "03",
    label: "Disbursal",
    title: "Funds in your account",
    body: "On approval, the amount is disbursed directly to your bank account within x hours.",
    details: [
      "Disbursed within x hours",
      "Direct to your bank account",
      "For loans of ₹4,000 – ₹1,00,000",
    ],
  },
] as const;

/**
 * Digital sourcing partners — consumer apps that route borrowers to the
 * R.K. Bansal balance sheet. Array order is tuned for the radial diagram so
 * the longest labels land on the left/right (where there is horizontal room).
 */
export const sourcingPartners = [
  "Ramfincorp", // top
  "CASHe", // top-right
  "Bajaj Finserv", // right
  "MobiKwik", // bottom-right
  "Buddy Loan", // bottom
  "CredMantra", // bottom-left
  "Anq Digital Finserv", // left
  "DigitMoney", // top-left
] as const;
export const sourcingPartnerCount = 61;

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
    body: "The personal-loan process is fully digitised, removing extensive physical interactions and long waiting periods.",
  },
] as const;

/**
 * Eligibility — income / credit / documentation copy revised by the client
 * (feedback round, 12 Jul 2026). `placeholder: true` rows (age, pincodes) still
 * await confirmed figures. The "stable source of income" stance is now carried
 * consistently across the site (advantages + eligibility FAQ) — the earlier
 * "No income threshold" claims were untrue and have been removed.
 */
export const eligibility = [
  { label: "Age", value: "xxx years", placeholder: true }, // PLACEHOLDER
  { label: "Residency", value: "xxx pincodes serviced", placeholder: true }, // PLACEHOLDER
  { label: "Income", value: "Stable source of income / repayment capacity", placeholder: false }, // client feedback 12 Jul 2026
  { label: "Credit history", value: "Applicants with limited credit history may also be considered", placeholder: false }, // client feedback 12 Jul 2026
  { label: "Bank account", value: "Active account required", placeholder: false }, // grounded: documents / privacy policy — needed for disbursal & repayment
  { label: "Documentation", value: "KYC and income proof, case-to-case basis", placeholder: false }, // client feedback 12 Jul 2026
] as const;

/**
 * Documents required — grounded in the Privacy Policy collected-data bullets
 * (content/legal.ts). Specific document names are an illustrative KYC set (PLACEHOLDER).
 */
export const documents = [
  { title: "Identity proof", body: "PAN card and one government photo ID: Aadhaar, Passport, Voter ID or Driving Licence.", placeholder: true }, // PLACEHOLDER specifics
  { title: "Address proof", body: "Aadhaar or any other RBI-accepted proof of current address.", placeholder: true }, // PLACEHOLDER specifics
  { title: "Bank details", body: "An active bank account for disbursal and repayment.", placeholder: false }, // grounded: privacy policy
  { title: "Income / employment", body: "A recent salary slip or bank statement, where applicable.", placeholder: true }, // PLACEHOLDER specifics
] as const;

/**
 * Trust-signal proof band (Home, before the final CTA) — all grounded regulatory facts.
 * No invented people or quotes. Reuses figures already published elsewhere on the site.
 */
export const trustSignals = [
  { icon: "shield", value: "RBI-Regd.", label: "NBFC", sub: `Registration ${site.rbiReg}` },
  { icon: "heritage", value: "Since 1984", label: "Four decades", sub: "Incorporated 21 November 1984" },
  { icon: "network", value: "61 Partners", label: "Sourcing network", sub: "A fully digital sourcing network" },
  { icon: "ledger", value: "Fair Practice", label: "Code-bound", sub: "Written terms · 30-day grievance redressal" },
] as const;

/**
 * Grouped FAQ. The first item in each of the original five positions is reused verbatim
 * from the prior Products copy (grounded); added items draw on tenure, eligibility,
 * documents, cooling-off, grievance and data-storage facts. Newly-introduced specifics
 * are kept soft ("typically", "where applicable") and flagged PLACEHOLDER.
 */
export const faqGroups = [
  {
    heading: "Eligibility & application",
    items: [
      {
        q: "Who is eligible for the Short Term Loan?",
        a: "Eligibility is designed to be simple and accessible. We look for a stable source of income and the capacity to repay, and applicants with a limited credit history may also be considered. Typical applicants are resident individuals aged xxx. (Age and residency criteria are indicative and subject to confirmation.)", // PLACEHOLDER (age/residency)
      },
      {
        q: "Can I apply with a limited credit history?",
        a: "Yes. Applicants with a limited credit history may also be considered, subject to a stable source of income and our internal credit assessment.",
      },
      {
        q: "What documents do I need?",
        a: "A minimal KYC set: identity proof (PAN and a government photo ID), proof of address, your bank account details, and an income or bank statement where applicable.", // PLACEHOLDER specifics
      },
      {
        q: "How do I apply?",
        a: "Submit a short application online through our website. An automated system reviews it and returns an approval decision right away.",
      },
      {
        q: "How quickly are funds disbursed?",
        a: "Once your application is approved by our automated system, funds are disbursed directly to your bank account within x hours.",
      },
    ],
  },
  {
    heading: "Amounts, rates & repayment",
    items: [
      {
        q: "How much can I borrow?",
        a: "The Short Term Loan ranges from ₹4,000 to ₹1,00,000, determined by your individual needs and approval.",
      },
      {
        q: "What is the loan tenure?",
        a: "The Short Term Loan is a fixed, short-duration product, typically repaid within a few weeks to a few months. The exact tenure is confirmed in your sanction letter and Key Fact Statement.", // PLACEHOLDER (tenure)
      },
      {
        q: "How is interest calculated?",
        a: "Interest is charged as simple daily interest on the outstanding principal, at a fixed rate of 0.2%–1% per day. There is no compounding.",
      },
      {
        q: "Can I repay in parts?",
        a: "Yes. You can make partial payments online through your account. Partial payments settle outstanding interest first, then principal, then any applicable charges.",
      },
      {
        q: "Can I repay early or foreclose?",
        a: "Yes. You can close your loan early without any foreclosure or closure penalty.",
      },
    ],
  },
  {
    heading: "Fees, charges & penalties",
    items: [
      {
        q: "Are there any upfront or service fees?",
        a: "No. We do not charge service fees, and there are no pre-approval or closure penalties. We never charge any upfront fee before disbursing a loan.",
      },
      {
        q: "What happens if I pay late?",
        a: "A late payment penalty of 0.1% per day applies on the outstanding principal. Applicable charges are disclosed in writing, upfront.",
      },
      {
        q: "Is there a cooling-off period?",
        a: "Yes. A 3-day cooling-off period lets you exit the loan with only the principal and proportionate APR, no other charges.",
      },
      {
        q: "Are charges subject to GST?",
        a: "Yes. All fees and charges are subject to applicable GST and government levies.",
      },
    ],
  },
  {
    heading: "Trust, safety & grievances",
    items: [
      {
        q: "Is R.K. Bansal Finance RBI-registered?",
        a: "Yes. R.K. Bansal Finance is a Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India under registration B-14.00700, incorporated in 1984.",
      },
      {
        q: "How do I raise a complaint?",
        a: `You can contact our Grievance Redressal Officer, ${site.grievance.officer} (${site.grievance.phone}, ${site.grievance.email}). Unresolved complaints can be escalated to the RBI via the Sachet and CMS portals under the Integrated Ombudsman Scheme.`,
      },
      {
        q: "Where is my data stored?",
        a: "All customer data resides on Indian servers, is retained only as long as necessary, and is protected by administrative, technical and physical safeguards.",
      },
      {
        q: "Will anyone ask for a fee before disbursing my loan?",
        a: "Never. We do not charge any fee before disbursing a loan. Anyone demanding an upfront payment in our name is unauthorised. Please report it to us.",
      },
    ],
  },
] as const;
