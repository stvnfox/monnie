import { PORTFOLIO_TYPES } from "~/types/portfolios";

export const PORTFOLIO_OPTIONS = Object.entries(PORTFOLIO_TYPES).map(
  ([key, value]) => ({
    label: value,
    value: key.toLowerCase(),
  })
);
