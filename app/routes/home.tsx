import { Link } from "react-router";
import type { Route } from "./+types/home";
import {
  Highlighter,
  StickyNote,
  Pencil,
  Shapes,
  Download,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Signature,
  ShieldCheck,
  Search,
  Code2,
  MessageSquare,
  Check,
  Copy,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { SiteNav } from "~/components/SiteNav";
import { SiteFooter } from "~/components/SiteFooter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "react-pdf-highlighter-plus — The annotation layer your PDF viewer is missing" },
    {
      name: "description",
      content:
        "Highlights, sticky notes, freehand drawing, shapes, signatures, and flattened export — a headless, fully-typed React toolkit on top of PDF.js. Every byte stays in the browser.",
    },
  ];
}

/* ── markup-toolkit chips (big bento tile) ── */
const toolkit: { icon: LucideIcon; label: string; accent?: boolean }[] = [
  { icon: Highlighter, label: "Highlight", accent: true },
  { icon: StickyNote, label: "Note" },
  { icon: Pencil, label: "Draw" },
  { icon: Shapes, label: "Shapes" },
  { icon: ImageIcon, label: "Image" },
  { icon: Signature, label: "Sign" },
];

/* ── small bento tiles ── */
interface Feature {
  n: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
const features: Feature[] = [
  {
    n: "02",
    icon: Download,
    title: "Flatten & export",
    description:
      "Burn every annotation permanently into a downloadable PDF — with a per-page progress callback.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "100% client-side. Documents never touch a server — built for legal, medical and internal files.",
  },
  {
    n: "04",
    icon: Search,
    title: "Zoom-stable",
    description:
      "Positions stored in viewport-independent coordinates — pinned through every zoom level.",
  },
  {
    n: "05",
    icon: Code2,
    title: "Typed end to end",
    description:
      "Full TypeScript definitions. Extend the Highlight interface with your own custom fields.",
  },
];

interface Release {
  version: string;
  date: string;
  title: string;
  description: string;
  current?: boolean;
}
const releases: Release[] = [
  {
    version: "v1.2.1",
    date: "Apr 30, 2026",
    title: "PDF search controls",
    description:
      "In-document search via the new highlighter search utilities, plus copy-text in highlight toolbars.",
    current: true,
  },
  {
    version: "v1.1.0",
    date: "Jan 2, 2026",
    title: "Dual-panel layout",
    description:
      "Outline & page thumbnails on the left, highlights on the right, with theme-aware page inversion.",
  },
  {
    version: "v1.0.0",
    date: "Initial",
    title: "First public release",
    description:
      "Highlights, areas, notes, images, signatures, drawing, shapes, export & localStorage.",
  },
];

const anatomy = [
  { name: "PdfLoader", note: "Loads the PDF document", indent: 0, accent: true },
  { name: "PdfHighlighter", note: "Viewer + event listeners", indent: 22, accent: true },
  { name: "…Container", note: "Renders each highlight", indent: 44, accent: false },
];

const builtOn = ["React 19", "PDF.js", "TypeScript", "Zustand", "Tailwind CSS"];

function InstallButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText("npm i react-pdf-highlighter-plus").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-[11px] rounded-[10px] border border-line2 bg-bg2 px-[17px] py-3 font-mono text-[13.5px] text-foreground"
    >
      <span className="text-faint">$</span> npm i react-pdf-highlighter-plus
      {copied ? (
        <Check className="h-[15px] w-[15px] text-primary" strokeWidth={2.4} />
      ) : (
        <Copy className="h-[15px] w-[15px] text-faint" />
      )}
    </button>
  );
}

