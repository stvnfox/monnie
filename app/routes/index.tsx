import { eq } from "drizzle-orm";
import { getAuth } from "@clerk/tanstack-start/server";
import { createServerFn } from "@tanstack/start";
import { createFileRoute } from "@tanstack/react-router";

import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

import type { Portfolio } from "~/types/portfolios";

import { SignedIn, SignedOut } from "@clerk/tanstack-start";
import { LoggedOut } from "~/components/auth/logged-out";
import { Dashboard } from "~/components/dashboard/dashboard";
import { NavigationComponent } from "~/components/navigation/navigation";

const getPortfolios = createServerFn("GET", async (_, { request }) => {
  const { userId } = await getAuth(request);

  if (!userId) return null;

  const data = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.userId, userId));

  return data;
});

export const Route = createFileRoute("/")({
  loader: async () => await getPortfolios(),
  component: AppWrapper,
});

function AppWrapper() {
  const state: Portfolio[] = Route.useLoaderData();

  return (
    <section className="min-h-screen w-screen">
      <div className="container">
        <SignedIn>
          <NavigationComponent />
          <Dashboard data={state} />
        </SignedIn>
        <SignedOut>
          <LoggedOut />
        </SignedOut>
      </div>
    </section>
  );
}
