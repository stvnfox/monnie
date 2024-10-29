import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Portfolio } from "~/types/portfolios";
import type { TransactionType } from "~/types/transactions";
import { getTransactionsForPortfolio } from "~/queries/transactions/get-transactions";
import { columns } from "./helpers/table-columns";
import { createCurrencyValue } from "./helpers/create-currency-value";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { AddTransactionForm } from "./components/add-transaction-form";
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

  const getTransactionTypeTotal = (type: TransactionType) => {
    return transactions
      ? transactions.reduce((acc, transaction) => {
          return transaction.type === type
            ? acc + Number(transaction.amount)
            : acc;
        }, 0)
      : 0;
  };

  const incomeTotal = getTransactionTypeTotal("income");
  const expenseTotal = getTransactionTypeTotal("expense");
  const netTotal = incomeTotal - expenseTotal;

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
        <div>
          {/* TODO: add chart with income and expense totals */}
          <p>income total: {createCurrencyValue(incomeTotal)}</p>
          <p>expense total: {createCurrencyValue(expenseTotal)}</p>
          <p>net total: {createCurrencyValue(netTotal)}</p>
        </div>
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
