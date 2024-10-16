import { SignedIn, SignedOut } from "@clerk/tanstack-start";

import { LoggedOut } from "./auth/logged-out";
import { Dashboard } from "./dashboard/dashboard";

export const AppWrapper = () => {
  return (
    <section className="container">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <LoggedOut />
      </SignedOut>
    </section>
  );
};
