/**
 * GLOBAL CONSTANTS & GOVERNANCE FLAGS
 * 
 * IMPORTANT NOTICE FOR PRODUCTION DEPLOYMENT:
 * All values flagged below with IS_TEMP_MOCK_DATA = true contain provisional/placeholder
 * content (mock URLs, sample projects, provisional branding assets). Per build rules,
 * replace these with official AIESEC in Bhopal content before production release!
 */

export const GOVERNANCE_CONFIG = {
  IS_TEMP_MOCK_DATA: true,
  STATUS_WARNING: "[TEMP_PLACEHOLDER] Replace with official AIESEC Bhopal content before final launch",
};

export const SITE_METADATA = {
  title: "AIESEC in Bhopal — Incoming Global Volunteer (iGV)",
  description:
    "Discover high-impact volunteer projects in Bhopal, India with AIESEC. Experience new cultures, contribute to UN Sustainable Development Goals, and develop global leadership skills.",
  siteUrl: "https://igv.aiesecbhopal.org", // [TEMP_PLACEHOLDER]
  contactEmail: "bhopal@aiesec.in", // [TEMP_PLACEHOLDER]
  officialGVUrl: "https://aiesec.org/global-volunteer",
  defaultApplyUrl: "https://aiesec.org/opportunity/1345678", // [TEMP_PLACEHOLDER]
  socials: {
    instagram: "https://instagram.com/aiesecinbhopal", // [TEMP_PLACEHOLDER]
    linkedin: "https://linkedin.com/company/aiesec-in-bhopal", // [TEMP_PLACEHOLDER]
    youtube: "https://youtube.com/aiesecglobal", // [TEMP_PLACEHOLDER]
  },
};

export const BRAND_COLORS = {
  primaryBlue: "#037EF3",
  deepNavy: "#071B2F",
  offWhite: "#F7F5F0",
  impactGreen: "#2E9E6F",
  warmYellow: "#FFC857",
  coral: "#FF6B5E",
  mutedText: "#5B6573",
  border: "#E5E7EB",
};
