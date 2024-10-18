import { getAuth } from "@clerk/tanstack-start/server";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { db } from "~/server/db";
import { portfolios } from "~/server/db/schema";

export const Route = createAPIFileRoute("/api/portfolio/create")({
  POST: async ({ request }) => {
    const { userId } = await getAuth(request);

    const payload = await request.text();
    const formattedPayload = JSON.parse(payload);

    if (!userId) throw new Error("No user id found. Log in and try again.");

    try {
      await db.insert(portfolios).values({
        userId: "test",
        name: formattedPayload.name,
      });

      return json({
        message: `Successfully created a portfolio item for user id: ${userId}`,
      });
    } catch (error) {
      console.error(error.detail);
      throw new Error(error);
    }
  },
});
