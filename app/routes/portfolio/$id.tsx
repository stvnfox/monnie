import { getAuth } from "@clerk/tanstack-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

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

  return data;
});

export const Route = createFileRoute("/portfolio/$id")({
  loader: async ({ params }) => await getPortfolio(params.id),
  component: () => <Portfolio />,
});

function Portfolio() {
  const state = Route.useLoaderData();

  return <div>{JSON.stringify(state)}</div>;
}
