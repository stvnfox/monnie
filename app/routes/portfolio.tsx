import { getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

const getPortfolios = createServerFn("GET", async (_, { request }) => {
  const { userId } = await getAuth(request);

  if (!userId) {
    throw redirect({
      to: "/",
    });
  }

  const data = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.userId, userId));

  return data;
});

export const Route = createFileRoute("/portfolio")({
  loader: async () => await getPortfolios(),
  component: PortfolioManager,
});

function PortfolioManager() {
  const state = Route.useLoaderData();

  return <div>{JSON.stringify(state)}</div>;
}
