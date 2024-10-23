import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPortfolioItems } from "~/queries/get-portfolio-items";
import { columns } from "./helpers/table-columns";

import { CreatePortfolioDialog } from "./components/create-portfolio-dialog";
import { DataTable } from "../ui/data-table";

export const PortfolioManager: FunctionComponent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolios"],
    queryFn: () => getPortfolioItems(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const portfolios = data?.data;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h1>portfolio's</h1>
        <CreatePortfolioDialog />
      </div>
      {isLoading && <div>loading...</div>}
      {isError && <div>error</div>}
      {data && <DataTable columns={columns} data={portfolios} />}
    </section>
  );
};
