import { SignedIn, SignedOut } from "@clerk/tanstack-start";

import { LoggedOut } from "./auth/logged-out";
import { Dashboard } from "./dashboard/dashboard";

export const AppWrapper = () => {
  return (
    <section className="min-h-screen w-screen">
      <div className="container">
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <LoggedOut />
        </SignedOut>
      </div>
    </section>
  );
};
