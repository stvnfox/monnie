import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { eq } from "drizzle-orm";

import type { User } from "@clerk/tanstack-start/server";

import { db } from "../../../db";
import { users } from "../../../db/schema";

enum EventType {
  CREATED = "user.created",
  CREATEDATEDGE = "user.createdAtEdge",
  UPDATED = "user.updated",
  DELETED = "user.deleted",
}

interface CustomUser extends User {
  first_name: string;
  last_name: string;
  email_addresses: { id: string; email_address: string }[];
}

type Payload = {
  data: CustomUser;
  type: string;
  object: string;
};

const checkIfUserExists = async (userId: string) => {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return existingUser.length > 0;
};

const updateUser = async (user: CustomUser) => {
  const userExists = await checkIfUserExists(user.id);

  if (!userExists) {
    throw new Error(`User with ID: ${user.id} doesn't exists`);
  }

  await db.update(users).set({
    name: `${user.first_name ?? ""} ${user.last_name ?? ""}` ?? "",
    email: user.email_addresses[0].email_address ?? "",
  });

  console.log(`Updated user with ID: ${user.id}`);
  return json({ message: `Updated user with ID: ${user.id}` });
};

const addUser = async (user: CustomUser) => {
  const userExists = await checkIfUserExists(user.id);

  if (userExists) throw new Error(`User with ID: ${user.id} already exists`);

  await db.insert(users).values({
    id: user.id,
    name: "",
    email: user.email_addresses[0]?.email_address ?? "",
  });

  console.log(`Added user with ID: ${user.id}`);
  return json({ message: `Added user with ID: ${user.id}` });
};

const deleteUser = async (user: CustomUser) => {
  const userExists = await checkIfUserExists(user.id);

  if (!userExists) throw new Error(`User with ID: ${user.id} doesn't exists`);
  await db.delete(users).where(eq(users.id, user.id));

  console.log(`Removed user with ID: ${user.id}`);
  return json({ message: `Removed user with ID: ${user.id}` });
};

export const Route = createAPIFileRoute("/api/users")({
  POST: async ({ request }) => {
    const payload = await request.text();
    const formattedPayload: Payload = JSON.parse(payload);
    const eventType = formattedPayload.type;
    const user: CustomUser = formattedPayload.data;

    switch (eventType) {
      case EventType.CREATED:
        return await addUser(user);
      case EventType.CREATEDATEDGE:
        return await addUser(user);
      case EventType.UPDATED:
        return await updateUser(user);
      case EventType.DELETED:
        return await deleteUser(user);
      default:
        throw new Error("Sorry, this type isn't available");
    }
  },
});
