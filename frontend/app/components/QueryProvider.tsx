"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, useState, type ReactNode } from "react";

type QueryProviderProps = {
    children: ReactNode
}

const QueryProvider: FC<QueryProviderProps> = ({children}) => {
    const [ queryClient ] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000
                }
            }
        })
    );
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
