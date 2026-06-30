/**
 * RBI-mandated legal & policy pages for R.K. Bansal Finance.
 * Content reused/condensed from rkbfinance.in policy pages.
 */

export type LegalSection = { heading?: string; body: string[]; bullets?: string[] };
export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  updated?: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "How we collect, use, store and protect your personal information across the lending lifecycle.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect personal information necessary for KYC verification, loan processing, credit appraisal and regulatory compliance.",
        ],
        bullets: [
          "Name, date of birth and contact details",
          "Address and occupation",
          "Income details and bank account details",
          "Identity and address proof documents",
        ],
      },
      {
        heading: "How we use your data",
        body: [
          "We collect only such data that is necessary, relevant and proportionate to the stated purpose — loan servicing, fraud detection, customer service and regulatory requirements.",
        ],
      },
      {
        // CONSULTANT: app-shaped language (device permissions). RKB is currently
        // web-only — confirm whether this section should remain or be reworded.
        heading: "Device permissions",
        body: [
          "Access to your camera, location, SMS and storage is requested only with explicit consent, and is limited to specific purposes such as document uploads and fraud prevention.",
        ],
      },
      {
        heading: "Sharing & third parties",
        body: [
          "Information may be shared with lending service providers and authorised third parties. The company remains fully responsible for the actions of such third parties and ensures appropriate contractual safeguards exist.",
        ],
      },
      {
        heading: "Storage, retention & security",
        body: [
          "All customer data resides on Indian servers and is retained only as long as necessary, after which it is securely deleted or anonymised. We implement administrative, technical and physical safeguards aligned with recognised information-security standards.",
        ],
      },
      {
        heading: "Your rights",
        body: ["You may exercise the following rights regarding your personal information:"],
        bullets: [
          "Access your personal information",
          "Correct inaccurate information",
          "Request deletion of your data",
          "Withdraw consent for non-essential communications",
        ],
      },
      {
        heading: "Grievance contact",
        body: [
          "Mr. Samir Sethi · samir@ramfincorp.com · +91 93114 17272 · Response target: 30 days.",
        ],
      },
    ],
  },
  {
    slug: "fair-practice-code",
    title: "Fair Practice Code",
    summary: "Our commitment to fair, transparent and non-discriminatory dealing with every customer.",
    sections: [
      {
        heading: "Fair & non-discriminatory dealing",
        body: [
          "We treat all customers consistently and fairly, and commit to non-discriminatory practices regarding race, caste, colour, religion, sex, marital status or handicap.",
        ],
      },
      {
        heading: "Transparency & communication",
        body: [
          "All borrower communications occur in a vernacular or otherwise understood language. Loan terms, interest rates and penal charges are disclosed in writing, and penal charges are clearly disclosed in the loan agreement.",
        ],
      },
      {
        heading: "Loan processing",
        body: [
          "Applications are acknowledged in writing with disposal timeframes, credit is assessed properly before approval, and a full copy of the loan agreement is provided at sanction and disbursement.",
        ],
      },
      {
        heading: "Responsible lending",
        body: [
          "Property documents are released within 30 days of full repayment, with compensation of ₹5,000 per day for company-attributable delays. Floating-rate loans are reset only with borrower consent and clear communication, and there are no foreclosure charges on floating-rate personal loans to individuals.",
        ],
      },
      {
        heading: "Grievance resolution & collection conduct",
        body: [
          "Disputes are resolved within 30 days of receiving complete details, with escalation available to the RBI's Department of Non-Banking Supervision. Collection is conducted without undue harassment — no odd-hour calls or muscle tactics — and staff are trained on appropriate customer interaction.",
        ],
      },
    ],
  },
  {
    slug: "interest-rate-policy",
    title: "Interest Rate & Charges Policy",
    summary: "How interest rates are set, and the charges that may apply. Approved 21 April 2025.",
    updated: "21 April 2025",
    sections: [
      {
        heading: "Interest rates by product",
        body: ["All loans currently carry fixed interest rates."],
        bullets: [
          "Pay Day Loan — 0.10% to 1.00% per day",
          "Business Loan — 8% to 25% per annum",
          "Loan Against Property — 12% to 15% per annum",
          "EMI Loan — 24% to 365% per annum (tenure up to 6 months)",
        ],
      },
      {
        heading: "Penal & other charges",
        body: [],
        bullets: [
          "Late payment penalty — 0.1% per day of outstanding principal",
          "EMI bounce / unregistered NACH — up to ₹590",
          "Processing fees — 2% to 10%",
          "Foreclosure (EMI loans after 3 months) — 3% of outstanding principal",
          "No-Dues Certificate (digital) — Nil",
        ],
      },
      {
        heading: "Rate-setting approach",
        body: [
          "A board-approved interest-rate model considers cost of funds, operating expenses, credit-risk assessment and profit margin. Rates vary by borrower based on credit scores, risk profiles and loan tenor.",
        ],
      },
      {
        heading: "Cooling-off period & taxes",
        body: [
          "A 3-day cooling-off period allows exit from a loan with only principal and proportionate APR repayment. All fees and charges are subject to applicable GST and government levies.",
        ],
      },
    ],
  },
  {
    slug: "lending-policy",
    title: "Our Lending Policy",
    summary: "Target customers, sourcing, selection criteria, product norms and risk mitigation.",
    sections: [
      {
        heading: "Scope",
        body: [
          "The lending manual describes target customer profiles, sourcing strategies, customer-selection criteria, product offerings, credit and risk norms, risk-mitigation measures and business-process workflows.",
        ],
      },
      {
        heading: "Target market",
        body: [
          "Employed professionals seeking personal loans with minimal documentation and quick fund access.",
        ],
      },
      {
        heading: "Our commitment",
        body: [
          "We emphasise offering the lowest interest rates to our borrowers, ensuring they are not unnecessarily burdened by high interest rates. A minimal-risk approach enables affordable rates and streamlined approval.",
        ],
      },
    ],
  },
  {
    slug: "grievance-redressal",
    title: "Customer Grievance Redressal Policy",
    summary: "How to raise a complaint and how it is escalated and resolved.",
    sections: [
      {
        heading: "How to file a complaint",
        body: ["You can reach us through any of the following channels:"],
        bullets: [
          "Phone — +91 98999 85495 (10 AM–6 PM, Mon–Sat)",
          "Email — info@ramfincorp.com",
          "Mail — Customer Care Department, 8/9 2nd Floor, WEA, Karol Bagh, New Delhi – 110005",
          "In person — visits accepted at the above address",
        ],
      },
      {
        heading: "Escalation matrix",
        body: [
          "Level 1 — Customer Relationship Manager (10 AM–6 PM weekdays), response within 3 working days.",
          "Level 2 — Customer Service Help Desk: +91 87969 24488 / +91 99101 93884, response within 3 working days.",
          "Level 3 — Grievance Redressal Officer: Mr. Samir Sethi, +91 93114 17272, samir@ramfincorp.com — response within 5 working days.",
        ],
      },
      {
        heading: "RBI escalation",
        body: [
          "If a matter remains unresolved after one month, you may appeal to the Reserve Bank of India, Department of Non-Banking Supervision, 6 Sansad Marg, New Delhi – 110001. Complaints may also be filed via the Sachet RBI and RBI CMS portals.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer-and-disclosure",
    title: "Disclaimer & Disclosure",
    summary: "Important fraud warnings and how to verify genuine communication from us.",
    sections: [
      {
        heading: "Beware of impersonators",
        body: [
          "Imposters and deceitful individuals are impersonating us and fraudulently demanding upfront fees, which we do not charge. We do not charge any upfront fees against our loans — anyone claiming otherwise is unauthorised.",
        ],
      },
      {
        heading: "Genuine communication",
        body: [
          "Beware of counterfeit email addresses and websites using similar names. Only legitimate correspondence comes through info@ramfincorp.com.",
        ],
      },
      {
        heading: "Protect yourself",
        body: [],
        bullets: [
          "Never share an OTP or password with anyone, including Ramfincorp staff.",
          "Avoid responding to suspicious ads, websites and calls.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Anyone dealing with scammers does so at their own risk and responsibility. Ramfincorp takes no responsibility for the losses suffered. R.K. Bansal Finance Private Limited is an NBFC registered with the RBI (Registration B-14.00700), incorporated on 21 November 1984.",
        ],
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    summary: "Terms governing payments, processing and your use of our services.",
    sections: [
      {
        heading: "Payment information",
        body: [
          "Payment data is collected through various gateways when customers purchase subscription packages, including your UPI address, credit/debit card details or other bank account details. Payment processors — not the company itself — store this sensitive information.",
        ],
      },
      {
        heading: "Fraud prevention & disputes",
        body: [
          "Payment processors may employ third-party fraud-detection software to analyse transactions. Customers retain the right to contest any fraud decision by contacting the company directly for additional details.",
        ],
      },
      {
        heading: "Data protection",
        body: [
          "The organisation establishes contracts with payment processors to safeguard personal information. These processors may act as data controllers for specific functions including payment processing, fraud monitoring, regulatory compliance and service improvement.",
        ],
      },
    ],
  },
  {
    slug: "refund-cancellation",
    title: "Refund & Cancellation Policy",
    summary: "How billing, cancellation and refunds are handled.",
    sections: [
      {
        heading: "Billing & subscription",
        body: [
          "The company will automatically begin billing your selected payment method for the relevant subscription plan(s) and any add-on(s) selected at registration, through the third-party payment gateway.",
        ],
      },
      {
        // CONSULTANT: references a 'My Account' / subscription flow. Confirm this
        // refund/subscription policy applies to the current web-only single-loan product.
        heading: "Cancellation & refunds",
        body: [
          "Subscription cancellation can be completed through the 'My Account' section of the site. It may take a few days for a payment made to R.K. Bansal Finance Private Limited to be reflected in your bank account.",
        ],
      },
    ],
  },
  {
    slug: "written-off-policy",
    title: "Written-Off Policy",
    summary: "Guidelines for removing non-recoverable overdue loans while maintaining transparent reporting.",
    updated: "21 April 2025",
    sections: [
      {
        heading: "Objective",
        body: [
          "To establish guidelines for removing non-recoverable overdue loans from the company's books while maintaining transparent financial reporting.",
        ],
      },
      {
        heading: "Eligibility for write-off",
        body: ["An account becomes eligible for write-off when:"],
        bullets: [
          "It remains overdue beyond 30 days",
          "Recovery probability drops below 25% on internal assessment",
          "It qualifies as a Non-Performing Asset (NPA)",
        ],
      },
      {
        heading: "Recovery rights preserved",
        body: [
          "A write-off does not constitute a waiver of the company's legal right to recover the dues. The company may continue pursuing legal action, collection efforts and settlement negotiations post-write-off.",
        ],
      },
      {
        heading: "Oversight",
        body: [
          "Written-off accounts undergo quarterly management reviews, with summary reports presented to the Board of Directors annually or as needed. Effective 21 April 2025.",
        ],
      },
    ],
  },
  {
    slug: "rbi-ombudsman-scheme",
    title: "RBI Integrated Ombudsman Scheme",
    summary: "As an RBI-registered NBFC, we are covered by the Reserve Bank Integrated Ombudsman Scheme.",
    sections: [
      {
        heading: "Complaint channels",
        body: ["You may use any of the following to escalate an unresolved complaint:"],
        bullets: [
          "Sachet RBI — sachet.rbi.org.in",
          "RBI CMS Portal — cms.rbi.org.in",
          "Internal Grievance Escalation Matrix",
        ],
      },
      {
        heading: "Coverage",
        body: [
          "R.K. Bansal Finance is a Non-Banking Financial Company registered with the Reserve Bank of India, and is therefore subject to the RBI's ombudsman scheme regulations.",
        ],
      },
    ],
  },
  {
    slug: "sourcing-partners",
    title: "Our Sourcing Partners",
    summary: "We work with 61 sourcing partners to deliver a fully digital personal-loan experience.",
    sections: [
      {
        heading: "A fully digital network",
        body: [
          "R.K. Bansal Finance works with 61 sourcing partners to provide digital personal-loan services. Our trusted partners help us deliver a fully digital process, eliminating paperwork and offering affordable personal loans in minutes.",
        ],
      },
      {
        heading: "Lending & technology partners",
        body: [
          "Lending partner — R.K. Bansal Finance Pvt. Ltd. (CIN U74110DL1984PTC019355), Karol Bagh, New Delhi. Technology partner — Kundanmal Technology (P) Ltd. (CIN U63999DL2020PTC368108).",
        ],
      },
    ],
  },
  {
    slug: "grievance-escalation-matrix",
    title: "Grievance Escalation Matrix",
    summary: "The levels through which a complaint is escalated until resolution.",
    sections: [
      {
        heading: "Levels of escalation",
        body: [],
        bullets: [
          "Level 1 — Customer Relationship Manager (10 AM–6 PM weekdays)",
          "Level 2 — Customer Service Helpdesk: +91 87969 24488 / +91 99101 93884 (9 AM–6 PM weekdays)",
          "Level 3 — Grievance Redressal Officer: Mr. Samir Sethi, +91 93114 17272, samir@ramfincorp.com (within 5 working days)",
          "Level 4 — RBI Department of Non-Banking Supervision, via Sachet RBI / RBI CMS Portal",
        ],
      },
    ],
  },
];

export const legalNav = legalDocs.map((d) => ({ slug: d.slug, title: d.title }));
export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}

/**
 * Regulatory Disclosures hub — topic structure mirrors the standard NBFC
 * disclosure layout. Every link points to a policy published by
 * R.K. Bansal Finance (rkbfinance.in) or an official RBI portal.
 * Topics not currently published by the company are listed honestly under
 * "available on request" rather than fabricated.
 */
export type DisclosureItem = { label: string; href: string; external?: boolean };
export type DisclosureGroup = { heading: string; items: DisclosureItem[] };

export const disclosureGroups: DisclosureGroup[] = [
  {
    heading: "Codes & Policies",
    items: [
      { label: "Fair Practice Code", href: "/legal/fair-practice-code" },
      { label: "Interest Rate & Penal Charges Policy", href: "/legal/interest-rate-policy" },
      { label: "Our Lending Policy", href: "/legal/lending-policy" },
      { label: "Settlements & Write-Offs Policy", href: "/legal/written-off-policy" },
    ],
  },
  {
    heading: "Grievance Redressal",
    items: [
      { label: "Customer Grievance Redressal Policy", href: "/legal/grievance-redressal" },
      { label: "Grievance Escalation Matrix", href: "/legal/grievance-escalation-matrix" },
      { label: "RBI Integrated Ombudsman Scheme", href: "/legal/rbi-ombudsman-scheme" },
    ],
  },
  {
    heading: "Complaint Portals",
    items: [
      { label: "Sachet Portal (RBI)", href: "https://sachet.rbi.org.in/", external: true },
      { label: "RBI CMS Portal", href: "https://cms.rbi.org.in/", external: true },
    ],
  },
  {
    heading: "Customer Protection",
    items: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms & Conditions", href: "/legal/terms-conditions" },
      { label: "Disclaimer & Disclosure", href: "/legal/disclaimer-and-disclosure" },
      { label: "Refund & Cancellation Policy", href: "/legal/refund-cancellation" },
    ],
  },
  {
    heading: "Partners",
    items: [
      { label: "Our Sourcing Partners", href: "/legal/sourcing-partners" },
    ],
  },
];

/**
 * Standard NBFC disclosure topics R.K. Bansal Finance does not currently
 * publish online. Surfaced honestly rather than invented.
 */
export const disclosuresOnRequest = [
  "Liquidity Coverage Ratio Disclosure",
  "Liquidity Risk Management Disclosures",
  "Customer Education Literature",
  "Notice of Annual General Meeting",
  "Vernacular Disclosures",
];
