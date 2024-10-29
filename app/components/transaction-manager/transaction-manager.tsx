import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Portfolio } from "~/types/portfolios";
import { getTransactionsForPortfolio } from "~/queries/transactions/get-transactions";
import { columns } from "./helpers/table-columns";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { AddTransactionForm } from "./components/add-transaction-form";
import { DataTable } from "../ui/data-table";
import { TransactionTableWrapper } from "./components/transaction-table-wrapper";

interface TransactionManagerProps {
  portfolio: Portfolio;
}

export const TransactionManager: FunctionComponent<TransactionManagerProps> = ({
  portfolio,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsForPortfolio(portfolio.id),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const transactions = data?.data;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>add transaction</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <AddTransactionForm portfolio={portfolio} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <TransactionTableWrapper
          title="income"
          columns={columns}
          data={transactions?.filter((t) => t.type === "income")}
        />
        <TransactionTableWrapper
          title="expenses"
          columns={columns}
          data={transactions?.filter((t) => t.type === "expense")}
        />
      </div>
    </>
  );
};
