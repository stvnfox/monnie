import type { Portfolio } from "~/types/portfolios";

import { CreatePortfolioDialog } from "./components/create-portfolio-dialog";

export const Dashboard = ({ data }: { data: Portfolio[] }) => {
  const hasPortfolioEntries = data.length > 0;

  return (
    <>
      {hasPortfolioEntries ? (
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
