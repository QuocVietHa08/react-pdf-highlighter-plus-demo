import { Link } from "react-router";
import type { Route } from "./+types/docs";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Github,
  Highlighter,
  BookOpen,
  Package,
  Copy,
  Check,
  ChevronRight,
  Menu,
  X,
  Palette,
  Download,
  Settings,
  Code2,
  Box,
  ExternalLink,
  Info,
  Lightbulb,
  Terminal,
  Search,
  LinkedinIcon,
  Heart,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentation - React PDF Highlighter Plus" },
    {
      name: "description",
      content: "Official documentation for React PDF Highlighter Plus - A powerful PDF annotation library for React.",
    },
  ];
}

interface DocSection {
  id: string;
  icon: React.ElementType;
  title: string;
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}

function CodeBlock({ code, language = "bash", filename }: { code: string; language?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
          <Terminal className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{filename}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </Button>
        <pre className="bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function Callout({ type = "info", title, children }: { type?: "info" | "tip" | "warning"; title?: string; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    tip: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
    warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  };

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    tip: <Lightbulb className="h-5 w-5 text-emerald-500" />,
    warning: <Info className="h-5 w-5 text-amber-500" />,
  };

  return (
    <div className={cn("my-6 rounded-xl border p-4", styles[type])}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold mt-10 mb-4 text-foreground">{children}</h2>;
}

function Heading3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold mt-8 mb-3 text-foreground">{children}</h3>;
}

function Paragraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground leading-7 mb-4", className)}>{children}</p>;
}

function List({ children, ordered = false }: { children: React.ReactNode; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cn(
      "my-4 ml-6 space-y-2 text-muted-foreground",
      ordered ? "list-decimal" : "list-disc"
    )}>
      {children}
    </Tag>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="leading-7">{children}</li>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-mono">
      {children}
    </code>
  );
}

function FeatureGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 my-6">{children}</div>;
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

