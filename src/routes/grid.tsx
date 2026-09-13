import { createFileRoute, Link } from "@tanstack/react-router";
import { FinancialGrid } from "@/components/financial-grid";
import { Button } from "@/components/ui/button";
import { useArcState, fmt } from "@/lib/arc-live";
import { MODULE_PAGES } from "@/lib/modules";
import { routeHead } from "@/lib/synra";

export const Route = createFileRoute("/grid")({
  head: () => routeHead("SYNRA Grid — Live Arc Network Data", "Explore the interactive SYNRA Financial Grid with live Arc mainnet gas, block and settlement data across PAY, FLOW, MARKET, VAULT and GRID.", "/grid"),
  component: GridPage,
});

function GridPage() {
  const { data, isError } = useArcState();
  return (
    <section className="grid-page">
      <header className="grid-page-head">
        <span className="eyebrow">INTERACTIVE FINANCIAL INFRASTRUCTURE</span>
        <h1>ENTER THE GRID</h1>
        <p>SEE HOW VALUE CONNECTS.</p>
      </header>
      <aside className="control-panel">
        <h2>SYNRA GRID</h2>
        <div className="connected"><i className={`status-dot ${isError ? "is-down" : ""}`} />{isError ? "ARC FEED UNAVAILABLE" : data ? "CONNECTED · ARC MAINNET" : "CONNECTING..."}</div>
        <div className="panel-readout">
          <div><span>BLOCK</span><strong>{data ? `#${fmt.int(data.blockNumber)}` : "———"}</strong></div>
          <div><span>BASE FEE</span><strong>{data ? fmt.gwei(data.baseFeeGwei) : "———"}</strong></div>
          <div><span>BLOCK TIME</span><strong>{data ? fmt.secs(data.avgBlockTimeSec) : "———"}</strong></div>
          <div><span>THROUGHPUT</span><strong>{data ? `${fmt.dec(data.txPerSecond, 2)} tx/s` : "———"}</strong></div>
        </div>
        <div className="control-modules">
          {MODULE_PAGES.map((m) => (
            <Link key={m.slug} to="/modules/$module" params={{ module: m.slug }}>{m.key}</Link>
          ))}
        </div>
        <Button asChild variant="outline"><Link to="/">BACK HOME</Link></Button>
      </aside>
      <FinancialGrid immersive />
    </section>
  );
}
