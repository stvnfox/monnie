import type { FormInputs } from "~/components/transaction-manager/components/add-transaction-form";

type AddTransactionProps = FormInputs & {
  portfolioId: number;
  userId: string;
};

export const addTransaction = async (values: AddTransactionProps) => {
  const response = await fetch("/api/transactions/create", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to add record");
  }

  return response.json();
};
