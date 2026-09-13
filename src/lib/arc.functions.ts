import { createServerFn } from "@tanstack/react-start";

export type ArcBlock = {
  number: number;
  timestamp: number;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  baseFeeGwei: number;
};

export type ArcState = {
  chainId: number;
  blockNumber: number;
  gasPriceGwei: number;
  baseFeeGwei: number;
  gasUsedRatio: number;
  avgBlockTimeSec: number;
  txPerSecond: number;
  txLastSample: number;
  transferCostUsdc: number;
  latestTimestamp: number;
  blocks: ArcBlock[];
  usdcPrice: number | null;
  fetchedAt: number;
};

const SAMPLE = 12;
const hex = (v: string | undefined) => (v ? Number.parseInt(v, 16) : 0);

async function rpcOne(url: string, method: string, params: unknown[]) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`Arc RPC responded with ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: { message: string } };
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

// Infura's Arc endpoint rejects JSON-RPC batches, so calls are issued individually.
async function rpc(url: string, calls: { method: string; params: unknown[] }[]) {
  return Promise.all(calls.map((c) => rpcOne(url, c.method, c.params)));
}

async function usdcPrice(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd",
      { headers: { accept: "application/json" } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { "usd-coin"?: { usd?: number } };
    return json["usd-coin"]?.usd ?? null;
  } catch {
    return null;
  }
}

export const getArcState = createServerFn({ method: "GET" }).handler(async (): Promise<ArcState> => {
  const url = process.env["ARC_RPC_URL"];
  if (!url) throw new Error("Arc network endpoint is not configured.");

  const [chainIdHex, blockHex, gasPriceHex] = (await rpc(url, [
    { method: "eth_chainId", params: [] },
    { method: "eth_blockNumber", params: [] },
    { method: "eth_gasPrice", params: [] },
  ])) as (string | undefined)[];

  const head = hex(blockHex);
  const numbers = Array.from({ length: SAMPLE }, (_, i) => head - (SAMPLE - 1 - i));
  const raw = (await rpc(
    url,
    numbers.map((n) => ({ method: "eth_getBlockByNumber", params: [`0x${n.toString(16)}`, false] })),
  )) as ({ number: string; timestamp: string; transactions?: string[]; gasUsed: string; gasLimit: string; baseFeePerGas?: string } | null)[];

  const blocks: ArcBlock[] = raw
    .filter(Boolean)
    .map((b) => ({
      number: hex(b!.number),
      timestamp: hex(b!.timestamp),
      txCount: b!.transactions?.length ?? 0,
      gasUsed: hex(b!.gasUsed),
      gasLimit: hex(b!.gasLimit),
      baseFeeGwei: hex(b!.baseFeePerGas) / 1e9,
    }));

  const latest = blocks[blocks.length - 1];
  const first = blocks[0];
  const span = latest && first ? latest.timestamp - first.timestamp : 0;
  const txLastSample = blocks.reduce((a, b) => a + b.txCount, 0);
  const gasPriceGwei = hex(gasPriceHex) / 1e9;

  return {
    chainId: hex(chainIdHex),
    blockNumber: head,
    gasPriceGwei,
    baseFeeGwei: latest?.baseFeeGwei ?? 0,
    gasUsedRatio: latest && latest.gasLimit ? latest.gasUsed / latest.gasLimit : 0,
    avgBlockTimeSec: blocks.length > 1 && span > 0 ? span / (blocks.length - 1) : 0,
    txPerSecond: span > 0 ? txLastSample / span : 0,
    txLastSample,
    transferCostUsdc: (gasPriceGwei * 1e9 * 21000) / 1e18,
    latestTimestamp: latest?.timestamp ?? 0,
    blocks,
    usdcPrice: await usdcPrice(),
    fetchedAt: Date.now(),
  };
});
