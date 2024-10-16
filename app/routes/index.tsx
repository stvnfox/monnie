import { createFileRoute } from "@tanstack/react-router";

import { AppWrapper } from "../components/wrapper";

export const Route = createFileRoute("/")({
  component: AppWrapper,
});
