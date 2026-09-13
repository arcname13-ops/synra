import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/brand";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="error-page"><div><span className="eyebrow">ERROR 404</span><h1>THE GRID LOST<br/>ITS CONNECTION.</h1><p>The destination you requested could not be found.</p><div className="cta-row justify-center"><Button asChild><Link to="/">RETURN HOME</Link></Button><Button asChild variant="outline"><Link to="/grid">ENTER THE GRID</Link></Button></div></div></div>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter(); useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="error-page"><div><span className="eyebrow">SYSTEM NOTICE</span><h1>CONNECTION<br/>INTERRUPTED.</h1><p>The page could not be loaded. Try reconnecting to the grid.</p><Button onClick={() => {router.invalidate();reset();}}>RETRY CONNECTION</Button></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet:"utf-8" },{ name:"viewport",content:"width=device-width, initial-scale=1" },{ name:"author",content:"SYNRA" },{ property:"og:type",content:"website" }], links:[{rel:"stylesheet",href:appCss},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"},{rel:"icon",href:"/favicon.png",type:"image/png"}] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient }=Route.useRouteContext(); return <QueryClientProvider client={queryClient}><SiteHeader/><main><Outlet/></main><SiteFooter/></QueryClientProvider>; }