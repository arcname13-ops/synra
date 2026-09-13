import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/synra.png";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/lib/synra";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <img src={logo} alt="SYNRA" className={compact ? "h-9 w-9 object-cover object-top" : "h-12 w-12 object-cover object-top"} />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 28); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => setOpen(false), [pathname]);
  const nav = [["HOME", "/"], ["GRID", "/grid"], ["DOCS", "/docs"]] as const;
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav">
        <Link to="/" aria-label="SYNRA home" className="brand-link"><BrandMark compact /><span>SYNRA</span></Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {nav.map(([label, to]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="nav-link">{label}</Link>)}
        </nav>
        <div className="desktop-actions">
          <a href={LINKS.ARGUSPAD_URL} target="_blank" rel="noreferrer" className="nav-action">BUY</a>
          <a href={LINKS.ARGUSPAD_URL} target="_blank" rel="noreferrer" className="nav-action">CHART</a>
          <a href={LINKS.X_URL} target="_blank" rel="noreferrer" aria-label="SYNRA on X" className="x-link">𝕏</a>
        </div>
        <Button variant="ghost" size="icon" className="mobile-trigger" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, to], i) => <Link key={to} to={to} tabIndex={open ? 0 : -1}><span>0{i + 1}</span>{label}</Link>)}
          <a href={LINKS.ARGUSPAD_URL} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><span>04</span>BUY</a>
          <a href={LINKS.ARGUSPAD_URL} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><span>05</span>CHART</a>
          <a href={LINKS.X_URL} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}><span>06</span>X <ArrowUpRight /></a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><div><BrandMark /><p className="footer-wordmark">SYNRA</p><p>VALUE, SYNCHRONIZED.</p></div><div><h3>NAVIGATION</h3><Link to="/">HOME</Link><Link to="/grid">GRID</Link><Link to="/docs">DOCS</Link></div><div><h3>RESOURCES</h3><a href={LINKS.ARC_URL} target="_blank" rel="noreferrer">ARC ↗</a><a href={LINKS.X_URL} target="_blank" rel="noreferrer">X ↗</a></div><div><h3>TOKEN</h3><p>$SYNRA</p><p>CA: COMING SOON</p></div></div><div className="footer-bottom"><span>© 2026 SYNRA. ALL RIGHTS RESERVED.</span><span>THE FINANCIAL GRID · A MORE OPEN ECONOMY.</span></div></footer>;
}