import { getAuth } from "@clerk/tanstack-start/server";
import { json } from "@tanstack/start";
import { eq } from "drizzle-orm";
import { createAPIFileRoute } from "@tanstack/start/api";

import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

export const Route = createAPIFileRoute("/api/portfolio/get")({
  GET: async ({ request }) => {
    const { userId } = await getAuth(request);

    if (!userId) throw new Error("No user id found. Log in and try again.");

    try {
      const data = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.userId, userId));

      return json({ data: data });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
});
