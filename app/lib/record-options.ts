import { getRecordTypeIcon } from "~/components/record-manager/helpers/type-icons";
import { RECORD_CATEGORIES } from "~/types/records";

export const RECORD_OPTIONS = Object.entries(RECORD_CATEGORIES).map(
  ([key, value]) => ({
    label: value,
    value: key.toLowerCase(),
    icon: getRecordTypeIcon(value),
  })
);
