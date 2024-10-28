import type { FunctionComponent } from "react";

import type { Portfolio } from "~/types/portfolios";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { AddTransactionForm } from "./components/add-transaction-form";

interface TransactionManagerProps {
  portfolio: Portfolio;
}

export const TransactionManager: FunctionComponent<TransactionManagerProps> = ({
  portfolio,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>add transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <AddTransactionForm portfolio={portfolio} />
      </CardContent>
    </Card>
  );
};
