export const PORTFOLIO_TYPES = {
  PERSONAL: "personal", // Individual day-to-day finances
  HOUSEHOLD: "household", // Shared family or roommate expenses
  SAVINGS: "savings", // Dedicated savings goals
  BUSINESS: "business", // Business income and expenses
  PROJECT: "project", // Time-limited project budgets
  INVESTMENT: "investment", // Investment tracking
  DEBT: "debt", // Debt repayment tracking
  EDUCATION: "education", // Education-related expenses
  TRAVEL: "travel", // Travel and vacation budgets
} as const;

export type PortfolioType =
  (typeof PORTFOLIO_TYPES)[keyof typeof PORTFOLIO_TYPES];

export type Portfolio = {
  id: number;
  name: string;
  userId: string;
  type: PortfolioType;
  createdAt: Date;
};
