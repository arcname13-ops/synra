import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DOC_NAV } from "@/lib/synra";

export function DocsLayout({ title, eyebrow, children, toc = [] }: { title: string; eyebrow?: string; children: ReactNode; toc?: string[] }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  return <div className="docs-shell">
    <div className="docs-mobile-bar"><span>DOCUMENTATION</span><Button variant="ghost" size="icon" aria-label="Toggle documentation menu" onClick={() => setOpen(!open)}><Menu /></Button></div>
    <aside className={`docs-sidebar ${open ? "is-open" : ""}`}><p>SYNRA / DOCS</p><nav>{DOC_NAV.map(([label,to])=><Link key={to} to={to} className={pathname===to ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>)}</nav></aside>
    <article className="docs-content"><header><span className="eyebrow">{eyebrow || "SYNRA DOCUMENTATION"}</span><h1>{title}</h1></header>{children}<div className="docs-end">SYNRA · VALUE, SYNCHRONIZED.</div></article>
    <aside className="docs-toc"><p>ON THIS PAGE</p>{toc.map(x=><a key={x} href={`#${x.toLowerCase().replaceAll(" ","-")}`}>{x}</a>)}</aside>
  </div>;
}

export function DocSection({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replaceAll(" ", "-");
  return <section id={id} className="doc-section"><h2>{title}</h2>{children}</section>;
}

export function Status({ children }: { children: ReactNode }) { return <span className="status-label">{children}</span>; }