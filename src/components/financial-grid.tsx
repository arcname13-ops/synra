import { useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const nodes = [
  { id: "PAY", x: 18, y: 30, text: "Payment infrastructure for digital value." },
  { id: "FLOW", x: 79, y: 29, text: "Liquidity movement and routing." },
  { id: "MARKET", x: 77, y: 72, text: "Onchain markets and opportunities." },
  { id: "VAULT", x: 20, y: 73, text: "Capital management." },
];

export function FinancialGrid({ immersive = false }: { immersive?: boolean }) {
  const [active, setActive] = useState("GRID");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const activeText = active === "GRID" ? "Core infrastructure connecting the ecosystem." : nodes.find((n) => n.id === active)?.text;
  const style = { "--tilt-x": `${tilt.y}deg`, "--tilt-y": `${tilt.x}deg` } as CSSProperties;
  return <div className={`financial-grid ${immersive ? "grid-immersive" : ""}`} onMouseMove={(e) => { if (!immersive) return; const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientX-r.left)/r.width-.5)*5, y: ((e.clientY-r.top)/r.height-.5)*-5 }); }} onMouseLeave={() => setTilt({x:0,y:0})} style={style}>
    <div className="grid-stage" aria-label="Interactive diagram of connected SYNRA financial infrastructure">
      <div className="grid-plane" />
      <div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" />
      <svg className="network-lines" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="rail"><stop stopColor="var(--bronze)"/><stop offset=".5" stopColor="var(--champagne)"/><stop offset="1" stopColor="var(--bronze)"/></linearGradient></defs>{nodes.map(n => <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y} className={active === "GRID" || active === n.id ? "line-active" : ""}/>)}</svg>
      <button className={`core-node ${active === "GRID" ? "active" : ""}`} onClick={() => setActive("GRID")} aria-label="View SYNRA Grid information"><span>S</span><b>SYNRA</b><small>GRID</small></button>
      {nodes.map(n => <button key={n.id} className={`value-node ${active === n.id ? "active" : ""}`} style={{left:`${n.x}%`,top:`${n.y}%`}} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} onClick={() => setActive(n.id)}><i/><b>{n.id}</b></button>)}
      {immersive && <>{["LIQUIDITY","CAPITAL","PAYMENTS","ASSETS","APPLICATIONS"].map((x,i)=><span key={x} className={`outer-label outer-${i}`}>{x}</span>)}</>}
      <div className="grid-info" aria-live="polite"><span>ACTIVE MODULE</span><strong>{active}</strong><p>{activeText}</p></div>
      {immersive && <Button variant="outline" size="sm" className="grid-reset" onClick={() => {setActive("GRID");setTilt({x:0,y:0})}}><RotateCcw /> RESET VIEW</Button>}
    </div>
  </div>;
}