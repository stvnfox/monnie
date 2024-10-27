export const RECORD_CATEGORIES = {
  // Income
  SALARY: "Salary & Wages",
  BUSINESS: "Business Income",
  GIFTS: "Gifts Received",
  BONUS: "Bonuses & Awards",
  INTEREST: "Interest & Dividends",

  // Regular Expenses
  HOUSING: "Housing & Rent",
  GROCERIES: "Groceries & Supplies",
  DINING: "Dining & Restaurants",
  TRANSPORT: "Transportation",
  TRANSIT: "Public Transit",

  // Discretionary Spending
  ENTERTAINMENT: "Entertainment",
  ELECTRONICS: "Electronics & Gadgets",
  GAMING: "Gaming & Hobbies",
  SHOPPING: "Shopping & Clothing",
  HEALTHCARE: "Healthcare",

  // Maintenance & Services
  MAINTENANCE: "Maintenance & Repairs",
  EDUCATION: "Education & Training",
  FEES: "Fees & Charges",
  CREDIT: "Credit Card Payments",

  // Savings & Investments
  SAVINGS: "Savings",
  INVESTMENTS: "Investments",
  BANKING: "Banking",
  RETIREMENT: "Retirement",

  // Utilities
  ELECTRICITY: "Electricity",
  INTERNET: "Internet & Cable",
  WATER: "Water & Sewage",
  PHONE: "Phone & Mobile",
} as const;

interface RecordOption {
  label: string;
  value: string;
  icon: JSX.Element;
}

export interface GroupedOptions {
  [category: string]: RecordOption[];
}

export type RecordCategory =
  (typeof RECORD_CATEGORIES)[keyof typeof RECORD_CATEGORIES];
