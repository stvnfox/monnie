import { createFileRoute, redirect } from "@tanstack/react-router";

import { Dashboard } from "~/components/dashboard/dashboard";
import { NavigationComponent } from "~/components/navigation/navigation";
import { createServerFn } from "@tanstack/start";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "vinxi/http";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    throw redirect({
      to: "/auth/sign-in/$",
    });
  }

  return { userId };
});

export const Route = createFileRoute("/")({
  component: AppWrapper,
  beforeLoad: async () => await authStateFn(),
});

function AppWrapper() {
  return (
    <section className="min-h-screen w-screen">
      <div className="container">
        <NavigationComponent />
        <Dashboard />
      </div>
    </section>
  );
}
