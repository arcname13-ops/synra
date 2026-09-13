import { createFileRoute, Link } from "@tanstack/react-router";
import { FinancialGrid } from "@/components/financial-grid";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/synra";

export const Route=createFileRoute("/grid")({head:()=>routeHead("SYNRA Grid — The Financial Grid","Explore the interactive SYNRA Financial Grid connecting payments, liquidity, markets and capital.","/grid"),component:GridPage});
function GridPage(){return <section className="grid-page"><header className="grid-page-head"><span className="eyebrow">INTERACTIVE FINANCIAL INFRASTRUCTURE</span><h1>ENTER THE GRID</h1><p>SEE HOW VALUE CONNECTS.</p></header><aside className="control-panel"><h2>SYNRA GRID</h2><div className="connected"><i className="status-dot"/>CONNECTED</div><div className="control-modules">{['PAY','FLOW','MARKET','VAULT'].map(x=><span key={x}>{x}</span>)}</div><Button asChild variant="outline"><Link to="/">BACK HOME</Link></Button></aside><FinancialGrid immersive/></section>}