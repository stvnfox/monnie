import type { GroupedOptions } from "~/types/records";
import { RECORD_OPTIONS } from "~/lib/record-options";
import { CATEGORY_MAPPING } from "./category-mapping";

export const groupedOptions = RECORD_OPTIONS.reduce<GroupedOptions>(
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
