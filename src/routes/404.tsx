import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/synra";
export const Route=createFileRoute("/404")({head:()=>routeHead("Grid Connection Lost — SYNRA","The destination you requested could not be found.","/404"),component:Page});
function Page(){return <div className="error-page"><div><span className="eyebrow">ERROR 404</span><h1>THE GRID LOST<br/>ITS CONNECTION.</h1><p>The destination you requested could not be found.</p><div className="cta-row justify-center"><Button asChild><Link to="/">RETURN HOME</Link></Button><Button asChild variant="outline"><Link to="/grid">ENTER THE GRID</Link></Button></div></div></div>}