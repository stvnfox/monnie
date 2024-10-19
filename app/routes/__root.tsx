import * as React from "react";
import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { ClerkProvider } from "@clerk/tanstack-start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "~/components/ui/toaster";

import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "monnie",
    },
  ],
  links: () => [{ rel: "stylesheet", href: appCss }],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const queryClient = new QueryClient();

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <Html>
          <Head>
            <Meta />
          </Head>
          <Body>
            {children}
            <Toaster />
            <ScrollRestoration />
            <Scripts />
          </Body>
        </Html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
