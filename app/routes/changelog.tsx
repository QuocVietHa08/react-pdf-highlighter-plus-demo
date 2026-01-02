import { Link } from "react-router";
import type { Route } from "./+types/changelog";
import {
  ArrowLeft,
  FileText,
  GithubIcon,
  Sparkles,
  Layout,
  Palette,
  PanelLeft,
  Moon,
  Code2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from "~/components/ui/theme-toggle";

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">React PDF Highlighter Plus</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GithubIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
              <Button asChild>
                <Link to="/pdf-demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Changelog</h1>
              <p className="text-muted-foreground">Track updates and new features</p>
            </div>
          </div>
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm z-10">
                    v{entry.version}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{entry.title}</h2>
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
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">React PDF Highlighter Plus</p>
                <p className="text-sm text-muted-foreground">
                  Built with{" "}
                  <a
                    href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    react-pdf-highlighter-plus
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            Open source under MIT License
          </div>
        </div>
      </footer>
    </div>
  );
}
