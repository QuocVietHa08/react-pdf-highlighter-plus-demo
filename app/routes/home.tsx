import { Link } from "react-router";
import type { Route } from "./+types/home";
import {
  Highlighter,
  StickyNote,
  Image,
  Pencil,
  Shapes,
  Download,
  ArrowRight,
  GithubIcon,
  FileText,
  Sparkles,
  Lock,
  Cpu,
  Copy,
  Check,
  Code2,
  BookOpen,
  Palette,
  Move,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from "~/components/ui/theme-toggle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React PDF Highlighter Plus - Open Source PDF Annotation Tool" },
    {
      name: "description",
      content:
        "A powerful open source PDF annotation tool built with React and react-pdf-highlighter-plus. Add highlights, notes, drawings, shapes, and more.",
    },
  ];
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Highlighter,
    title: "Text Highlighting",
    description: "Select and highlight text passages with customizable colors. Positions stored in viewport-independent coordinates.",
  },
  {
    icon: StickyNote,
    title: "Freetext Notes",
    description: "Create draggable, editable sticky notes with styling options. Click to edit, drag to reposition.",
  },
  {
    icon: Image,
    title: "Images & Signatures",
    description: "Upload images or draw signatures with mouse/touch. Drag to reposition, resize with aspect ratio preservation.",
  },
  {
    icon: Pencil,
    title: "Freehand Drawing",
    description: "Draw directly on PDFs with customizable stroke color and width. Stored as PNG for export compatibility.",
  },
  {
    icon: Shapes,
    title: "Shape Annotations",
    description: "Add rectangles, circles, and arrows. Hold Alt while dragging for area selection on non-text content.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Export annotated documents with all highlights permanently embedded. Progress callback included.",
  },
];

const advancedFeatures = [
  {
    icon: ZoomIn,
    title: "Full Zoom Support",
    description: "Zoom in/out while maintaining annotation positions with viewport-independent coordinate storage.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Exposed styling on all components. Extend the Highlight interface with custom properties.",
  },
  {
    icon: Move,
    title: "Draggable Elements",
    description: "Notes, images, and signatures can be repositioned by dragging. Toolbar appears on hover.",
  },
  {
    icon: Code2,
    title: "TypeScript First",
    description: "Full TypeScript support with comprehensive type definitions for all components and utilities.",
  },
];

const stats = [
  { value: "6+", label: "Annotation Types" },
  { value: "100%", label: "Client-Side" },
  { value: "MIT", label: "Licensed" },
  { value: "TS", label: "TypeScript" },
];

const techStack = [
  { name: "React 19", variant: "default" as const },
  { name: "TypeScript", variant: "secondary" as const },
  { name: "PDF.js", variant: "outline" as const },
  { name: "Tailwind CSS", variant: "default" as const },
  { name: "shadcn/ui", variant: "secondary" as const },
  { name: "Zustand", variant: "outline" as const },
];

const installCode = `npm install react-pdf-highlighter-plus`;

const importCode = `import "react-pdf-highlighter-plus/style/style.css";`;

const basicExample = `import {
  PdfLoader,
  PdfHighlighter,
  TextHighlight,
  AreaHighlight,
  useHighlightContainerContext,
} from "react-pdf-highlighter-plus";

function App() {
  const [highlights, setHighlights] = useState([]);

  return (
    <PdfLoader document="https://example.com/doc.pdf">
      {(pdfDocument) => (
        <PdfHighlighter
          pdfDocument={pdfDocument}
          highlights={highlights}
          enableAreaSelection={(e) => e.altKey}
        >
          <HighlightContainer />
        </PdfHighlighter>
      )}
    </PdfLoader>
  );
}`;

