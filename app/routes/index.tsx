import { createFileRoute } from "@tanstack/react-router";

import { SignedIn, SignedOut } from "@clerk/tanstack-start";
import { LoggedOut } from "~/components/auth/logged-out";
import { Dashboard } from "~/components/dashboard/dashboard";
import { NavigationComponent } from "~/components/navigation/navigation";

export const Route = createFileRoute("/")({
  component: AppWrapper,
});

function AppWrapper() {
  return (
    <section className="min-h-screen w-screen">
      <div className="container">
        <SignedIn>
          <NavigationComponent />
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <LoggedOut />
        </SignedOut>
      </div>
    </section>
  );
}
