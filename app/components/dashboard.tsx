import {
  SignedIn,
  UserButton,
  SignOutButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/tanstack-start";

export const Dashboard = () => {
  return (
    <section className="container">
      <h1 className="text-3xl">Index Route</h1>
      <SignedIn>
        <p>You are signed in</p>

        <UserButton />

        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>

        <SignInButton />

        <SignUpButton />
      </SignedOut>
    </section>
  );
};
