import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootComponent() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
