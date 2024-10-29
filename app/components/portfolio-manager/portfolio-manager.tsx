import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPortfolioItems } from "~/queries/portfolio/get-portfolio-items";
import { columns } from "./helpers/table-columns";

import { CreatePortfolioDialog } from "./components/create-portfolio-dialog";
import { DataTable } from "../ui/data-table";
import { SkeletonTable } from "./components/skeleton-table";

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
      {isLoading && <SkeletonTable />}
      {isError && <div>something went wrong. please try again later.</div>}
      {portfolios && <DataTable columns={columns} data={portfolios} />}
    </section>
  );
};
