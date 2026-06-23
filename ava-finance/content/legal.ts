/**
 * RBI-mandated legal & policy pages for AVA Finance.
 * Content reused/condensed from avafinances.com and kamakshimoney.com.
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
      "How AVA Finance collects, uses, secures and shares your information across the lending lifecycle.",
    updated: "30 April 2025",
    sections: [
      {
        heading: "Information we collect",
        body: ["We collect the information needed to verify identity and assess loan applications:"],
        bullets: [
          "Name and contact details (email, phone, address)",
          "Identity verification documents (Aadhaar, PAN, Passport)",
          "Device metadata, operating system and version",
          "Location information, when enabled",
          "Transactional SMS data used to understand income and spending patterns",
        ],
      },
      {
        heading: "How we use location data",
        body: [
          "Location is used to provide better loan offers, support KYC, and reduce the risk associated with a loan application.",
        ],
      },
      {
        heading: "Cookies & tracking",
        body: [
          "Essential cookies remain active; marketing cookies require your consent. Web beacons may monitor email open rates through embedded links.",
        ],
      },
      {
        heading: "Third-party integrations",
        body: ["We work with trusted partners for analytics, attribution, fraud detection and engagement:"],
        bullets: [
          "Microsoft Clarity — behaviour analysis",
          "Trackier — campaign monitoring",
          "Credeau — fraud detection",
          "WebEngage — customer engagement",
        ],
      },
      {
        heading: "Security",
        body: [
          "We apply encryption of sensitive data, access-control mechanisms and regular security audits. No method of electronic storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Your rights",
        body: ["You can:"],
        bullets: [
          "Access and update your personal information",
          "Withdraw consent for data collection and usage",
          "Opt out of marketing communications",
        ],
      },
      {
        heading: "Contact",
        body: ["Privacy Officer — Mr. Ankit Verma · info@kamakshimoney.com"],
      },
    ],
  },
  {
    slug: "credit-policy",
    title: "Credit Policy",
    summary: "Our lending criteria, underwriting framework and customer-protection standards.",
    sections: [
      {
        heading: "Objective",
        body: [
          "AVA Finance Pvt. Ltd. is a non-deposit-accepting NBFC. This policy establishes standardised procedures: risk mitigation through due diligence, defined risk appetite, underwriting frameworks with credit limits, comprehensive credit appraisal, and monitoring of outstanding credit alongside recovery procedures.",
        ],
      },
      {
        heading: "Business segments",
        body: [],
        bullets: [
          "Retail lending — personal credit for consumer durables, travel, marriage and related purposes",
          "Corporate lending — credit to business entities and non-individual organisations",
          "Additional products — determined by committee with defined book-size limits",
        ],
      },
      {
        heading: "Who can apply",
        body: [],
        bullets: [
          "Salaried public-sector employees",
          "Private-sector salaried employees",
          "Self-employed individuals",
          "Students (with a personal guarantee from a responsible party)",
        ],
      },
      {
        heading: "How credit is assessed",
        body: [
          "Applications are submitted via the mobile app or web portal, followed by KYC verification, credit appraisal with income documentation (PAN, Form 16, statements) and a final sanction decision by AVA Finance.",
        ],
      },
      {
        heading: "Tenor & charges",
        body: [
          "Retail credit is limited to a maximum 12-month duration. Processing fees are charged at applicable rates and revised prospectively with customer notification. Additional charges may include platform/tech fees, prepayment charges, late-payment interest, ECS swap fees, cancellation charges, bounce fees and legal expenses.",
        ],
      },
      {
        heading: "Customer protection",
        body: [],
        bullets: [
          "No discrimination based on gender, caste or religion",
          "Detailed disclosure of features, terms and all charges before processing",
          "Written consent required for online/telephonic applications",
          "Status updates provided before accounts become NPAs",
        ],
      },
    ],
  },
  {
    slug: "interest-rate-policy",
    title: "Interest Rate Policy",
    summary:
      "How interest rates and charges are determined, aligned with RBI's Scale-Based Regulation.",
    sections: [
      {
        heading: "Framework",
        body: [
          "This policy aligns with the RBI's Non-Banking Financial Company Scale-Based Regulation (Master Direction, 2023) and establishes the principles and procedures the Company adopts for determining interest rates and other charges.",
        ],
      },
      {
        heading: "Interest rates by product",
        body: [],
        bullets: [
          "Payday Loans — 0.1% to 1% per day",
          "EMI-Based Loans (Personal / Business) — 18% to 180% per annum (APR)",
          "Business Loans — 14% to 36% per annum, on a reducing-balance basis",
        ],
      },
      {
        heading: "Pricing components",
        body: [
          "Rates reflect the cost of funds, operating costs, a risk premium that varies by borrower profile, and a profit margin.",
        ],
      },
      {
        heading: "Risk-based pricing",
        body: [
          "A risk-based pricing framework considers creditworthiness (credit-bureau ratings), income capacity, employment profile and credit history, with non-discriminatory treatment within risk categories. Pricing is reviewed dynamically based on market conditions and regulatory changes.",
        ],
      },
      {
        heading: "Disclosure",
        body: [
          "All rates and the APR are disclosed via the Key Fact Statement (KFS) and the loan agreement. Any change is communicated with advance notice and applied prospectively.",
        ],
      },
    ],
  },
  {
    slug: "fair-practice-code",
    title: "Fair Practice Code",
    summary: "Our commitment to fair, transparent and non-discriminatory lending.",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "AVA Finance treats every customer fairly and without discrimination. We disclose loan terms, interest rates and charges transparently, and communicate in a language you understand.",
        ],
      },
      {
        heading: "Related policies",
        body: ["This code works alongside our other governance documents:"],
        bullets: [
          "Credit Policy",
          "Interest Rate Policy",
          "Grievance Redressal Policy",
          "KYC-AML Policy",
          "Outsourcing Policy",
        ],
      },
    ],
  },
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal Policy",
    summary: "How to raise a complaint, and how it is acknowledged, escalated and resolved.",
    sections: [
      {
        heading: "How to file a complaint",
        body: ["Reach us through any of these channels:"],
        bullets: [
          "Phone — +91 88601 99288 (9 AM–6 PM, weekdays)",
          "Email — info@kamakshimoney.com",
          "Mail — Customer Care, 3rd Floor, 8/17, Plot 17, Block 8, W.E.A, Karol Bagh, New Delhi 110005",
          "In person — at the address above",
        ],
      },
      {
        heading: "Resolution timelines",
        body: [],
        bullets: [
          "Acknowledgment — within 48 hours",
          "First-call resolution — same day where possible",
          "Standard complaints — within 7 working days",
          "Complex complaints — within 30 days",
        ],
      },
      {
        heading: "Escalation",
        body: [
          "Level 1 — Customer Relationship Manager. Level 2 — Customer Service Helpline. Level 3 — Grievance Redressal Officer, Mr. Pankaj Gupta (nodalofficer@kamakshimoney.com, +91 95991 97388). Level 4 — RBI Ombudsman via the CMS and Sachet portals.",
        ],
      },
      {
        heading: "How we handle complaints",
        body: [
          "Each complaint receives a unique reference number and risk-based prioritisation. Investigation includes system review, call recordings and document verification, with a complete audit trail and semi-annual board reporting. A complaint is closed only after resolution is communicated and accepted, or contact attempts are documented.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer-and-disclosure",
    title: "Disclaimer & Disclosure",
    summary: "Fraud warnings and how to verify genuine communication from us.",
    sections: [
      {
        heading: "We are RBI-authorised",
        body: [
          "AVA Finance (Kamakshi Money) is an authentic, RBI-authorised loan provider. We do not charge any upfront fees against our loans.",
        ],
      },
      {
        heading: "Never pay before disbursement",
        body: [
          "Kamakshi Money and our employees will never require any kind of prepayment before loan disbursement. Genuine communication only comes from info@kamakshimoney.com — never from Yahoo, Gmail or Hotmail addresses.",
        ],
      },
      {
        heading: "Protect yourself",
        body: [],
        bullets: [
          "Verify authenticity before engaging with any loan offer",
          "Report suspicious activity to local authorities",
          "Never share an OTP or password with anyone, including staff",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Anyone dealing with scammers does so at their own risk and responsibility. Kamakshi Money takes no responsibility for the losses suffered. AVA Finance Private Limited — RBI Registration B-14.01584, CIN U65100DL1995PTC065091, incorporated 3 March 2000.",
        ],
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    summary: "The terms governing data collection and your use of our services.",
    updated: "20 March 2025",
    sections: [
      {
        heading: "Data we collect",
        body: [
          "We collect personal information (names, contact details, financial records), identity documents (Aadhaar, PAN), device metadata and operating-system information, location data and transactional SMS content.",
        ],
      },
      {
        heading: "Your rights",
        body: [],
        bullets: [
          "Access and update your personal information",
          "Withdraw consent for data collection and usage",
          "Opt out of marketing communications",
        ],
      },
      {
        heading: "Security",
        body: [
          "No method of electronic storage is completely secure, and we cannot guarantee absolute security despite employing encryption and access controls.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Privacy Officer — Mr. Ankit Verma · info@kamakshimoney.com · +91 95991 97388.",
        ],
      },
    ],
  },
  {
    slug: "kyc-aml-policy",
    title: "KYC & AML Policy",
    summary: "Know-Your-Customer and Anti-Money-Laundering safeguards we apply to every account.",
    sections: [
      {
        heading: "Identity verification",
        body: [
          "Every customer completes KYC verification using technological or human resources before a loan is sanctioned, with documents such as PAN and Aadhaar.",
        ],
      },
      {
        heading: "Ongoing diligence",
        body: [
          "We monitor activity for fraud and money-laundering risk, retain records as required by law, and report to the relevant authorities where mandated.",
        ],
      },
    ],
  },
  {
    slug: "outsourcing-policy",
    title: "Outsourcing Policy",
    summary: "How we govern relationships with service providers and lending partners.",
    sections: [
      {
        heading: "Accountability",
        body: [
          "AVA Finance remains responsible for the actions of its outsourcing partners and ensures appropriate contractual safeguards are in place to protect customer information and service quality.",
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
        body: ["Escalate an unresolved complaint through any of the following:"],
        bullets: [
          "RBI CMS Portal — cms.rbi.org.in",
          "Sachet RBI — sachet.rbi.org.in",
          "Grievance Redressal Officer — nodalofficer@kamakshimoney.com",
        ],
      },
      {
        heading: "Coverage",
        body: [
          "Kamakshi Money is the digital platform and lending partner of AVA Finance Pvt. Ltd. (NBFC), which is registered with the Reserve Bank of India and subject to the RBI's ombudsman scheme.",
        ],
      },
    ],
  },
  {
    slug: "partners",
    title: "Our Partners",
    summary: "Our lending, technology and collection partners across India.",
    sections: [
      {
        heading: "Lending & technology",
        body: [
          "Lending partner — R.K. Bansal Finance Pvt. Ltd. (CIN U74110DL1984PTC019355), Karol Bagh, New Delhi. Technology partner — Kundanmal Technology (P) Ltd. (CIN U63999DL2020PTC368108), Delhi.",
        ],
      },
      {
        heading: "Collection network",
        body: [
          "We work with 16 active collection agencies across Hyderabad, Bengaluru, Delhi, Chennai, Mumbai, Kolkata, Uttar Pradesh, Haryana and Jharkhand — each operating under contractual safeguards and fair-collection standards.",
        ],
      },
    ],
  },
];

export const legalNav = legalDocs.map((d) => ({ slug: d.slug, title: d.title }));
export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
