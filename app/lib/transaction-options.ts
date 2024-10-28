import { getTransactionTypeIcon } from "~/components/transaction-manager/helpers/type-icons";
import { TRANSACTION_CATEGORIES } from "~/types/transactions";

export const TRANSACTION_OPTIONS = Object.entries(TRANSACTION_CATEGORIES).map(
  ([key, value]) => ({
    label: value,
    value: key.toLowerCase(),
    icon: getTransactionTypeIcon(value),
  })
);
