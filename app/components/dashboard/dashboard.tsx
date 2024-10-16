import type { FunctionComponent } from "react";

import { UserButton, SignOutButton } from "@clerk/tanstack-start";

export const Dashboard: FunctionComponent = () => {
  return (
    <>
      <p>You are signed in</p>

      <UserButton />

      <SignOutButton />
    </>
  );
};
