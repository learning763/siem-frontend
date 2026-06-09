import { createRouter, ErrorComponent } from "@tanstack/react-router";

import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    scrollRestoration: true,
    Wrap: ({ children }: { children: React.ReactNode }) => (
      <TanstackQuery.Provider {...rqContext}>{children}</TanstackQuery.Provider>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
