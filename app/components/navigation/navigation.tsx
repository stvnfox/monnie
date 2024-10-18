import { UserButton } from "@clerk/tanstack-start";
import type { FunctionComponent } from "react";

export const NavigationComponent: FunctionComponent = () => {
  return (
    <nav className="flex justify-between items-center py-4 sticky top-0">
      <span className="font-sans text-2xl">monnie</span>
      <UserButton />
    </nav>
  );
};
