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

/**
 * Hero trust band — prominent proof figures.
 * NOTE: disbursal, customer, and pin-code figures are PLACEHOLDERS pending
 * client verification. (India has ~19,100 pin codes — confirm RKB's actual reach.)
 */
export const heroTrust = [
  { prefix: "Over", value: "₹6.1 Crore", label: "Loan Disbursed" },
  { prefix: "Over", value: "1.8 Crore", label: "Loan Customers" },
  { prefix: "Over", value: "19,000", label: "Pin Codes Serviced" },
] as const;

export const product = {
  name: "Short Term Loan",
  blurb:
    "Quick access to funds for unexpected expenses, applied for online through our website.",
  // `min`/`max` strings are grounded (rkbfinance.in); `minVal`/`maxVal` mirror them
  // numerically for the loan calculator.
  amount: { min: "₹4,000", max: "₹1,00,000", minVal: 4000, maxVal: 100000 },
  rate: "0.2% – 1% per day",
  rateNote: "Fixed interest rate. No compounding.",
  // Numeric daily-rate band (per cent) for the calculator — mirrors `rate` above.
  dailyRatePct: { min: 0.2, max: 1 },
  disbursal: "Within 24 hours of approval",
  // PLACEHOLDER — tenure is NOT published on rkbfinance.in's product page. Figures
  // below are illustrative (competitor short-term loans run ~7–90 days); the calculator
  // and headline grid depend on `minDays`/`maxDays`. Confirm exact terms with consultant.
  tenure: { min: "15 days", max: "90 days", minDays: 15, maxDays: 90 },
  tenureNote:
    "Repaid as a single payment on the due date, or in partial repayments beforehand.", // PLACEHOLDER
  features: [
    {
      icon: "check-circle",
      title: "Instant approval",
      body: "An automated system reviews your application and approves eligible borrowers right away.",
    },
    {
      icon: "clock",
      title: "Funds within 24 hours",
      body: "Once approved, money is disbursed directly to your bank account within a day.",
    },
    {
      icon: "refresh",
      title: "One-click renewal",
      body: "Renew an existing loan in a single step, without repeating the full application.",
    },
    {
      icon: "calendar",
      title: "Flexible & partial repayment",
      body: "Repay online through your account. Partial payments settle interest first, then principal, then charges.",
    },
    {
      icon: "document",
      title: "Transparent terms",
      body: "Rates, fees and the repayment schedule are disclosed in writing, upfront.",
    },
    {
      icon: "people",
      title: "Open to more borrowers",
      body: "No income threshold and accessible to applicants with limited or poor credit history.",
    },
  ],
} as const;

/** Why borrowers choose RKB — from the homepage feature list. */
export const advantages = [
  { icon: "coin-slash", title: "No service fees", body: "We do not charge service fees on our loans." },
  { icon: "trend-down", title: "Among the lowest rates", body: "Competitive interest rates, kept low by a minimal-risk profile." },
  { icon: "tag", title: "No pre-approval penalties", body: "No charge to apply and no penalty before approval." },
  { icon: "unlock", title: "No closure penalties", body: "Close your loan early without a foreclosure penalty." },
  { icon: "people", title: "No income threshold", body: "Eligibility is not gated behind a minimum income requirement." },
  { icon: "bolt", title: "Fast approvals & payouts", body: "Digital, end-to-end processing removes the traditional wait." },
] as const;

