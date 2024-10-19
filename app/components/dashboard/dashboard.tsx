import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPortfolioItems } from "~/queries/get-portfolio-items";

import { CreatePortfolioDialog } from "./components/create-portfolio-dialog";

export const Dashboard: FunctionComponent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolios"],
    queryFn: () => getPortfolioItems(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      {data ? (
        <div>{JSON.stringify(data)}</div>
      ) : (
        <section className="text-center mt-12">
          <h1 className="text-2xl font-bold mb-4">
            no portfolio items found yet
          </h1>
          <p>click below to start tracking by adding a portfolio item</p>
        </section>
      )}
      <div className="mt-6">
        <CreatePortfolioDialog />
      </div>
    </>
  );
};
