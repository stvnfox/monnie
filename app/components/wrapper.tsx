import { SignedIn, SignedOut } from "@clerk/tanstack-start";

import { LoggedOut } from "./auth/logged-out";
import { Dashboard } from "./dashboard/dashboard";
import { Button } from "./ui/button";

export const AppWrapper = () => {
  return (
    <section className="container">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Button>Test</Button>
        <LoggedOut />
      </SignedOut>
    </section>
  );
};
