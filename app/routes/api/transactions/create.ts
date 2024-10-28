import { getAuth } from "@clerk/tanstack-start/server";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { db } from "~/server/db";
import { transactions } from "~/server/db/schema";

export const Route = createAPIFileRoute("/api/transactions/create")({
  POST: async ({ request }) => {
    const { userId } = await getAuth(request);

    if (!userId) throw new Error("No user id found. Log in and try again.");

    const payload = await request.text();
    const formattedPayload = JSON.parse(payload);

    try {
      await db.insert(transactions).values({
        userId: userId,
        portfolioId: formattedPayload.portfolioId,
        type: formattedPayload.type,
        category: formattedPayload.category,
        amount: formattedPayload.amount,
        description: formattedPayload.description,
      });

      return json({
        message: `Successfully added a transaction to portfolio with id: ${formattedPayload.portfolioId}`,
      });
    } catch (error) {
      console.error(error.detail);
      throw new Error(error);
    }
  },
});