export const process = [
  {
    step: "01",
    title: "Apply online",
    body: "Submit a short application on our website with minimal documentation.",
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

/** Charges that genuinely apply to the single Short Term Loan (subset of `charges`). */
export const productCharges = [
  { item: "Service fee", value: "Nil — no service fees" }, // grounded: advantages
  { item: "Pre-approval / processing fee", value: "Nil before approval" }, // grounded: advantages
  { item: "Late payment penalty", value: "0.1% per day of outstanding principal" }, // grounded: charges
  { item: "Foreclosure / closure penalty", value: "Nil" }, // grounded: advantages
  { item: "No-Dues Certificate (digital)", value: "Nil" }, // grounded: charges
  { item: "Cooling-off period", value: "3 days — exit with principal & proportionate APR only" }, // grounded: charges
] as const;

/**
 * Key Fact Statement (KFS) — the RBI-standardised summary of a loan's key terms.
 * Grounded rows reuse `product` / `site` / `charges` verbatim. Rows tagged PLACEHOLDER
 * await the consultant: tenure (see product.tenure), the product-specific processing
 * fee, and the APR (shown as a simple, non-compounded annualisation of the daily rate).
 */
export const kfs = [
  { k: "Loan product", v: product.name }, // grounded
  { k: "Sanctioned amount", v: `${product.amount.min} – ${product.amount.max}` }, // grounded
  { k: "Interest rate", v: product.rate }, // grounded
  { k: "Interest type", v: product.rateNote }, // grounded
  { k: "Tenure", v: `${product.tenure.min} – ${product.tenure.max}`, placeholder: true }, // PLACEHOLDER
  { k: "Processing fee", v: "To be confirmed for this product", placeholder: true }, // PLACEHOLDER
  { k: "Annual Percentage Rate (APR)", v: "73% – 365% p.a. (illustrative — daily rate × 365, no compounding)", placeholder: true }, // derived/PLACEHOLDER
  { k: "Cooling-off period", v: "3 days — exit with principal & proportionate APR only" }, // grounded: charges
  { k: "Foreclosure charges", v: "Nil — no closure penalty" }, // grounded: advantages
  { k: "Grievance officer", v: `${site.grievance.officer} · ${site.grievance.phone}` }, // grounded
] as const;

/**
 * Eligibility — `placeholder: true` rows (age, residency) await client confirmation;
 * the rest restate existing verbatim copy (advantages / product.features / process).
 */
export const eligibility = [
  { label: "Age", value: "21 – 58 years", placeholder: true }, // PLACEHOLDER
  { label: "Residency", value: "Resident of India", placeholder: true }, // PLACEHOLDER
  { label: "Income", value: "No minimum income threshold", placeholder: false }, // grounded: advantages
  { label: "Credit history", value: "Limited or poor credit accepted", placeholder: false }, // grounded: product.features
  { label: "Documentation", value: "Minimal — KYC only", placeholder: false }, // grounded: process
] as const;

/**
 * Documents required — grounded in the Privacy Policy collected-data bullets
 * (content/legal.ts). Specific document names are an illustrative KYC set (PLACEHOLDER).
 */
export const documents = [
  { title: "Identity proof", body: "PAN card and one government photo ID — Aadhaar, Passport, Voter ID or Driving Licence.", placeholder: true }, // PLACEHOLDER specifics
  { title: "Address proof", body: "Aadhaar or any other RBI-accepted proof of current address.", placeholder: true }, // PLACEHOLDER specifics
  { title: "Bank details", body: "An active bank account for disbursal and repayment.", placeholder: false }, // grounded: privacy policy
  { title: "Income / employment", body: "A recent salary slip or bank statement, where applicable.", placeholder: true }, // PLACEHOLDER specifics
] as const;

/**
 * Trust-signal proof band (Home, before the final CTA) — all grounded regulatory facts.
 * No invented people or quotes. Reuses figures already published elsewhere on the site.
 */
export const trustSignals = [
  { icon: "shield", value: "RBI-Registered", label: "NBFC", sub: `Registration ${site.rbiReg}` },
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
    heading: "Eligibility & applying",
    items: [
      {
        q: "Who is eligible for the Short Term Loan?",
        a: "Eligibility is open and inclusive — there is no minimum income threshold, and applicants with limited or poor credit history can apply. Typical applicants are resident individuals aged 21–58. (Age and residency criteria are indicative and subject to confirmation.)", // PLACEHOLDER (age/residency)
      },
      {
        q: "Can I apply with a limited credit history?",
        a: "Yes. The Short Term Loan has no income threshold and is accessible to applicants with limited or poor credit history.",
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
        a: "Once your application is approved by our automated system, funds are disbursed directly to your bank account within 24 hours.",
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
        a: "Yes. A 3-day cooling-off period lets you exit the loan with only the principal and proportionate APR — no other charges.",
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
        a: "Never. We do not charge any fee before disbursing a loan. Anyone demanding an upfront payment in our name is unauthorised — please report it to us.",
      },
    ],
  },
] as const;
