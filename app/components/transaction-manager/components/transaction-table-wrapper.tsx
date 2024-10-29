import type { FunctionComponent } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Transaction } from "~/types/transactions";

import { Card, CardTitle, CardHeader, CardContent } from "~/components/ui/card";
import { DataTable } from "~/components/ui/data-table";

type TransactionTableWrapperProps = {
  title: string;
  columns: ColumnDef<Transaction>[];
  data: Transaction[];
};

export const TransactionTableWrapper: FunctionComponent<
  TransactionTableWrapperProps
> = ({ title, columns, data }) => {
  return (
    <Card className="border-none">
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {data && <DataTable columns={columns} data={data} />}
      </CardContent>
    </Card>
  );
};
