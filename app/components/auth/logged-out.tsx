import type { FunctionComponent } from "react";

import { SignInButton, SignUpButton } from "@clerk/tanstack-start";
import { Button } from "../ui/button";

export const LoggedOut: FunctionComponent = () => {
  return (
    <>
      <p>You are signed out</p>

      <Button asChild>
        <SignInButton />
      </Button>

      <Button asChild>
        <SignUpButton />
      </Button>
    </>
  );
};
