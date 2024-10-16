import type { FunctionComponent } from "react";

import { SignInButton, SignUpButton } from "@clerk/tanstack-start";

export const LoggedOut: FunctionComponent = () => {
  return (
    <>
      <p>You are signed out</p>

      <SignInButton />

      <SignUpButton />
    </>
  );
};