const exportExample = `import { exportPdf } from "react-pdf-highlighter-plus";

const handleExport = async () => {
  const pdfBytes = await exportPdf(pdfUrl, highlights, {
    textHighlightColor: "rgba(255, 226, 143, 0.5)",
    onProgress: (current, total) =>
      console.log(\`\${current}/\${total} pages\`),
  });

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  // Download the file...
};`;

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">React PDF Highlighter Plus</span>
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
                <Link to="/pdf-demo" className="flex items-center gap-2">
                  Try Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <Badge variant="secondary" className="mb-8">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by react-pdf-highlighter-plus
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span>Modern</span>
            <br />
            <span className="text-primary">PDF Annotation</span>
            <br />
            <span>for React</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A feature-rich, headless PDF viewer and annotation library built on PDF.js.
            Highlight text, add notes, draw shapes, embed images, and export annotated PDFs.
            All processing happens in the browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link to="/pdf-demo" className="flex items-center gap-2">
                Try the Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need for{" "}
              <span className="text-primary">PDF annotations</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A comprehensive set of annotation tools built for modern React applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 px-4 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick <span className="text-primary">Installation</span>
            </h2>
            <p className="text-muted-foreground">
              Get started in minutes with npm or yarn
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">1. Install the package</p>
              <CodeBlock code={installCode} />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">2. Import the styles</p>
              <CodeBlock code={importCode} />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">3. Basic usage example</p>
              <CodeBlock code={basicExample} />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://quocvietha08.github.io/react-pdf-highlighter-plus/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Full Documentation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.npmjs.com/package/react-pdf-highlighter-plus"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on npm
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Advanced <span className="text-primary">Capabilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section className="py-20 px-4 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-primary">Export</span> Annotated PDFs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Embed all annotations permanently into downloadable PDF files.
              Supports text highlights, area highlights, freetext notes, images, signatures, and drawings.
            </p>
          </div>

          <CodeBlock code={exportExample} />
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                Why{" "}
                <span className="text-primary">react-pdf-highlighter-plus</span>?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Fully Open Source</h4>
                    <p className="text-muted-foreground text-sm">
                      MIT licensed and free to use in personal and commercial projects.
                      No strings attached.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Modern Stack</h4>
                    <p className="text-muted-foreground text-sm">
                      Built with the latest React, TypeScript, and PDF.js for
                      optimal performance and developer experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Privacy First</h4>
                    <p className="text-muted-foreground text-sm">
                      All processing happens in the browser. Your documents
                      never leave your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Built with</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {techStack.map((tech) => (
                    <Badge key={tech.name} variant={tech.variant}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-6" />

                <p className="text-sm text-muted-foreground mb-4">Get started with:</p>
                <CodeBlock code="npm install react-pdf-highlighter-plus" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-20 px-4 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Component <span className="text-primary">Architecture</span>
            </h2>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">PdfLoader</Badge>
                  <span className="text-muted-foreground">Creates container to load PDF documents</span>
                </div>
                <div className="pl-6 border-l-2 border-muted">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">PdfHighlighter</Badge>
                    <span className="text-muted-foreground">Provides viewer with event listeners</span>
                  </div>
                  <div className="pl-6 mt-4 border-l-2 border-muted">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">HighlightContainer</Badge>
                      <span className="text-muted-foreground">User-defined, rendered per highlight</span>
                    </div>
                    <div className="pl-6 mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">TextHighlight</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">AreaHighlight</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">FreetextHighlight</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">ImageHighlight</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">DrawingHighlight</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="font-semibold">Context Hooks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <code className="text-primary">usePdfHighlighterContext()</code>
                    <p className="text-muted-foreground mt-1">
                      Viewer utilities: scrollToHighlight, setTip, getCurrentSelection
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <code className="text-primary">useHighlightContainerContext()</code>
                    <p className="text-muted-foreground mt-1">
                      Per-highlight: highlight object, viewportToScaled, screenshot
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to{" "}
            <span className="text-primary">get started</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Experience all the annotation features with our interactive demo.
            Upload your own PDF or use our sample document.
          </p>
          <Button size="lg" className="text-lg px-10 py-6" asChild>
            <Link to="/pdf-demo" className="flex items-center gap-2">
              Launch Demo
              <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
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
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.npmjs.com/package/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code2 className="h-5 w-5" />
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
