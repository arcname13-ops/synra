import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArcState, fmt } from "@/lib/arc-live";
import { MODULE_PAGES, moduleBySlug } from "@/lib/modules";
import { routeHead } from "@/lib/synra";

export const Route = createFileRoute("/modules/$module")({
  beforeLoad: ({ params }) => {
    if (!moduleBySlug(params.module)) throw notFound();
  },
  head: ({ params }) => {
    const m = moduleBySlug(params.module);
    if (!m) return { meta: [{ title: "Module not found — SYNRA" }, { name: "robots", content: "noindex" }] };
    return routeHead(`${m.title} — ${m.action} | SYNRA`, `${m.intro} Live Arc network settlement data.`, `/modules/${m.slug}`);
  },
  component: ModulePage,
  notFoundComponent: () => (
    <div className="error-page"><div><span className="eyebrow">ERROR 404</span><h1>UNKNOWN MODULE.</h1><p>That module is not part of the Grid.</p><Button asChild><Link to="/grid">ENTER THE GRID</Link></Button></div></div>
  ),
});

function ModulePage() {
  const { module: slug } = Route.useParams();
  const m = moduleBySlug(slug)!;
  const { data, isPending, isError } = useArcState();

  return (
    <section className="module-page">
      <header className="module-hero">
        <span className="eyebrow">MODULE · {m.status}</span>
        <h1>{m.title}<span>{m.action}</span></h1>
        <p>{m.intro}</p>
        <div className="cta-row">
          <Button asChild variant="outline"><Link to="/grid">BACK TO THE GRID</Link></Button>
          <Button asChild variant="ghost"><Link to="/docs">READ THE DOCS <ArrowRight /></Link></Button>
        </div>
      </header>

      <div className="module-body">
        <div className="module-copy">{m.body.map((p) => <p key={p}>{p}</p>)}</div>
        <div className="live-block">
          <div className="live-head">
            <span><i className={`status-dot ${isError ? "is-down" : ""}`} />{isError ? "ARC FEED UNAVAILABLE" : isPending ? "CONNECTING TO ARC" : "LIVE · ARC MAINNET"}</span>
            <span>{data ? `UPDATED ${fmt.ago(Math.round(data.fetchedAt / 1000))}` : "—"}</span>
          </div>
          <div className="live-metrics">
            {m.metrics(data ?? EMPTY).map((metric, i) => (
              <div key={metric.label} className={data ? "" : "is-loading"} style={{ animationDelay: `${i * 60}ms` }}>
                <span>{metric.label}</span>
                <strong>{data ? metric.value : "———"}</strong>
                <small>{metric.note}</small>
              </div>
            ))}
          </div>
          {data && (
            <div className="block-ticker" aria-label="Recent Arc blocks">
              {data.blocks.slice().reverse().map((b) => (
                <div key={b.number}><span>#{fmt.int(b.number)}</span><strong>{b.txCount} tx</strong><small>{fmt.gwei(b.baseFeeGwei)}</small></div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="module-planned">
        <h2>PLANNED SCOPE</h2>
        <div>{m.planned.map((p) => <span key={p}>{p}<b>COMING SOON</b></span>)}</div>
      </div>

      <nav className="module-switch" aria-label="Other modules">
        {MODULE_PAGES.filter((x) => x.slug !== m.slug).map((x) => (
          <Link key={x.slug} to="/modules/$module" params={{ module: x.slug }}>{x.title}<ArrowRight /></Link>
        ))}
      </nav>
    </section>
  );
}

const EMPTY = {
  chainId: 0, blockNumber: 0, gasPriceGwei: 0, baseFeeGwei: 0, gasUsedRatio: 0, avgBlockTimeSec: 0,
  txPerSecond: 0, txLastSample: 0, transferCostUsdc: 0, latestTimestamp: 0, blocks: [], usdcPrice: null, fetchedAt: 0,
};
