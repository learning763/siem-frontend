import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient();
  return { queryClient };
}

interface TanstackProviderOptions {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export function Provider({ children, queryClient }: TanstackProviderOptions) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
