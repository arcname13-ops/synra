import { createFileRoute } from "@tanstack/react-router";
import { OverviewDoc } from "@/components/doc-pages";
import { routeHead } from "@/lib/synra";
export const Route=createFileRoute("/docs/")({head:()=>routeHead("SYNRA Docs — The Financial Grid","Explore SYNRA's lore, vision, architecture, ecosystem, Arc integration, token information and roadmap.","/docs"),component:OverviewDoc});