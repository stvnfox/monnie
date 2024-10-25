import { getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { NavigationComponent } from "~/components/navigation/navigation";
import { PortfolioDetailWrapper } from "~/components/portfolio-detail-wrapper/portfolio-detail-wrapper";

import type { Portfolio } from "~/types/portfolios";
import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

const getPortfolio = createServerFn("GET", async (id: string, { request }) => {
  const { userId } = await getAuth(request);

  if (!userId) {
    throw redirect({
      to: "/",
    });
  }

  const data = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.id, Number(id)));

  return data[0];
});

export const Route = createFileRoute("/portfolio/$id")({
  loader: async ({ params }) => await getPortfolio(params.id),
  component: () => <PortfolioPage />,
});

function PortfolioPage() {
  const state: Portfolio = Route.useLoaderData();

  return (
    <section className="min-h-screen w-screen">
      <div className="container">
        <NavigationComponent />
        <PortfolioDetailWrapper portfolio={state} />
      </div>
    </section>
  );
}
