import type { GroupedOptions } from "~/types/transactions";
import { TRANSACTION_OPTIONS } from "~/lib/transaction-options";
import { CATEGORY_MAPPING } from "./category-mapping";

export const groupedOptions = TRANSACTION_OPTIONS.reduce<GroupedOptions>(
  (acc, option) => {
    const category = CATEGORY_MAPPING[option.value];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  },
  {}
);
