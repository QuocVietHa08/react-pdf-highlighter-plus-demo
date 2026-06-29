import { Link } from "react-router";
import type { Route } from "./+types/changelog";
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Layout,
  Palette,
  PanelLeft,
  Moon,
  Code2,
  Package,
  HelpCircle,
  Navigation,
  MousePointer2,
  Menu,
  Search,
  Headphones,
  ZoomIn,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SiteNav } from "~/components/SiteNav";
import { SiteFooter } from "~/components/SiteFooter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Changelog - React PDF Highlighter Plus Demo" },
    {
      name: "description",
      content: "View the changelog and release history for the React PDF Highlighter Plus Demo application.",
    },
  ];
}

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  features: {
    icon: React.ElementType;
    title: string;
    description: string;
    items?: string[];
  }[];
  technical?: string[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2026-06-29",
    title: "React PDF Highlighter Plus v1.2.0",
    features: [
      {
        icon: Moon,
        title: "Hue-Preserving Dark Mode",
        description:
          "Pages recolor at render time (OKLab) instead of a CSS invert filter",
        items: [
          "Colors keep their hue; embedded photos keep their pixels",
          "Configure via theme.darkModeColors { background, foreground }",
          "Highlights stay readable; LeftPanel gains a mode prop",
          "Scroll AND zoom preserved when toggling the theme",
        ],
      },
      {
        icon: Sparkles,
        title: "Citations",
        description:
          "Turn any quote into a precise highlight with getTextPosition",
        items: [
          "Whitespace-insensitive matching with a fuzzy fallback",
          "Paste an AI quote → jump + highlight the exact phrase",
          "Citations panel with click-to-jump",
        ],
      },
      {
        icon: Headphones,
        title: "Read Aloud (Text-to-Speech)",
        description: "Speak the document and follow each sentence",
        items: [
          "Highlights + auto-scrolls to each sentence as it's read",
          "Play / pause / seek / speed / voice transport",
          "Pluggable TTS engine (browser voice now, cloud later)",
        ],
      },
      {
        icon: ZoomIn,
        title: "Zoom, Smooth Scroll & Deep Linking",
        description: "Pinch zoom, animated scroll, and ?page=N links",
        items: [
          "Pinch / ctrl(⌘)+wheel zoom, smooth via GPU transform",
          "scrollToHighlight animates and respects reduced-motion",
          "initialPage + onPageChange for deep links",
        ],
      },
      {
        icon: Package,
        title: "Faster Loading & Stability",
        description: "Progressive loading, caching, and render fixes",
        items: [
          "PdfLoader: range loading, auth headers, document cache",
          "Fixed a React-root render warning + a memory leak",
          "Less re-rendering while scrolling annotated documents",
        ],
      },
    ],
    technical: [
      "Updated `react-pdf-highlighter-plus` from v1.1.4 to v1.2.0",
      "Replaced `theme.darkModeInvertIntensity` with `theme.darkModeColors`",
      "Added `getTextPosition`, `onZoomChange`, `initialPage`, `onPageChange`, `LeftPanel mode`",
      "New demo: Citations panel + Read-aloud transport (built on `extractSentences` + `scrollToHighlight`)",
    ],
  },
  {
    version: "1.2.1",
    date: "2026-04-30",
    title: "React PDF Highlighter Plus v1.1.4",
    features: [
      {
        icon: Package,
        title: "Package Update",
        description: "Updated react-pdf-highlighter-plus to v1.1.4",
        items: [
          "Uses the package-provided PDF.js worker by default",
          "Adopts the renamed dark mode intensity option",
          "Passes copy text into text and area highlight toolbars",
        ],
      },
      {
        icon: Search,
        title: "PDF Search",
        description: "Added document search powered by the highlighter utilities",
        items: [
          "Search all PDF text from the viewer header",
          "Navigate next and previous matches",
          "Clear active search highlights",
        ],
      },
    ],
    technical: [
      "Updated `react-pdf-highlighter-plus` from v1.1.3 to v1.1.4",
      "Removed manual `pdfjs.GlobalWorkerOptions.workerSrc` setup",
      "Added `PdfHighlighterUtils.search`, `findNext`, `findPrevious`, and `clearSearch` integration",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-01-10",
    title: "Guided Tour & Improved Discoverability",
    features: [
      {
        icon: Navigation,
        title: "Interactive Guided Tour",
        description: "New onboarding experience powered by Driver.js",
        items: [
          "5-step tour covering all main features",
          "Click 'Guide' button in header to start anytime",
          "Tour progress indicator",
          "Themed popover matching app design",
        ],
      },
      {
        icon: HelpCircle,
        title: "Help Button",
        description: "Prominent 'Guide' button in the header toolbar",
        items: [
          "Easy access to feature tour",
          "Primary color styling for visibility",
          "Tooltip with description",
        ],
      },
      {
        icon: Sparkles,
        title: "FAB Pulse Animation",
        description: "Visual indicator for first-time users",
        items: [
          "Pulsing ring animation on floating action button",
          "Stops after first interaction",
          "Persisted state in localStorage",
        ],
      },
      {
        icon: Menu,
        title: "FAB Opens by Default",
        description: "Tools menu expanded on first visit for better discoverability",
        items: [
          "First-time users see all tools immediately",
          "State remembered for returning users",
          "Reduces confusion about the + button purpose",
        ],
      },
      {
        icon: MousePointer2,
        title: "Cursor/Select Tool",
        description: "New tool to exit annotation modes and return to normal cursor",
        items: [
          "Click to exit any active annotation mode",
          "Shows as 'active' when no mode is selected",
          "Solves confusion between arrow tool and cursor",
        ],
      },
    ],
    technical: [
      "Added `driver.js` library for guided tours",
      "Created `useTour` hook in `/app/hooks/useTour.ts`",
      "Added `data-tour` attributes to key UI elements",
      "Added Driver.js theme overrides in app.css",
      "Restored FAB pulse animation with `animate-pulse-ring` class",
      "FAB `isOpen` state now initialized from localStorage for first-time detection",
      "Added `MousePointer2` cursor tool with `onExitAllModes` handler",
    ],
  },
  {
    version: "1.1.1",
    date: "2026-01-04",
    title: "Package Update & Bug Fix",
    features: [
      {
        icon: Package,
        title: "Package Update",
        description: "Updated react-pdf-highlighter-plus to v1.1.3",
        items: [
          "Fixed CSS import path (now uses dist/esm/style/style.css)",
          "Improved package structure",
        ],
      },
    ],
    technical: [
      "Updated `react-pdf-highlighter-plus` from v1.1.2 to v1.1.3",
      "Fixed CSS import in root.tsx to use new path",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-01-02",
    title: "Left Panel & Theme Integration",
    features: [
      {
        icon: PanelLeft,
        title: "Left Panel",
        description: "Added collapsible document panel with navigation features",
        items: [
          "Document Outline tab (table of contents navigation)",
          "Page Thumbnails tab (visual page navigation)",
          "Click-to-navigate functionality",
          "Toggle button in header",
        ],
      },
      {
        icon: Moon,
        title: "PDF Viewer Theme Integration",
        description: "Connected app theme to PDF viewer for consistent styling",
        items: [
          "Dark mode with PDF page inversion (0.87 intensity)",
          "Custom scrollbar colors matching app theme",
          "Container background synced with theme",
        ],
      },
      {
        icon: Layout,
        title: "Dual Panel Layout",
        description: "New layout structure with panels on both sides",
        items: [
          "Left Panel (Document Outline & Pages) - toggle with left button",
          "Right Sidebar (Highlights) - toggle with right button",
        ],
      },
      {
        icon: Code2,
        title: "useEffectiveTheme Hook",
        description: "New hook to resolve \"system\" theme to actual light/dark mode",
      },
    ],
    technical: [
      "Added `LeftPanel` component from react-pdf-highlighter-plus",
      "Added `PdfHighlighterTheme` for PDF viewer theming",
      "Added `leftPanelTheme` configuration matching shadcn/ui colors",
      "Restructured PdfViewer layout with CSS order for proper rendering",
      "Added viewer/linkService/eventBus integration for outline navigation",
      "Created `/app/hooks/useEffectiveTheme.ts`",
    ],
  },
  {
    version: "1.0.0",
    date: "Initial Release",
    title: "Initial Release",
    features: [
      {
        icon: Sparkles,
        title: "Core Features",
        description: "Complete PDF annotation toolkit",
        items: [
          "Text highlighting with comments",
          "Area selection (Alt + drag)",
          "Freetext sticky notes",
          "Image & signature embedding",
          "Freehand drawing",
          "Shape annotations (rectangle, circle, arrow)",
          "PDF export with annotations",
        ],
      },
      {
        icon: Palette,
        title: "Theming",
        description: "Comprehensive theme support",
        items: [
          "Dark/Light mode toggle",
          "System theme detection",
          "6 color themes: Blue, Orange, Yellow, Green, Purple, Rose",
        ],
      },
      {
        icon: FileText,
        title: "Persistence",
        description: "Data storage and management",
        items: [
          "LocalStorage persistence for annotations",
          "Zustand state management",
        ],
      },
    ],
  },
];

export default function Changelog() {
  return (
    <div className="dot-grid min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav
        links={[
          { label: "Docs", to: "/docs" },
          { label: "Sponsor", to: "/sponsor" },
        ]}
      />

      {/* Header */}
      <section className="px-4 pb-12 pt-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-2 font-mono text-xs tracking-[0.06em] text-primary">
            // CHANGELOG
          </div>
          <h1 className="font-display text-[40px] font-semibold leading-[1.06] tracking-[-0.02em]">
            Shipped recently
          </h1>
          <p className="mt-2 text-muted-foreground">Track updates and new features.</p>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {changelog.map((entry, index) => (
              <div key={entry.version} className="relative">
                {/* Timeline line */}
                {index < changelog.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border -translate-x-1/2" />
                )}

                {/* Version header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-semibold text-primary-foreground">
                    v{entry.version}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{entry.title}</h2>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="pl-16 space-y-6">
                  {entry.features.map((feature) => (
                    <Card key={feature.title}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      {feature.items && (
                        <CardContent className="pt-0">
                          <ul className="space-y-2">
                            {feature.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  ))}

                  {/* Technical changes */}
                  {entry.technical && (
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          Technical Changes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1">
                          {entry.technical.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground font-mono">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
