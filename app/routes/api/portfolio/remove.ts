import { getAuth } from "@clerk/tanstack-start/server";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

export const Route = createAPIFileRoute("/api/portfolio/remove")({
  DELETE: async ({ request }) => {
    const { userId } = await getAuth(request);

    if (!userId) throw new Error("No user id found. Log in and try again.");
    const payload = await request.text();
    const formattedPayload = JSON.parse(payload);

    try {
      const data = await db
        .delete(portfolios)
        .where(eq(portfolios.id, formattedPayload.id));

      return json({ data: data });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
});
