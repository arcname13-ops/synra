import { fmt, type ArcState } from "./arc-live";

export type Metric = { label: string; value: string; note: string };

export type ModulePage = {
  key: string;
  slug: string;
  title: string;
  action: string;
  status: string;
  intro: string;
  body: string[];
  metrics: (s: ArcState) => Metric[];
  planned: string[];
};

export const MODULE_PAGES: ModulePage[] = [
  {
    key: "PAY",
    slug: "pay",
    title: "SYNRA PAY",
    action: "MOVE VALUE.",
    status: "PLANNED",
    intro: "A conceptual payment layer for moving digital value through stablecoin-native infrastructure on Arc.",
    body: [
      "Arc settles transactions with USDC as the native gas asset, so the cost of moving value is denominated in the same unit being moved.",
      "The figures below are read live from the Arc network and describe the settlement conditions a payment layer would operate under.",
    ],
    metrics: (s) => [
      { label: "BASE FEE", value: fmt.gwei(s.baseFeeGwei), note: "USDC-native gas, current block" },
      { label: "EST. TRANSFER COST", value: fmt.usdc(s.transferCostUsdc), note: "21,000 gas at current gas price" },
      { label: "SETTLEMENT TIME", value: fmt.secs(s.avgBlockTimeSec), note: "Average block interval, last 12 blocks" },
      { label: "USDC PRICE", value: s.usdcPrice ? `$${s.usdcPrice.toFixed(4)}` : "UNAVAILABLE", note: "Reference market price" },
    ],
    planned: ["Payment routing", "Merchant flows", "Recurring settlement", "Payment APIs"],
  },
  {
    key: "FLOW",
    slug: "flow",
    title: "SYNRA FLOW",
    action: "MOVE LIQUIDITY.",
    status: "PLANNED",
    intro: "A conceptual liquidity layer designed around the movement and routing of value across the SYNRA ecosystem.",
    body: [
      "Liquidity routing depends on how quickly and how consistently the underlying network finalises state.",
      "These readings track Arc block production and throughput in real time.",
    ],
    metrics: (s) => [
      { label: "THROUGHPUT", value: `${fmt.dec(s.txPerSecond, 2)} tx/s`, note: "Observed across the last 12 blocks" },
      { label: "TRANSACTIONS", value: fmt.int(s.txLastSample), note: "Total in the sampled window" },
      { label: "BLOCK INTERVAL", value: fmt.secs(s.avgBlockTimeSec), note: "Average time between blocks" },
      { label: "CAPACITY USED", value: fmt.pct(s.gasUsedRatio), note: "Gas used against gas limit, latest block" },
    ],
    planned: ["Liquidity routing", "Cross-module flows", "Rebalancing logic", "Flow analytics"],
  },
  {
    key: "MARKET",
    slug: "market",
    title: "SYNRA MARKET",
    action: "CONNECT MARKETS.",
    status: "PLANNED",
    intro: "A conceptual onchain market layer connecting participants with digital markets and opportunities.",
    body: [
      "Market infrastructure inherits the execution environment of the chain it settles on.",
      "Arc network identity and execution conditions are shown live below. SYNRA market data does not exist yet and is marked COMING SOON.",
    ],
    metrics: (s) => [
      { label: "NETWORK", value: `ARC · CHAIN ${s.chainId}`, note: "Live chain identifier" },
      { label: "HEAD BLOCK", value: `#${fmt.int(s.blockNumber)}`, note: fmt.ago(s.latestTimestamp) },
      { label: "GAS PRICE", value: fmt.gwei(s.gasPriceGwei), note: "Current network gas price" },
      { label: "SYNRA MARKETS", value: "COMING SOON", note: "No market data is available yet" },
    ],
    planned: ["Market access", "Onchain venues", "Market data", "Integrations"],
  },
  {
    key: "VAULT",
    slug: "vault",
    title: "SYNRA VAULT",
    action: "MANAGE CAPITAL.",
    status: "PLANNED",
    intro: "A conceptual capital layer for future financial strategies and digital asset management.",
    body: [
      "Capital management depends on predictable settlement and predictable cost.",
      "The live readings below describe the base conditions on Arc. No SYNRA vault, yield or balance data exists.",
    ],
    metrics: (s) => [
      { label: "SETTLEMENT ASSET", value: "USDC", note: "Native gas and settlement unit on Arc" },
      { label: "COST PER 1M GAS", value: fmt.usdc((s.gasPriceGwei * 1e9 * 1e6) / 1e18), note: "At the current gas price" },
      { label: "BLOCK CAPACITY", value: fmt.pct(s.gasUsedRatio), note: "Latest block utilisation" },
      { label: "VAULT STRATEGIES", value: "COMING SOON", note: "Not yet defined" },
    ],
    planned: ["Capital strategies", "Asset management", "Risk framework", "Reporting"],
  },
  {
    key: "GRID",
    slug: "grid",
    title: "SYNRA GRID",
    action: "CONNECT EVERYTHING.",
    status: "CORE CONCEPT",
    intro: "The core architecture connecting payments, liquidity, markets, capital and applications.",
    body: [
      "The Grid is the connective layer between every SYNRA module. Its state is derived from the network it settles on.",
      "Everything on this page is read directly from Arc mainnet and refreshes continuously.",
    ],
    metrics: (s) => [
      { label: "CHAIN ID", value: String(s.chainId), note: "Arc mainnet" },
      { label: "HEAD BLOCK", value: `#${fmt.int(s.blockNumber)}`, note: fmt.ago(s.latestTimestamp) },
      { label: "BLOCK TIME", value: fmt.secs(s.avgBlockTimeSec), note: "Average, last 12 blocks" },
      { label: "THROUGHPUT", value: `${fmt.dec(s.txPerSecond, 2)} tx/s`, note: "Observed in the sampled window" },
      { label: "BASE FEE", value: fmt.gwei(s.baseFeeGwei), note: "USDC-native gas" },
      { label: "CAPACITY USED", value: fmt.pct(s.gasUsedRatio), note: "Latest block" },
    ],
    planned: ["Grid architecture", "Module connectivity", "Ecosystem integrations", "Developer access"],
  },
];

export const moduleBySlug = (slug: string) => MODULE_PAGES.find((m) => m.slug === slug);
