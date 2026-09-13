import { queryOptions, useQuery } from "@tanstack/react-query";
import { getArcState, type ArcState } from "./arc.functions";

export const arcStateQuery = queryOptions({
  queryKey: ["arc-state"],
  queryFn: () => getArcState(),
  refetchInterval: 6000,
  staleTime: 4000,
});

export function useArcState() {
  return useQuery(arcStateQuery);
}

export type { ArcState };

export const fmt = {
  int: (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 }),
  dec: (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }),
  gwei: (n: number) => `${n.toLocaleString("en-US", { maximumFractionDigits: 3 })} gwei`,
  usdc: (n: number) => `$${n < 0.01 ? n.toFixed(6) : n.toFixed(4)}`,
  pct: (n: number) => `${(n * 100).toFixed(2)}%`,
  secs: (n: number) => `${n.toFixed(2)}s`,
  ago: (ts: number) => `${Math.max(0, Math.round(Date.now() / 1000 - ts))}s ago`,
};
