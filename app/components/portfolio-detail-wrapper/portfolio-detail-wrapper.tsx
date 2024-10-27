import type { FunctionComponent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import type { Portfolio } from "~/types/portfolios";

import { Button } from "~/components/ui/button";
import { RecordManager } from "~/components/record-manager/record-manager";
interface PortfolioDetailWrapperProps {
  portfolio: Portfolio;
}

export const PortfolioDetailWrapper: FunctionComponent<
  PortfolioDetailWrapperProps
> = ({ portfolio }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold lowercase my-8">{portfolio.name}</h1>
        <Button variant="outline">
          <Link to="/" className="flex items-center gap-2 text-sm">
            <ArrowLeftIcon className="w-4 h-4" />
            back to overview
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecordManager />
      </div>
      {JSON.stringify(portfolio)}
    </>
  );
};