export default function Home() {
  return (
    <div className="dot-grid min-h-screen bg-background font-sans text-base leading-relaxed text-foreground antialiased">
      {/* ===== NAV ===== */}
      <SiteNav
        links={[
          { label: "Features", to: "/#features" },
          { label: "Docs", to: "/docs" },
          { label: "Changelog", to: "/changelog" },
          { label: "Sponsor", to: "/sponsor" },
        ]}
      />

      {/* ===== HERO ===== */}
      <header className="relative mx-auto max-w-[1220px] overflow-hidden px-8 pb-6 pt-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[-30px] h-60 w-[560px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.13),transparent_70%)] blur-[30px]" />

        <div className="relative mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-line2 bg-bg2 py-[5px] pl-2.5 pr-3.5 font-mono text-xs text-muted-foreground">
          <span className="animate-pulse-dot h-[7px] w-[7px] rounded-full bg-primary" />
          react-pdf-highlighter-plus · v1.1.4
        </div>

        <h1 className="relative mx-auto mb-[22px] max-w-[15ex] font-display text-[64px] font-semibold leading-[1.03] tracking-[-0.03em]">
          The{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-[1]">annotation layer</span>
            <span className="absolute -left-1 -right-1 bottom-[7px] z-0 h-[17px] -skew-x-[9deg] rounded-sm bg-primary" />
          </span>{" "}
          your PDF viewer is missing.
        </h1>

        <p className="relative mx-auto mb-8 max-w-[40em] text-[18.5px] leading-[1.6] text-muted-foreground">
          Highlights, sticky notes, freehand drawing, shapes, signatures, and flattened export — a
          headless, fully-typed React toolkit on top of PDF.js. Every byte stays in the browser.
        </p>

        <div className="relative mb-[54px] flex flex-wrap justify-center gap-3">
          <Link
            to="/pdf-demo"
            className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-[13px] text-[15px] font-semibold text-primary-foreground"
          >
            Launch the live demo <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
          </Link>
          <InstallButton />
        </div>

        <ProductWindow />
      </header>

      {/* ===== TRUST STRIP ===== */}
      <div className="mx-auto max-w-[1220px] px-8 pb-5 pt-11">
        <div className="flex flex-wrap items-center justify-center gap-x-[30px] gap-y-2.5 text-[13px] text-faint">
          <span className="font-mono text-[11px] tracking-[0.05em]">// BUILT ON</span>
          {builtOn.map((t) => (
            <span key={t} className="font-semibold text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ===== BENTO FEATURES ===== */}
      <section id="features" className="mx-auto max-w-[1220px] px-8 pb-5 pt-16">
        <div className="mb-10">
          <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-primary">
            // 01 — CAPABILITIES
          </div>
          <h2 className="m-0 max-w-[18ex] font-display text-[40px] font-semibold leading-[1.06] tracking-[-0.02em]">
            Six annotation types. One coordinate system.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-3.5">
          {/* A — big markup toolkit tile */}
          <div className="feat-tile col-span-12 flex flex-col rounded-2xl border border-border bg-bg2 p-7 lg:col-span-7 lg:row-span-2">
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="font-mono text-[11px] text-faint">01</span>
              <h3 className="m-0 font-display text-[23px] font-semibold">The full markup toolkit</h3>
            </div>
            <p className="m-0 mb-6 max-w-[38ex] text-[14.5px] text-muted-foreground">
              Text highlights, draggable sticky notes, freehand ink, rectangles &amp; arrows, images
              and hand-drawn signatures — each a first-class annotation with stable id, color and
              comment.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {toolkit.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-[9px] rounded-[11px] border border-border bg-bg3 px-[13px] py-[11px]"
                >
                  <t.icon
                    className={`h-4 w-4 ${t.accent ? "text-primary" : "text-foreground/80"}`}
                    strokeWidth={t.accent ? 2 : 1.9}
                  />
                  <span className="text-[12.5px] font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B & C — wide tiles */}
          {features.slice(0, 2).map((f) => (
            <div
              key={f.n}
              className="feat-tile col-span-12 rounded-2xl border border-border bg-bg2 p-[26px] md:col-span-6 lg:col-span-5"
            >
              <div className="mb-3.5 flex items-center justify-between">
                <f.icon className="h-[22px] w-[22px] text-primary" strokeWidth={1.9} />
                <span className="font-mono text-[11px] text-faint">{f.n}</span>
              </div>
              <h3 className="m-0 mb-[7px] font-display text-[19px] font-semibold">{f.title}</h3>
              <p className="m-0 text-[13.5px] text-muted-foreground">{f.description}</p>
            </div>
          ))}

          {/* D & E — third-width tiles */}
          {features.slice(2, 4).map((f) => (
            <div
              key={f.n}
              className="feat-tile col-span-12 rounded-2xl border border-border bg-bg2 p-[26px] sm:col-span-6 lg:col-span-4"
            >
              <div className="mb-3.5 flex items-center justify-between">
                <f.icon className="h-[22px] w-[22px] text-primary" strokeWidth={1.9} />
                <span className="font-mono text-[11px] text-faint">{f.n}</span>
              </div>
              <h3 className="m-0 mb-[7px] font-display text-[19px] font-semibold">{f.title}</h3>
              <p className="m-0 text-[13.5px] text-muted-foreground">{f.description}</p>
            </div>
          ))}

          {/* F — accent tile */}
          <div className="feat-tile col-span-12 rounded-2xl border border-primary bg-primary p-[26px] text-primary-foreground sm:col-span-6 lg:col-span-4">
            <div className="mb-3.5 flex items-center justify-between">
              <Code2 className="h-[22px] w-[22px]" strokeWidth={2} />
              <span className="font-mono text-[11px] opacity-50">06</span>
            </div>
            <h3 className="m-0 mb-[7px] font-display text-[19px] font-semibold">Headless core</h3>
            <p className="m-0 text-[13.5px] opacity-75">
              Bring your own UI. A small tree of primitives you wire together however you like.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ANATOMY / CODE ===== */}
      <section className="mx-auto max-w-[1220px] px-8 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr]">
          <div>
            <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-primary">
              // 02 — ANATOMY
            </div>
            <h2 className="m-0 mb-[18px] font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em]">
              A viewer in three composable parts.
            </h2>
            <p className="m-0 mb-[26px] max-w-[30ex] text-[15px] text-muted-foreground">
              Loader fetches the document. Highlighter wires the events. Your container renders each
              annotation. Context hooks expose everything else.
            </p>
            <div className="flex flex-col font-mono">
              {anatomy.map((row, i) => (
                <div
                  key={row.name}
                  className={`flex items-center gap-[11px] border-t border-border py-[13px] ${
                    i === anatomy.length - 1 ? "border-b" : ""
                  }`}
                  style={{ paddingLeft: row.indent }}
                >
                  <span
                    className={`w-[108px] text-xs ${row.accent ? "text-primary" : "text-foreground/80"}`}
                  >
                    {row.name}
                  </span>
                  <span className="font-sans text-[13px] text-muted-foreground">{row.note}</span>
                </div>
              ))}
            </div>
          </div>

          <CodePanel />
        </div>
      </section>

      {/* ===== CHANGELOG ===== */}
      <section id="changelog" className="mx-auto max-w-[1220px] px-8 pb-16 pt-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3.5 font-mono text-xs tracking-[0.06em] text-primary">
              // 03 — CHANGELOG
            </div>
            <h2 className="m-0 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em]">
              Shipped recently
            </h2>
          </div>
          <Link
            to="/changelog"
            className="inline-flex items-center gap-[7px] text-sm font-semibold text-primary"
          >
            Full changelog <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.3} />
          </Link>
        </div>
        <div className="grid gap-3.5 md:grid-cols-3">
          {releases.map((r) => (
            <div
              key={r.version}
              className="rounded-[14px] border border-border bg-bg2 p-[22px]"
            >
              <div className="mb-3 flex items-center gap-[9px]">
                <span
                  className={`rounded-[5px] px-2 py-0.5 font-mono text-[11px] font-semibold ${
                    r.current
                      ? "bg-primary text-primary-foreground"
                      : "border border-line2 bg-bg3 text-foreground"
                  }`}
                >
                  {r.version}
                </span>
                <span className="text-[11px] text-faint">{r.date}</span>
              </div>
              <h3 className="m-0 mb-[7px] font-display text-[15.5px] font-semibold">{r.title}</h3>
              <p className="m-0 text-[13px] leading-[1.55] text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="demo" className="mx-auto max-w-[1220px] px-8 pb-20 pt-5">
        <div className="relative overflow-hidden rounded-[22px] border border-line2 bg-gradient-to-b from-bg2 to-background px-12 py-[72px] text-center">
          <div className="pointer-events-none absolute left-1/2 top-[-60px] h-40 w-[480px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.22),transparent_70%)] blur-[40px]" />
          <h2 className="relative m-0 mb-4 font-display text-[46px] font-semibold leading-[1.05] tracking-[-0.02em]">
            Drop a highlighter on your{" "}
            <span className="relative whitespace-nowrap">
              PDFs
              <span className="absolute -left-[3px] -right-[3px] bottom-[5px] z-[-1] h-3.5 -skew-x-[9deg] bg-primary" />
            </span>
            .
          </h2>
          <p className="relative mx-auto mb-8 max-w-[34em] text-[17px] text-muted-foreground">
            Upload your own document or use our sample. Annotate, then export a flattened copy — all
            in the browser.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Link
              to="/pdf-demo"
              className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-[26px] py-3.5 text-[15px] font-semibold text-primary-foreground"
            >
              Launch the demo <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
            </Link>
            <Link
              to="/docs"
              className="rounded-[10px] border border-line2 bg-bg3 px-[26px] py-3.5 text-[15px] font-semibold text-foreground"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <SiteFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Product window — an "always dark" screenshot of the viewer. Fixed dark
 * hexes on purpose so it reads as a product shot in both site themes.
 * ───────────────────────────────────────────────────────────────────────── */
function ProductWindow() {
  return (
    <div className="relative mx-auto max-w-[1040px] overflow-hidden rounded-[14px] border border-[#26262e] bg-[#0e0e12] text-left shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
      {/* title bar */}
      <div className="flex items-center gap-3.5 border-b border-[#1f1f26] bg-[#101015] px-4 py-[11px]">
        <div className="flex gap-[7px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[11px] w-[11px] rounded-full bg-[#3a3a44]" />
          ))}
        </div>
        <div className="flex flex-1 justify-center">
          <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#24242c] bg-[#16161c] px-[13px] py-1 font-mono text-[11.5px] text-[#7c7c88]">
            <FileText className="h-[11px] w-[11px] text-[#ffe14d]" strokeWidth={2} />
            attention-is-all-you-need.pdf
          </div>
        </div>
        <div className="flex items-center gap-[7px]">
          <span className="rounded-md border border-[#24242c] bg-[#16161c] px-[9px] py-1 font-mono text-[11px] text-[#9a9aa5]">
            120%
          </span>
          <span className="inline-flex items-center gap-[5px] rounded-md bg-[#ffe14d] px-2.5 py-1 text-[11.5px] font-semibold text-[#0b0b0d]">
            <Download className="h-3 w-3" strokeWidth={2.2} /> Export
          </span>
        </div>
      </div>

      <div className="flex h-[430px]">
        {/* tool rail */}
        <div className="flex w-[54px] flex-none flex-col items-center gap-1.5 border-r border-[#1f1f26] bg-[#0c0c10] py-3">
          <RailIcon active>
            <Highlighter className="h-[17px] w-[17px]" strokeWidth={2} />
          </RailIcon>
          <RailIcon>
            <StickyNote className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </RailIcon>
          <RailIcon>
            <Pencil className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </RailIcon>
          <RailIcon>
            <Shapes className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </RailIcon>
          <RailIcon>
            <ImageIcon className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </RailIcon>
        </div>

        {/* document canvas */}
        <div className="dot-grid relative flex flex-1 justify-center overflow-hidden bg-[#0a0a0d] py-7">
          <div className="relative w-[420px] rounded border border-[#25252e] bg-[#15151b] px-8 py-[30px] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]">
            <div className="mb-3.5 font-display text-base font-semibold text-[#e7e7ec]">
              3.2 · Scaled Dot-Product Attention
            </div>
            <div className="text-[11.5px] leading-[1.95] text-[#9a9aa5]">
              We call our particular attention{" "}
              <span className="rounded-[1px] bg-[#ffe14d] px-0.5 text-[#0b0b0d]">
                “Scaled Dot-Product Attention”
              </span>
              . The input consists of queries and keys of dimension d_k, and values of dimension
              d_v. We compute the dot products of the query with all keys, divide each by √d_k.
            </div>
            <div className="my-[11px] h-1.5 w-full rounded-[3px] bg-[#23232b]" />
            <div className="mb-2 h-1.5 w-[88%] rounded-[3px] bg-[#23232b]" />
            <div className="mb-2 h-1.5 w-[94%] rounded-[3px] bg-[#23232b]" />

            {/* area selection box */}
            <div className="relative my-3.5 h-[70px] rounded-[3px] border-[1.5px] border-dashed border-[#ffe14d] bg-[#ffe14d]/6">
              {(
                [
                  "-top-1 -left-1",
                  "-top-1 -right-1",
                  "-bottom-1 -left-1",
                  "-bottom-1 -right-1",
                ] as const
              ).map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-[7px] w-[7px] rounded-full bg-[#ffe14d]`}
                />
              ))}
              <span className="absolute -top-[9px] left-2.5 rounded-[3px] bg-[#ffe14d] px-[5px] py-px font-mono text-[8.5px] font-semibold text-[#0b0b0d]">
                AREA · fig.2
              </span>
            </div>
            <div className="mb-2 h-1.5 w-[76%] rounded-[3px] bg-[#23232b]" />
            <div className="h-1.5 w-[91%] rounded-[3px] bg-[#23232b]" />

            {/* freehand squiggle */}
            <svg
              viewBox="0 0 140 40"
              className="pointer-events-none absolute bottom-[42px] left-[170px] h-10 w-[140px] overflow-visible"
            >
              <path
                d="M4,22 C20,6 36,34 52,18 C66,6 80,30 96,16 C110,6 124,26 136,14"
                fill="none"
                stroke="#ff7a59"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#4a4a55]">
              p. 4 / 15
            </div>

            {/* floating selection toolbar */}
            <div className="animate-float-y absolute -right-[26px] top-[54px] flex items-center gap-[5px] rounded-lg border border-[#2e2e38] bg-[#1c1c23] px-[7px] py-[5px] shadow-[0_10px_26px_-10px_rgba(0,0,0,0.7)]">
              <span className="h-3.5 w-3.5 rounded bg-[#ffe14d]" />
              <span className="h-3.5 w-3.5 rounded bg-[#6fcf97]" />
              <span className="h-3.5 w-3.5 rounded bg-[#56a3ff]" />
              <span className="h-4 w-px bg-[#2e2e38]" />
              <MessageSquare className="h-[13px] w-[13px] text-[#9a9aa5]" strokeWidth={2} />
            </div>

            {/* sticky note */}
            <div className="animate-float-y absolute -right-10 top-[120px] w-[118px] rotate-[3deg] rounded-[3px] bg-[#ffe14d] px-[11px] pb-[13px] pt-2.5 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)]">
              <div className="text-[10.5px] font-medium leading-[1.35] text-[#3a3208]">
                Compare with additive attention →
              </div>
            </div>
          </div>
        </div>

        {/* highlights sidebar */}
        <div className="w-[236px] flex-none overflow-hidden border-l border-[#1f1f26] bg-[#0c0c10] px-3.5 py-4">
          <div className="mb-3.5 flex items-center justify-between">
            <span className="font-display text-[13px] font-semibold text-[#e7e7ec]">Highlights</span>
            <span className="rounded-full bg-[#ffe14d] px-[7px] py-px font-mono text-[10px] font-semibold text-[#0b0b0d]">
              4
            </span>
          </div>
          <div className="flex flex-col gap-[9px]">
            {(
              [
                { c: "#ffe14d", t: "“Scaled Dot-Product Attention”", m: "text · p.4" },
                { c: "#6fcf97", t: "Multi-head allows attending to different positions.", m: "note · p.5" },
                { c: "#ffe14d", t: "Figure 2 — attention diagram", m: "area · p.4" },
                { c: "#56a3ff", t: "Positional encoding sketch", m: "drawing · p.6" },
              ] as const
            ).map((h, i) => (
              <div
                key={i}
                className="rounded-r-[7px] bg-[#121218] px-[11px] py-[9px]"
                style={{ borderLeft: `2px solid ${h.c}` }}
              >
                <div className="mb-[5px] text-[10.5px] leading-[1.45] text-[#c9c9d2]">{h.t}</div>
                <div className="font-mono text-[9px] text-[#62626d]">{h.m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RailIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-[9px] ${
        active ? "bg-[#ffe14d] text-[#0b0b0d]" : "text-[#7c7c88]"
      }`}
    >
      {children}
    </div>
  );
}

/* Code panel — always-dark snippet, matching the design's App.tsx window. */
function CodePanel() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-line2 bg-[#0d0d11] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-[#1f1f26] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#2e2e38]" />
        ))}
        <span className="ml-2 font-mono text-[11.5px] text-[#6c6c78]">App.tsx</span>
      </div>
      <pre className="m-0 overflow-x-auto px-5 py-[22px] font-mono text-[12.5px] leading-[1.85] text-[#cfcfd8]">
        <span className="text-[#6c6c78]">
          // install · import "react-pdf-highlighter-plus/style.css"
        </span>
        {"\n"}
        <span className="text-[#c98aff]">import</span>
        {" {\n  "}
        <span className="text-[#ffe14d]">PdfLoader</span>
        {", "}
        <span className="text-[#ffe14d]">PdfHighlighter</span>
        {",\n  "}
        <span className="text-[#ffe14d]">TextHighlight</span>
        {", "}
        <span className="text-[#ffe14d]">AreaHighlight</span>
        {",\n} "}
        <span className="text-[#c98aff]">from</span>{" "}
        <span className="text-[#6fcf97]">"react-pdf-highlighter-plus"</span>
        {";\n\n"}
        <span className="text-[#56a3ff]">&lt;PdfLoader</span>{" "}
        <span className="text-[#ffe14d]">document</span>
        {"={url}"}
        <span className="text-[#56a3ff]">&gt;</span>
        {"\n  {(pdf) => (\n    "}
        <span className="text-[#56a3ff]">&lt;PdfHighlighter</span>{" "}
        <span className="text-[#ffe14d]">pdfDocument</span>
        {"={pdf}\n      "}
        <span className="text-[#ffe14d]">enableAreaSelection</span>
        {"={(e) => e.altKey}"}
        <span className="text-[#56a3ff]">&gt;</span>
        {"\n      "}
        <span className="text-[#56a3ff]">&lt;HighlightContainer </span>
        <span className="text-[#56a3ff]">/&gt;</span>
        {"\n    "}
        <span className="text-[#56a3ff]">&lt;/PdfHighlighter&gt;</span>
        {"\n  )}\n"}
        <span className="text-[#56a3ff]">&lt;/PdfLoader&gt;</span>
      </pre>
    </div>
  );
}