const sections: DocSection[] = [
  {
    id: "getting-started",
    icon: BookOpen,
    title: "Getting Started",
    items: [
      {
        id: "overview",
        title: "Overview",
        content: (
          <div>
            <Paragraph className="text-lg !text-foreground/80">
              React PDF Highlighter Plus is a powerful, feature-rich PDF annotation library for React applications. Built on top of PDF.js, it provides a comprehensive set of tools for highlighting, annotating, and interacting with PDF documents.
            </Paragraph>

            <Heading2>Core Features</Heading2>
            <FeatureGrid>
              <FeatureCard icon={Highlighter} title="Text Highlighting" description="Select and highlight text with customizable colors and comments" />
              <FeatureCard icon={Box} title="Area Selection" description="Highlight rectangular regions for images and diagrams" />
              <FeatureCard icon={FileText} title="Freetext Notes" description="Add sticky notes anywhere on the document" />
              <FeatureCard icon={Download} title="PDF Export" description="Export annotated PDFs with all highlights embedded" />
            </FeatureGrid>

            <List>
              <ListItem><strong>Image & Signature Support</strong> - Embed images or create handwritten signatures</ListItem>
              <ListItem><strong>Freehand Drawing</strong> - Draw directly on PDF pages with customizable pen</ListItem>
              <ListItem><strong>Shape Annotations</strong> - Add rectangles, circles, and arrows</ListItem>
              <ListItem><strong>Theming</strong> - Full light and dark mode support</ListItem>
            </List>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg">
                <Link to="/pdf-demo">Try Demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        ),
      },
      {
        id: "installation",
        title: "Installation",
        content: (
          <div>
            <Paragraph>
              Install the package using your preferred package manager.
            </Paragraph>

            <Heading3>npm</Heading3>
            <CodeBlock code="npm install react-pdf-highlighter-plus" filename="Terminal" />

            <Heading3>yarn</Heading3>
            <CodeBlock code="yarn add react-pdf-highlighter-plus" filename="Terminal" />

            <Heading3>pnpm</Heading3>
            <CodeBlock code="pnpm add react-pdf-highlighter-plus" filename="Terminal" />

            <Heading3>Import Styles</Heading3>
            <Paragraph>Add the required CSS import to your application entry point:</Paragraph>
            <CodeBlock
              code={`import "react-pdf-highlighter-plus/dist/esm/style/style.css";`}
              language="typescript"
              filename="App.tsx"
            />

            <Callout type="info" title="PDF.js Worker">
              The library uses PDF.js internally. Make sure your bundler supports loading worker files or configure the PDF.js worker separately.
            </Callout>
          </div>
        ),
      },
      {
        id: "quick-start",
        title: "Quick Start",
        content: (
          <div>
            <Paragraph>
              A minimal example to get started with React PDF Highlighter Plus.
            </Paragraph>
            <CodeBlock
              code={`import { useState } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  HighlightContainer,
  TextHighlight,
  AreaHighlight,
} from "react-pdf-highlighter-plus";
import type { Highlight, NewHighlight } from "react-pdf-highlighter-plus";
import "react-pdf-highlighter-plus/dist/esm/style/style.css";

function App() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const addHighlight = (highlight: NewHighlight) => {
    setHighlights([...highlights, { ...highlight, id: crypto.randomUUID() }]);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PdfLoader document="https://example.com/document.pdf">
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            highlights={highlights}
            onSelectionFinished={(
              position,
              content,
              hideTipAndSelection,
              transformSelection
            ) => {
              addHighlight({ position, content, comment: { text: "", emoji: "" } });
              hideTipAndSelection();
            }}
            enableAreaSelection={(event) => event.altKey}
          >
            <HighlightContainer
              textHighlightComponent={TextHighlight}
              areaHighlightComponent={AreaHighlight}
            />
          </PdfHighlighter>
        )}
      </PdfLoader>
    </div>
  );
}`}
              language="typescript"
              filename="App.tsx"
            />

            <Heading3>Key Concepts</Heading3>
            <List>
              <ListItem><strong>PdfLoader</strong> - Handles loading the PDF document and displays loading states</ListItem>
              <ListItem><strong>PdfHighlighter</strong> - The main component that renders the PDF and manages interactions</ListItem>
              <ListItem><strong>HighlightContainer</strong> - Renders highlights on top of the PDF pages</ListItem>
              <ListItem><strong>onSelectionFinished</strong> - Callback when user completes a text or area selection</ListItem>
              <ListItem><strong>enableAreaSelection</strong> - Function to enable area selection mode (e.g., with Alt key)</ListItem>
            </List>
          </div>
        ),
      },
    ],
  },
  {
    id: "highlight-types",
    icon: Highlighter,
    title: "Highlight Types",
    items: [
      {
        id: "text-highlights",
        title: "Text Highlights",
        content: (
          <div>
            <Paragraph>
              Text highlights allow users to select and highlight text content in the PDF with optional comments.
            </Paragraph>

            <Heading3>How It Works</Heading3>
            <List ordered>
              <ListItem>User selects text by clicking and dragging</ListItem>
              <ListItem><InlineCode>onSelectionFinished</InlineCode> callback is triggered with position and content</ListItem>
              <ListItem>You can show a tip/popup for adding comments</ListItem>
              <ListItem>Save the highlight to your state</ListItem>
            </List>

            <Heading3>Highlight Structure</Heading3>
            <CodeBlock
              code={`interface TextHighlight {
  id: string;
  position: {
    boundingRect: ScaledPosition;
    rects: ScaledPosition[];
    pageNumber: number;
  };
  content: {
    text: string;
  };
  comment?: {
    text: string;
    emoji?: string;
  };
}`}
              language="typescript"
              filename="types.ts"
            />

            <Heading3>Using TextHighlight Component</Heading3>
            <CodeBlock
              code={`import { TextHighlight } from "react-pdf-highlighter-plus";

<HighlightContainer
  textHighlightComponent={TextHighlight}
  // or use a custom component
  textHighlightComponent={({ highlight, isScrolledTo }) => (
    <TextHighlight
      highlight={highlight}
      isScrolledTo={isScrolledTo}
      onClick={() => console.log("Highlight clicked", highlight)}
    />
  )}
/>`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "area-highlights",
        title: "Area Highlights",
        content: (
          <div>
            <Paragraph>
              Area highlights let users select rectangular regions, perfect for images, diagrams, or non-text content.
            </Paragraph>

            <Heading3>Enabling Area Selection</Heading3>
            <Paragraph>Area selection is typically enabled with a modifier key:</Paragraph>
            <CodeBlock
              code={`<PdfHighlighter
  // Enable with Alt key
  enableAreaSelection={(event) => event.altKey}

  // Or always enable
  enableAreaSelection={() => true}

  // Or with a toggle state
  enableAreaSelection={() => areaSelectionMode}
/>`}
              language="typescript"
            />

            <Heading3>Area Highlight Structure</Heading3>
            <CodeBlock
              code={`interface AreaHighlight {
  id: string;
  position: {
    boundingRect: ScaledPosition;
    rects: ScaledPosition[];
    pageNumber: number;
  };
  content: {
    image?: string; // Base64 screenshot of the area
  };
  comment?: {
    text: string;
    emoji?: string;
  };
}`}
              language="typescript"
              filename="types.ts"
            />

            <Callout type="tip" title="Automatic Screenshots">
              The library automatically captures a screenshot of the selected area and stores it in <InlineCode>content.image</InlineCode> as a base64 string.
            </Callout>
          </div>
        ),
      },
      {
        id: "freetext-annotations",
        title: "Freetext Annotations",
        content: (
          <div>
            <Paragraph>
              Freetext annotations are sticky notes that can be placed anywhere on the PDF, independent of the text content.
            </Paragraph>

            <Heading3>Enabling Freetext Mode</Heading3>
            <CodeBlock
              code={`const [freetextMode, setFreetextMode] = useState(false);

<PdfHighlighter
  freetextMode={freetextMode}
  onFreetextCreated={(position, content) => {
    addHighlight({
      type: "freetext",
      position,
      content,
      comment: { text: "" },
    });
  }}
/>`}
              language="typescript"
            />

            <Heading3>Freetext Highlight Structure</Heading3>
            <CodeBlock
              code={`interface FreetextHighlight {
  id: string;
  type: "freetext";
  position: {
    boundingRect: ScaledPosition;
    pageNumber: number;
  };
  content: {
    text: string;
  };
  comment?: {
    text: string;
  };
}`}
              language="typescript"
              filename="types.ts"
            />

            <Heading3>Features</Heading3>
            <List>
              <ListItem>Click anywhere to place a note</ListItem>
              <ListItem>Draggable to reposition</ListItem>
              <ListItem>Editable text content</ListItem>
              <ListItem>Maintains position at all zoom levels</ListItem>
            </List>
          </div>
        ),
      },
      {
        id: "images-signatures",
        title: "Images & Signatures",
        content: (
          <div>
            <Paragraph>
              Embed images or create handwritten signatures directly on your PDF documents.
            </Paragraph>

            <Heading3>Adding Images</Heading3>
            <CodeBlock
              code={`const handleAddImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToPlace(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

<PdfHighlighter
  imageToPlace={imageToPlace}
  onImagePlaced={(position, imageData) => {
    addHighlight({
      type: "image",
      position,
      content: { image: imageData },
    });
    setImageToPlace(null);
  }}
/>`}
              language="typescript"
            />

            <Heading3>Signatures</Heading3>
            <Paragraph>
              Signatures are similar to images but typically created using a canvas drawing interface. The demo includes a signature pad modal for creating signatures.
            </Paragraph>
            <CodeBlock
              code={`// Signature is just an image highlight with a signature source
const handleSignatureCreated = (signatureDataUrl: string) => {
  setImageToPlace(signatureDataUrl);
  // User then clicks to place the signature
};`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "freehand-drawing",
        title: "Freehand Drawing",
        content: (
          <div>
            <Paragraph>
              Draw freely on PDF pages with customizable stroke color and width.
            </Paragraph>

            <Heading3>Enabling Drawing Mode</Heading3>
            <CodeBlock
              code={`const [drawingMode, setDrawingMode] = useState(false);
const [strokeColor, setStrokeColor] = useState("#000000");
const [strokeWidth, setStrokeWidth] = useState(2);

<PdfHighlighter
  drawingMode={drawingMode}
  drawingStrokeColor={strokeColor}
  drawingStrokeWidth={strokeWidth}
  onDrawingCreated={(position, pathData) => {
    addHighlight({
      type: "drawing",
      position,
      content: { path: pathData },
    });
  }}
/>`}
              language="typescript"
            />

            <Heading3>Drawing Highlight Structure</Heading3>
            <CodeBlock
              code={`interface DrawingHighlight {
  id: string;
  type: "drawing";
  position: {
    boundingRect: ScaledPosition;
    pageNumber: number;
  };
  content: {
    path: string; // SVG path data
  };
  strokeColor: string;
  strokeWidth: number;
}`}
              language="typescript"
              filename="types.ts"
            />

            <Heading3>Customization Options</Heading3>
            <List>
              <ListItem><strong>strokeColor</strong> - Any CSS color value</ListItem>
              <ListItem><strong>strokeWidth</strong> - Width in pixels (1-10 recommended)</ListItem>
            </List>
          </div>
        ),
      },
    ],
  },
  {
    id: "components",
    icon: Box,
    title: "Components",
    items: [
      {
        id: "pdf-loader",
        title: "PdfLoader",
        content: (
          <div>
            <Paragraph>
              The PdfLoader component handles loading PDF documents and provides loading/error states.
            </Paragraph>

            <Heading3>Props</Heading3>
            <CodeBlock
              code={`interface PdfLoaderProps {
  // Required: URL or ArrayBuffer of the PDF
  document: string | ArrayBuffer;

  // Optional: Render function when PDF is loaded
  children: (pdfDocument: PDFDocumentProxy) => ReactNode;

  // Optional: Custom loading indicator
  beforeLoad?: ReactNode;

  // Optional: Error callback
  onError?: (error: Error) => void;

  // Optional: PDF.js worker URL
  workerUrl?: string;
}`}
              language="typescript"
              filename="PdfLoaderProps.ts"
            />

            <Heading3>Example</Heading3>
            <CodeBlock
              code={`<PdfLoader
  document="https://example.com/document.pdf"
  beforeLoad={<div>Loading PDF...</div>}
  onError={(error) => console.error("Failed to load PDF:", error)}
>
  {(pdfDocument) => (
    <PdfHighlighter pdfDocument={pdfDocument} ... />
  )}
</PdfLoader>`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "pdf-highlighter",
        title: "PdfHighlighter",
        content: (
          <div>
            <Paragraph>
              The main component that renders the PDF and manages all highlighting interactions.
            </Paragraph>

            <Heading3>Core Props</Heading3>
            <CodeBlock
              code={`interface PdfHighlighterProps {
  // Required
  pdfDocument: PDFDocumentProxy;
  highlights: Highlight[];

  // Selection callbacks
  onSelectionFinished?: (
    position: ScaledPosition,
    content: Content,
    hideTipAndSelection: () => void,
    transformSelection: () => void
  ) => void;

  // Area selection
  enableAreaSelection?: (event: MouseEvent) => boolean;

  // Scale/zoom
  pdfScaleValue?: string; // "auto", "page-width", or number

  // Children (usually HighlightContainer)
  children?: ReactNode;
}`}
              language="typescript"
              filename="PdfHighlighterProps.ts"
            />

            <Heading3>Mode Props</Heading3>
            <CodeBlock
              code={`// Freetext mode
freetextMode?: boolean;
onFreetextCreated?: (position, content) => void;

// Drawing mode
drawingMode?: boolean;
drawingStrokeColor?: string;
drawingStrokeWidth?: number;
onDrawingCreated?: (position, pathData) => void;

// Shape mode
shapeMode?: "rectangle" | "circle" | "arrow" | null;
shapeStrokeColor?: string;
shapeStrokeWidth?: number;
onShapeCreated?: (position, shapeData) => void;

// Image placement
imageToPlace?: string;
onImagePlaced?: (position, imageData) => void;`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "highlight-container",
        title: "HighlightContainer",
        content: (
          <div>
            <Paragraph>
              HighlightContainer renders all highlight overlays on top of PDF pages. It must be a child of PdfHighlighter.
            </Paragraph>

            <Heading3>Props</Heading3>
            <CodeBlock
              code={`interface HighlightContainerProps {
  // Component for text highlights
  textHighlightComponent?: ComponentType<{
    highlight: Highlight;
    isScrolledTo: boolean;
  }>;

  // Component for area highlights
  areaHighlightComponent?: ComponentType<{
    highlight: Highlight;
    isScrolledTo: boolean;
  }>;

  // Custom component for all highlight types
  highlightComponent?: ComponentType<{
    highlight: Highlight;
    isScrolledTo: boolean;
    type: HighlightType;
  }>;
}`}
              language="typescript"
              filename="HighlightContainerProps.ts"
            />

            <Heading3>Custom Highlight Components</Heading3>
            <CodeBlock
              code={`<HighlightContainer
  textHighlightComponent={({ highlight, isScrolledTo }) => (
    <div
      className={\`highlight \${isScrolledTo ? "scrolled-to" : ""}\`}
      onClick={() => setSelectedHighlight(highlight)}
    >
      {highlight.comment?.text && (
        <span className="comment">{highlight.comment.text}</span>
      )}
    </div>
  )}
/>`}
              language="typescript"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: "context-hooks",
    icon: Code2,
    title: "Context & Hooks",
    items: [
      {
        id: "pdf-highlighter-context",
        title: "usePdfHighlighterContext",
        content: (
          <div>
            <Paragraph>
              Access the PdfHighlighter context for programmatic control over the viewer.
            </Paragraph>

            <Heading3>Available Values</Heading3>
            <CodeBlock
              code={`const {
  // PDF document reference
  pdfDocument,

  // Current page info
  currentPage,
  totalPages,

  // Scroll methods
  scrollToHighlight,
  scrollToPage,

  // Current scale
  scale,
  setScale,

  // Viewer element ref
  viewerRef,
} = usePdfHighlighterContext();`}
              language="typescript"
            />

            <Heading3>Example: Scroll to Highlight</Heading3>
            <CodeBlock
              code={`function HighlightList({ highlights }) {
  const { scrollToHighlight } = usePdfHighlighterContext();

  return (
    <ul>
      {highlights.map((highlight) => (
        <li
          key={highlight.id}
          onClick={() => scrollToHighlight(highlight.id)}
        >
          {highlight.comment?.text || "Untitled highlight"}
        </li>
      ))}
    </ul>
  );
}`}
              language="typescript"
              filename="HighlightList.tsx"
            />
          </div>
        ),
      },
      {
        id: "highlight-container-context",
        title: "useHighlightContainerContext",
        content: (
          <div>
            <Paragraph>
              Access highlight-specific context within custom highlight components.
            </Paragraph>

            <Heading3>Available Values</Heading3>
            <CodeBlock
              code={`const {
  // The highlight being rendered
  highlight,

  // Whether this highlight is the scroll target
  isScrolledTo,

  // Page number this highlight is on
  pageNumber,

  // Convert scaled position to viewport position
  scaledToViewport,

  // Get screenshot of highlight area
  screenshot,
} = useHighlightContainerContext();`}
              language="typescript"
            />

            <Heading3>Example: Custom Highlight with Screenshot</Heading3>
            <CodeBlock
              code={`function CustomAreaHighlight() {
  const { highlight, screenshot, isScrolledTo } = useHighlightContainerContext();

  return (
    <div className={\`area-highlight \${isScrolledTo ? "active" : ""}\`}>
      {screenshot && (
        <img src={screenshot} alt="Area screenshot" />
      )}
      {highlight.comment?.text}
    </div>
  );
}`}
              language="typescript"
              filename="CustomAreaHighlight.tsx"
            />
          </div>
        ),
      },
      {
        id: "coordinate-systems",
        title: "Coordinate Systems",
        content: (
          <div>
            <Paragraph>
              Understanding the coordinate systems used in React PDF Highlighter Plus.
            </Paragraph>

            <Heading3>Viewport Coordinates</Heading3>
            <Paragraph>
              Viewport coordinates are pixel positions relative to the current rendered page at the current zoom level.
            </Paragraph>
            <CodeBlock
              code={`interface ViewportPosition {
  x1: number;  // Left
  y1: number;  // Top
  x2: number;  // Right
  y2: number;  // Bottom
  width: number;
  height: number;
}`}
              language="typescript"
            />

            <Heading3>Scaled Coordinates</Heading3>
            <Paragraph>
              Scaled coordinates are normalized positions (0-100) relative to the page dimensions. These are stored in highlights for zoom-independent positioning.
            </Paragraph>
            <CodeBlock
              code={`interface ScaledPosition {
  x1: number;  // 0-100 percentage
  y1: number;  // 0-100 percentage
  x2: number;  // 0-100 percentage
  y2: number;  // 0-100 percentage
  width: number;
  height: number;
  pageNumber: number;
}`}
              language="typescript"
            />

            <Heading3>Converting Between Systems</Heading3>
            <CodeBlock
              code={`// Use the context helper
const { scaledToViewport, viewportToScaled } = usePdfHighlighterContext();

// Convert for rendering
const viewportPos = scaledToViewport(highlight.position.boundingRect);

// Convert for storage
const scaledPos = viewportToScaled(clickPosition);`}
              language="typescript"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: "theming",
    icon: Palette,
    title: "Theming",
    items: [
      {
        id: "css-customization",
        title: "CSS Customization",
        content: (
          <div>
            <Paragraph>
              Customize the appearance of highlights and the viewer using CSS variables and custom classes.
            </Paragraph>

            <Heading3>Default Highlight Colors</Heading3>
            <CodeBlock
              code={`/* Override default highlight colors */
.Highlight__part {
  background-color: rgba(255, 226, 143, 0.5);
}

.Highlight--scrolledTo .Highlight__part {
  background-color: rgba(255, 226, 143, 0.8);
}

/* Area highlight styling */
.AreaHighlight {
  border: 2px solid rgba(255, 226, 143, 0.8);
  background-color: rgba(255, 226, 143, 0.3);
}`}
              language="css"
              filename="highlights.css"
            />

            <Heading3>Dark Mode Support</Heading3>
            <CodeBlock
              code={`/* Invert PDF pages in dark mode */
.dark .pdfViewer .page canvas {
  filter: invert(0.9) hue-rotate(180deg);
}

/* Adjust highlight colors for dark mode */
.dark .Highlight__part {
  background-color: rgba(255, 226, 143, 0.4);
}`}
              language="css"
              filename="dark-mode.css"
            />
          </div>
        ),
      },
      {
        id: "custom-components",
        title: "Custom Components",
        content: (
          <div>
            <Paragraph>
              Replace default components with your own custom implementations.
            </Paragraph>

            <Heading3>Custom Text Highlight</Heading3>
            <CodeBlock
              code={`function CustomTextHighlight({ highlight, isScrolledTo }) {
  return (
    <div
      className={cn(
        "highlight-wrapper",
        isScrolledTo && "highlight-active"
      )}
    >
      {highlight.position.rects.map((rect, i) => (
        <div
          key={i}
          className="highlight-rect"
          style={{
            position: "absolute",
            left: \`\${rect.x1}%\`,
            top: \`\${rect.y1}%\`,
            width: \`\${rect.width}%\`,
            height: \`\${rect.height}%\`,
            backgroundColor: highlight.color || "yellow",
          }}
        />
      ))}
      {highlight.comment?.text && (
        <div className="highlight-tooltip">
          {highlight.comment.text}
        </div>
      )}
    </div>
  );
}`}
              language="typescript"
              filename="CustomTextHighlight.tsx"
            />

            <Heading3>Custom Loading Component</Heading3>
            <CodeBlock
              code={`<PdfLoader
  document={url}
  beforeLoad={
    <div className="loading-container">
      <Spinner />
      <p>Loading document...</p>
    </div>
  }
>
  {(doc) => <PdfHighlighter ... />}
</PdfLoader>`}
              language="typescript"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: "export",
    icon: Download,
    title: "PDF Export",
    items: [
      {
        id: "export-api",
        title: "Export API",
        content: (
          <div>
            <Paragraph>
              Export annotated PDFs with all highlights permanently embedded using the export API.
            </Paragraph>

            <Heading3>Basic Export</Heading3>
            <CodeBlock
              code={`import { exportPdf } from "react-pdf-highlighter-plus";

async function handleExport() {
  const pdfBytes = await exportPdf(pdfUrl, highlights);

  // Create download link
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "annotated-document.pdf";
  link.click();

  URL.revokeObjectURL(url);
}`}
              language="typescript"
              filename="export.ts"
            />

            <Heading3>Export Options</Heading3>
            <CodeBlock
              code={`const pdfBytes = await exportPdf(pdfUrl, highlights, {
  // Text highlight color
  textHighlightColor: "rgba(255, 226, 143, 0.5)",

  // Area highlight border color
  areaHighlightBorderColor: "rgba(255, 226, 143, 0.8)",

  // Area highlight fill color
  areaHighlightFillColor: "rgba(255, 226, 143, 0.3)",

  // Progress callback
  onProgress: (currentPage, totalPages) => {
    console.log(\`Processing page \${currentPage} of \${totalPages}\`);
  },
});`}
              language="typescript"
            />

            <Heading3>What Gets Exported</Heading3>
            <List>
              <ListItem><strong>Text Highlights</strong> - As colored rectangle overlays</ListItem>
              <ListItem><strong>Area Highlights</strong> - As bordered rectangles with optional fill</ListItem>
              <ListItem><strong>Freetext Notes</strong> - As text annotations</ListItem>
              <ListItem><strong>Drawings</strong> - As embedded vector graphics</ListItem>
              <ListItem><strong>Shapes</strong> - As vector graphics (rectangles, circles, arrows)</ListItem>
              <ListItem><strong>Images/Signatures</strong> - As embedded images</ListItem>
            </List>
          </div>
        ),
      },
      {
        id: "export-example",
        title: "Complete Export Example",
        content: (
          <div>
            <Paragraph>
              A complete example with progress tracking and error handling.
            </Paragraph>
            <CodeBlock
              code={`import { exportPdf } from "react-pdf-highlighter-plus";
import { useState } from "react";

function ExportButton({ pdfUrl, highlights }) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleExport = async () => {
    setExporting(true);

    try {
      const pdfBytes = await exportPdf(pdfUrl, highlights, {
        textHighlightColor: "rgba(255, 226, 143, 0.5)",
        onProgress: (current, total) => {
          setProgress({ current, total });
        },
      });

      // Download the file
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const filename = \`annotated-\${Date.now()}.pdf\`;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExporting(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <button onClick={handleExport} disabled={exporting}>
      {exporting
        ? \`Exporting... (\${progress.current}/\${progress.total})\`
        : "Export PDF"}
    </button>
  );
}`}
              language="typescript"
              filename="ExportButton.tsx"
            />
          </div>
        ),
      },
    ],
  },
  {
    id: "advanced",
    icon: Settings,
    title: "Advanced",
    items: [
      {
        id: "highlight-management",
        title: "Highlight Management",
        content: (
          <div>
            <Paragraph>
              Best practices for managing highlights in your application.
            </Paragraph>

            <Heading3>State Management</Heading3>
            <CodeBlock
              code={`// Using React state with localStorage persistence
function useHighlights(documentId: string) {
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    const saved = localStorage.getItem(\`highlights-\${documentId}\`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(\`highlights-\${documentId}\`, JSON.stringify(highlights));
  }, [highlights, documentId]);

  const addHighlight = useCallback((highlight: NewHighlight) => {
    setHighlights((prev) => [
      ...prev,
      { ...highlight, id: crypto.randomUUID() },
    ]);
  }, []);

  const updateHighlight = useCallback((id: string, updates: Partial<Highlight>) => {
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  }, []);

  const deleteHighlight = useCallback((id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return { highlights, addHighlight, updateHighlight, deleteHighlight };
}`}
              language="typescript"
              filename="useHighlights.ts"
            />

            <Heading3>Syncing with a Backend</Heading3>
            <CodeBlock
              code={`// Debounced sync to backend
const debouncedSync = useMemo(
  () => debounce(async (highlights: Highlight[]) => {
    await fetch("/api/highlights", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, highlights }),
    });
  }, 1000),
  [documentId]
);

useEffect(() => {
  debouncedSync(highlights);
}, [highlights, debouncedSync]);`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "performance",
        title: "Performance Tips",
        content: (
          <div>
            <Paragraph>
              Optimize performance for large documents and many highlights.
            </Paragraph>

            <Heading3>Virtualization</Heading3>
            <Paragraph>
              The library automatically virtualizes PDF pages, only rendering pages that are visible in the viewport.
            </Paragraph>

            <Heading3>Highlight Optimization</Heading3>
            <CodeBlock
              code={`// Filter highlights by visible pages for better performance
const visibleHighlights = useMemo(() => {
  const visiblePages = new Set([currentPage - 1, currentPage, currentPage + 1]);
  return highlights.filter((h) =>
    visiblePages.has(h.position.pageNumber)
  );
}, [highlights, currentPage]);

<PdfHighlighter
  highlights={visibleHighlights}
  // ... other props
/>`}
              language="typescript"
            />

            <Heading3>Memoization</Heading3>
            <CodeBlock
              code={`// Memoize highlight components
const MemoizedTextHighlight = memo(({ highlight, isScrolledTo }) => (
  <TextHighlight highlight={highlight} isScrolledTo={isScrolledTo} />
));

// Memoize callbacks
const handleSelectionFinished = useCallback(
  (position, content, hideTip, transform) => {
    // ... handle selection
  },
  [/* dependencies */]
);`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "typescript",
        title: "TypeScript Support",
        content: (
          <div>
            <Paragraph>
              React PDF Highlighter Plus is written in TypeScript and exports all types.
            </Paragraph>

            <Heading3>Key Types</Heading3>
            <CodeBlock
              code={`import type {
  // Core highlight types
  Highlight,
  NewHighlight,
  TextHighlight,
  AreaHighlight,

  // Position types
  ScaledPosition,
  ViewportPosition,
  BoundingRect,

  // Content types
  Content,
  Comment,

  // Component props
  PdfLoaderProps,
  PdfHighlighterProps,
  HighlightContainerProps,

  // PDF.js types
  PDFDocumentProxy,
} from "react-pdf-highlighter-plus";`}
              language="typescript"
              filename="types.ts"
            />

            <Heading3>Generic Highlight Type</Heading3>
            <CodeBlock
              code={`// Extend the base highlight type for custom data
interface CustomHighlight extends Highlight {
  author?: string;
  createdAt?: Date;
  tags?: string[];
  color?: string;
}

// Use with proper typing
const [highlights, setHighlights] = useState<CustomHighlight[]>([]);`}
              language="typescript"
            />
          </div>
        ),
      },
      {
        id: "github",
        title: "GitHub & Contributing",
        content: (
          <div>
            <Paragraph>
              React PDF Highlighter Plus is open source. Contributions are welcome!
            </Paragraph>

            <Heading3>Links</Heading3>
            <div className="grid gap-3 mt-4">
              <Button variant="outline" asChild className="justify-start h-auto py-3">
                <a
                  href="https://www.linkedin.com/in/viethadev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <LinkedinIcon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Created by Edward Ha</div>
                    <div className="text-xs text-muted-foreground">Connect on LinkedIn</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </a>
              </Button>
              <Button variant="outline" asChild className="justify-start h-auto py-3">
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Github className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">GitHub Repository</div>
                    <div className="text-xs text-muted-foreground">View source code and contribute</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </a>
              </Button>
              <Button variant="outline" asChild className="justify-start h-auto py-3">
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Report an Issue</div>
                    <div className="text-xs text-muted-foreground">Found a bug? Let us know</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </a>
              </Button>
              <Button variant="outline" asChild className="justify-start h-auto py-3">
                <a
                  href="https://www.npmjs.com/package/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Package className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">NPM Package</div>
                    <div className="text-xs text-muted-foreground">react-pdf-highlighter-plus</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </a>
              </Button>
            </div>

            <Heading3>Contributing</Heading3>
            <Paragraph>
              We welcome contributions! Please read our contributing guidelines before submitting a pull request.
            </Paragraph>
            <List ordered>
              <ListItem>Fork the repository</ListItem>
              <ListItem>Create a feature branch</ListItem>
              <ListItem>Make your changes</ListItem>
              <ListItem>Add tests if applicable</ListItem>
              <ListItem>Submit a pull request</ListItem>
            </List>
          </div>
        ),
      },
    ],
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Find current item
  const currentItem = sections
    .flatMap((s) => s.items.map((item) => ({ ...item, section: s })))
    .find((item) => item.id === activeSection);

  // Handle scroll spy
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setCommandOpen(false);
    window.history.pushState(null, "", `#${id}`);
  }, []);

  // Get prev/next items
  const allItems = sections.flatMap((s) => s.items);
  const currentIndex = allItems.findIndex((i) => i.id === activeSection);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold hidden sm:inline">React PDF Highlighter Plus</span>
              </Link>
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                v1.1.3
              </Badge>
            </div>

            <div className="flex items-center gap-1">
              {/* Search button */}
              <Button
                variant="outline"
                className="relative h-8 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setCommandOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/changelog">Changelog</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/sponsor" className="flex items-center gap-1 text-pink-500 hover:text-pink-600">
                  <Heart className="h-4 w-4" />
                  Sponsor
                </Link>
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/QuocVietHa08/react-pdf-highlighter-plus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/pdf-demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto pt-14">
        <div className="lg:flex">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-0 top-14 z-40 lg:sticky lg:top-14 lg:z-0 lg:block lg:w-72 lg:shrink-0 lg:self-start",
              mobileMenuOpen ? "block" : "hidden"
            )}
          >
            {/* Mobile overlay */}
            {mobileMenuOpen && (
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Sidebar content */}
            <div className="relative h-[calc(100vh-3.5rem)] w-72 bg-background border-r">
              <ScrollArea className="h-full py-8 px-6">
                <div className="space-y-8">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <h4 className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-foreground uppercase tracking-wide">
                        <section.icon className="h-4 w-4 text-primary" />
                        {section.title}
                      </h4>
                      <div className="mt-3 space-y-1">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                              "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all",
                              activeSection === item.id
                                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
              <div className="max-w-3xl mx-auto lg:mx-0">
                {/* Breadcrumb */}
                {currentItem && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">{currentItem.title}</span>
                  </div>
                )}

                {/* Content */}
                {currentItem && (
                  <article>
                    <header className="mb-10 pb-8 border-b">
                      <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        {currentItem.title}
                      </h1>
                    </header>
                    <div className="docs-content">{currentItem.content}</div>
                  </article>
                )}

                {/* Pagination */}
                <div className="mt-16 pt-8 border-t">
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      {prevItem && (
                        <button
                          onClick={() => handleNavClick(prevItem.id)}
                          className="group flex flex-col items-start p-4 -m-4 rounded-xl hover:bg-muted transition-colors w-full text-left"
                        >
                          <span className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            <ArrowLeft className="h-3 w-3" />
                            Previous
                          </span>
                          <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {prevItem.title}
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="flex-1">
                      {nextItem && (
                        <button
                          onClick={() => handleNavClick(nextItem.id)}
                          className="group flex flex-col items-end p-4 -m-4 rounded-xl hover:bg-muted transition-colors w-full text-right"
                        >
                          <span className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            Next
                            <ArrowRight className="h-3 w-3" />
                          </span>
                          <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {nextItem.title}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Command Menu */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sections.map((section) => (
            <CommandGroup key={section.id} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${section.title} ${item.title}`}
                  onSelect={() => handleNavClick(item.id)}
                  className="cursor-pointer"
                >
                  <section.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
