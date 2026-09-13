export const LINKS = {
  SITE_URL: "https://synraonchain.xyz",
  X_URL: "https://x.com/SYNRAonChain",
  ARC_URL: "https://www.arc.network/",
  ARGUSPAD_URL: "https://arguspad.io",
} as const;

export const MODULES = [
  { key: "PAY", title: "SYNRA PAY", action: "MOVE VALUE.", description: "A conceptual payment layer for moving digital value through stablecoin-native infrastructure.", status: "PLANNED" },
  { key: "FLOW", title: "SYNRA FLOW", action: "MOVE LIQUIDITY.", description: "A conceptual liquidity layer designed around the movement and routing of value across the SYNRA ecosystem.", status: "PLANNED" },
  { key: "MARKET", title: "SYNRA MARKET", action: "CONNECT MARKETS.", description: "A conceptual onchain market layer connecting participants with digital markets and opportunities.", status: "PLANNED" },
  { key: "VAULT", title: "SYNRA VAULT", action: "MANAGE CAPITAL.", description: "A conceptual capital layer for future financial strategies and digital asset management.", status: "PLANNED" },
  { key: "GRID", title: "SYNRA GRID", action: "CONNECT EVERYTHING.", description: "The core architecture connecting payments, liquidity, markets, capital and applications.", status: "CORE CONCEPT" },
] as const;

export const DOC_NAV = [
  ["OVERVIEW", "/docs/overview"], ["LORE", "/docs/lore"], ["VISION", "/docs/vision"],
  ["FINANCIAL GRID", "/docs/financial-grid"], ["SYNRA PAY", "/docs/pay"], ["SYNRA FLOW", "/docs/flow"],
  ["SYNRA MARKET", "/docs/market"], ["SYNRA VAULT", "/docs/vault"], ["ARC", "/docs/arc"],
  ["TOKEN", "/docs/token"], ["ROADMAP", "/docs/roadmap"], ["FAQ", "/docs/faq"],
  ["DISCLAIMER", "/docs/disclaimer"], ["CHANGELOG", "/docs/changelog"],
] as const;

export const META = {
  image: `${LINKS.SITE_URL}/synban.png`,
  title: "SYNRA — The Financial Grid",
  description: "SYNRA is a programmable financial network built for the next generation of digital value.",
};

export function routeHead(title: string, description: string, path: string) {
  const url = `${LINKS.SITE_URL}${path}`;
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url },
      { property: "og:image", content: META.image }, { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
      { name: "twitter:image", content: META.image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}