import type { FunctionComponent } from "react";
import { PortfolioManager } from "../portfolio-manager/portfolio-manager";

export const Dashboard: FunctionComponent = () => {
  return (
    <>
      <h2 className="text-4xl font-bold lowercase my-8">welcome back!</h2>
      <PortfolioManager />
    </>
  );
};
