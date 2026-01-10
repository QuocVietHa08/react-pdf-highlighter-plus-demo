import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommentForm } from "./CommentForm";
import { ContextMenu, type ContextMenuProps } from "./ContextMenu";
import { ExpandableTip } from "./ExpandableTip";
import { HighlightContainer } from "./HighlightContainer";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FloatingActions } from "./FloatingActions";
import { useTour } from "~/hooks/useTour";
import {
  type DrawingStroke,
  type GhostHighlight,
  type PdfHighlighterUtils,
  type PdfHighlighterTheme,
  type ScaledPosition,
  type ShapeData,
  type ShapeType,
  type Tip,
  type ViewportHighlight,
  LeftPanel,
  PdfHighlighter,
  PdfLoader,
  SignaturePad,
  exportPdf,
} from "react-pdf-highlighter-plus";
import { useHighlightStore, type CommentedHighlight } from "~/store/highlightStore";
import { useEffectiveTheme } from "~/hooks/useEffectiveTheme";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

// Set up PDF.js worker dynamically
if (typeof window !== "undefined") {
  import("pdfjs-dist").then((pdfjs) => {
    // Use the exact version to avoid API/Worker version mismatch
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
  });
}

const SAMPLE_PDF_URL = "https://arxiv.org/pdf/2203.11115";

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => {
  return document.location.hash.slice("#highlight-".length);
};

const resetHash = () => {
  document.location.hash = "";
};

export function PdfViewer() {
  const {
    highlights,
    addHighlight: storeAddHighlight,
    updateHighlight,
    deleteHighlight: storeDeleteHighlight,
    resetHighlights,
  } = useHighlightStore();

  const [url, setUrl] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps | null>(null);
  const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(undefined);
  const [highlightPen, setHighlightPen] = useState<boolean>(false);
  const [freetextMode, setFreetextMode] = useState<boolean>(false);
  const [imageMode, setImageMode] = useState<boolean>(false);
  const [areaMode, setAreaMode] = useState<boolean>(false);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState<boolean>(false);
  const [pendingImageData, setPendingImageData] = useState<string | null>(null);
  // Drawing mode state
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [drawingStrokeColor, setDrawingStrokeColor] = useState<string>("#000000");
  const [drawingStrokeWidth, setDrawingStrokeWidth] = useState<number>(3);
  // Shape mode state
  const [shapeMode, setShapeMode] = useState<ShapeType | null>(null);
  const [shapeStrokeColor, setShapeStrokeColor] = useState<string>("#000000");
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState<number>(2);
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [scrolledToHighlightId, setScrolledToHighlightId] = useState<string | null>(null);
  // Left panel state
  const [leftPanelOpen, setLeftPanelOpen] = useState<boolean>(true);

  // Theme integration
  const effectiveTheme = useEffectiveTheme();

  // PDF Highlighter theme configuration
  const pdfHighlighterTheme: PdfHighlighterTheme = useMemo(
    () => ({
      mode: effectiveTheme,
      containerBackgroundColor:
        effectiveTheme === "dark" ? "hsl(240 10% 3.9%)" : "hsl(240 4.8% 95.9%)",
      darkModeInversionIntensity: 0.87,
      scrollbarThumbColor:
        effectiveTheme === "dark" ? "hsl(240 5% 50%)" : "hsl(240 3.8% 70%)",
      scrollbarTrackColor:
        effectiveTheme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
    }),
    [effectiveTheme]
  );

  // Left panel theme configuration
  const leftPanelTheme = useMemo(
    () => ({
      mode: effectiveTheme as "light" | "dark",
      backgroundColor:
        effectiveTheme === "dark" ? "hsl(240 10% 3.9%)" : "hsl(0 0% 100%)",
      textColor:
        effectiveTheme === "dark" ? "hsl(0 0% 98%)" : "hsl(240 10% 3.9%)",
      borderColor:
        effectiveTheme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 5.9% 90%)",
      hoverBackgroundColor:
        effectiveTheme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
      activeBackgroundColor:
        effectiveTheme === "dark" ? "hsl(240 3.7% 20%)" : "hsl(240 4.8% 90%)",
      scrollbarThumbColor:
        effectiveTheme === "dark" ? "hsl(240 5% 64.9%)" : "hsl(240 3.8% 46.1%)",
      scrollbarTrackColor:
        effectiveTheme === "dark" ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
    }),
    [effectiveTheme]
  );

  // Refs
  const highlighterUtilsRef = useRef<PdfHighlighterUtils>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Tour hook
  const { startTour } = useTour();
  // Track when highlighter utils are ready for LeftPanel
  const [highlighterReady, setHighlighterReady] = useState(false);

  // Click listeners for context menu
  useEffect(() => {
    const handleClick = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu]);

  // Track scrolled highlight from hash
  useEffect(() => {
    const handleHashChange = () => {
      const id = parseIdFromHash();
      setScrolledToHighlightId(id || null);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    highlight: ViewportHighlight<CommentedHighlight>,
  ) => {
    event.preventDefault();

    setContextMenu({
      xPos: event.clientX,
      yPos: event.clientY,
      deleteHighlight: () => storeDeleteHighlight(highlight.id),
      editComment: () => editComment(highlight),
    });
  };

  const addHighlight = (highlight: GhostHighlight, comment: string) => {
    console.log("Saving highlight", highlight);
    const newHighlight: CommentedHighlight = {
      ...highlight,
      comment,
      id: getNextId(),
    } as CommentedHighlight;
    storeAddHighlight(newHighlight);
  };

  const editHighlight = (
    idToUpdate: string,
    edit: Partial<CommentedHighlight>,
  ) => {
    console.log(`Editing highlight ${idToUpdate} with `, edit);
    updateHighlight(idToUpdate, edit);
  };

  const handleFreetextClick = (position: ScaledPosition) => {
    console.log("Creating freetext highlight", position);
    const newHighlight: CommentedHighlight = {
      id: getNextId(),
      type: "freetext",
      position,
      content: { text: "New note" },
      comment: "",
    };
    storeAddHighlight(newHighlight);
    setFreetextMode(false);
  };

  const handleImageClick = (position: ScaledPosition) => {
    console.log("Creating image highlight", position);
    if (pendingImageData) {
      const img = new Image();
      img.onload = () => {
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const boundingRect = position.boundingRect;

        const currentWidth = boundingRect.x2 - boundingRect.x1;
        const adjustedHeight = currentWidth / imageAspect;

        const adjustedPosition: ScaledPosition = {
          ...position,
          boundingRect: {
            ...boundingRect,
            y2: boundingRect.y1 + adjustedHeight,
          },
          rects: position.rects.map(rect => ({
            ...rect,
            y2: rect.y1 + adjustedHeight,
          })),
        };

        const newHighlight: CommentedHighlight = {
          id: getNextId(),
          type: "image",
          position: adjustedPosition,
          content: { image: pendingImageData },
          comment: "",
        };
        storeAddHighlight(newHighlight);
        setPendingImageData(null);
        setImageMode(false);
      };
      img.src = pendingImageData;
    }
  };

  const handleAddImage = () => {
    imageInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        console.log("Image loaded, entering image mode");
        setPendingImageData(dataUrl);
        setImageMode(true);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleAddSignature = () => {
    setIsSignaturePadOpen(true);
  };

  const handleSignatureComplete = (dataUrl: string) => {
    console.log("Signature complete, entering image mode");
    setPendingImageData(dataUrl);
    setIsSignaturePadOpen(false);
    setImageMode(true);
  };

  const handleDrawingComplete = (dataUrl: string, position: ScaledPosition, strokes: DrawingStroke[]) => {
    console.log("Drawing complete", position, "with", strokes.length, "strokes");
    const newHighlight: CommentedHighlight = {
      id: getNextId(),
      type: "drawing",
      position,
      content: { image: dataUrl, strokes },
      comment: "",
    };
    storeAddHighlight(newHighlight);
    setDrawingMode(false);
  };

  const handleDrawingCancel = () => {
    console.log("Drawing cancelled");
    setDrawingMode(false);
  };

  const handleShapeComplete = (position: ScaledPosition, shape: ShapeData) => {
    console.log("Shape complete", shape.shapeType, position);
    const newHighlight: CommentedHighlight = {
      id: getNextId(),
      type: "shape",
      position,
      content: { shape },
      shapeType: shape.shapeType,
      strokeColor: shape.strokeColor,
      strokeWidth: shape.strokeWidth,
      comment: "",
    };
    storeAddHighlight(newHighlight);
    setShapeMode(null);
  };

  const handleShapeCancel = () => {
    console.log("Shape cancelled");
    setShapeMode(null);
  };

  const handleExportPdf = async () => {
    if (!url) return;
    console.log("Exporting PDF with annotations...");
    try {
      const pdfBytes = await exportPdf(url, highlights, {
        onProgress: (current, total) => {
          console.log(`Exporting page ${current}/${total}`);
        },
      });

      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "annotated-document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      console.log("PDF exported successfully!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. See console for details.");
    }
  };

  const handleZoomIn = () => {
    const currentScale = pdfScaleValue || 1;
    setPdfScaleValue(Math.min(currentScale + 0.25, 3));
  };

  const handleZoomOut = () => {
    const currentScale = pdfScaleValue || 1;
    setPdfScaleValue(Math.max(currentScale - 0.25, 0.5));
  };

  const getHighlightById = useCallback((id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  }, [highlights]);

  const editComment = (highlight: ViewportHighlight<CommentedHighlight>) => {
    if (!highlighterUtilsRef.current) return;

    const editCommentTip: Tip = {
      position: highlight.position,
      content: (
        <Card className="min-w-[250px] shadow-lg">
          <CardContent className="p-0">
            <CommentForm
              placeHolder={highlight.comment || "Add a comment..."}
              onSubmit={(input) => {
                editHighlight(highlight.id, { comment: input });
                highlighterUtilsRef.current!.setTip(null);
                highlighterUtilsRef.current!.toggleEditInProgress(false);
              }}
            />
          </CardContent>
        </Card>
      ),
    };

    highlighterUtilsRef.current.setTip(editCommentTip);
    highlighterUtilsRef.current.toggleEditInProgress(true);
  };

  const handleEditFromSidebar = (highlight: CommentedHighlight) => {
    document.location.hash = `highlight-${highlight.id}`;
  };

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(highlight);
    }
  }, [getHighlightById]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [scrollToHighlightFromHash]);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const pdfUrl = URL.createObjectURL(file);
      setUrl(pdfUrl);
      resetHighlights();
    }
  };

  const handleChangePdf = () => {
    setUrl(null);
  };

  // Show upload screen if no PDF is loaded
  if (!url) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/50">
        <Card className="max-w-md shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary mx-auto mb-4">
              <span className="text-lg font-bold text-primary-foreground">PDF</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">PDF Highlighter</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Powered by react-pdf-highlighter-plus
            </p>
            <p className="text-muted-foreground mb-6">
              Upload a PDF file or load a sample to get started with highlighting.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  Upload PDF
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">or</span>
                <Separator className="flex-1" />
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setUrl(SAMPLE_PDF_URL);
                  resetHighlights();
                }}
                className="w-full"
              >
                Load Sample PDF
              </Button>
            </div>

            <div className="mt-8 text-left text-sm text-muted-foreground">
              <h3 className="font-semibold mb-2 text-foreground">Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Text highlighting with comments</li>
                <li>Area selection (Alt + drag)</li>
                <li>Freetext sticky notes</li>
                <li>Image & signature embedding</li>
                <li>Freehand drawing</li>
                <li>Shape annotations (rectangle, circle, arrow)</li>
                <li>Export PDF with annotations</li>
                <li>LocalStorage persistence</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-muted/50">
      {/* Header */}
      <Header
        pdfScaleValue={pdfScaleValue}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onExportPdf={handleExportPdf}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        leftPanelOpen={leftPanelOpen}
        onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
        onChangePdf={handleChangePdf}
        onStartTour={startTour}
      />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* PDF Loader wraps both LeftPanel and PdfHighlighter */}
        <PdfLoader document={url}>
          {(pdfDocument) => (
            <>
              {/* PDF Viewer - rendered first but displayed second via order */}
              <div className="relative flex-1 overflow-hidden order-2">
                <PdfHighlighter
                  enableAreaSelection={(event) => event.altKey || areaMode}
                  areaSelectionMode={areaMode}
                  pdfDocument={pdfDocument}
                  onScrollAway={resetHash}
                  utilsRef={(_pdfHighlighterUtils) => {
                    highlighterUtilsRef.current = _pdfHighlighterUtils;
                    if (_pdfHighlighterUtils && !highlighterReady) {
                      setHighlighterReady(true);
                    }
                  }}
                  pdfScaleValue={pdfScaleValue}
                  textSelectionColor={highlightPen ? "rgba(255, 226, 143, 1)" : undefined}
                  onSelection={(highlightPen || areaMode) ? (selection) => {
                    console.log("onSelection triggered", selection);
                    addHighlight(selection.makeGhostHighlight(), "");
                    if (areaMode) setAreaMode(false);
                  } : undefined}
                  selectionTip={highlightPen ? undefined : <ExpandableTip addHighlight={addHighlight} />}
                  highlights={highlights}
                  enableFreetextCreation={() => freetextMode}
                  onFreetextClick={handleFreetextClick}
                  enableImageCreation={() => imageMode}
                  onImageClick={handleImageClick}
                  enableDrawingMode={drawingMode}
                  onDrawingComplete={handleDrawingComplete}
                  onDrawingCancel={handleDrawingCancel}
                  drawingStrokeColor={drawingStrokeColor}
                  drawingStrokeWidth={drawingStrokeWidth}
                  enableShapeMode={shapeMode}
                  onShapeComplete={handleShapeComplete}
                  onShapeCancel={handleShapeCancel}
                  shapeStrokeColor={shapeStrokeColor}
                  shapeStrokeWidth={shapeStrokeWidth}
                  theme={pdfHighlighterTheme}
                  style={{
                    height: "100%",
                  }}
                >
                  <HighlightContainer
                    editHighlight={editHighlight}
                    deleteHighlight={(id) => storeDeleteHighlight(id)}
                    onContextMenu={handleContextMenu}
                  />
                </PdfHighlighter>

                {/* Floating Actions */}
                <FloatingActions
                  highlightPen={highlightPen}
                  onToggleHighlightPen={() => setHighlightPen(!highlightPen)}
                  freetextMode={freetextMode}
                  onToggleFreetextMode={() => setFreetextMode(!freetextMode)}
                  areaMode={areaMode}
                  onToggleAreaMode={() => setAreaMode(!areaMode)}
                  onAddImage={handleAddImage}
                  onAddSignature={handleAddSignature}
                  drawingMode={drawingMode}
                  onToggleDrawingMode={() => setDrawingMode(!drawingMode)}
                  drawingStrokeColor={drawingStrokeColor}
                  onDrawingColorChange={setDrawingStrokeColor}
                  drawingStrokeWidth={drawingStrokeWidth}
                  onDrawingWidthChange={setDrawingStrokeWidth}
                  shapeMode={shapeMode}
                  onSetShapeMode={setShapeMode}
                  shapeStrokeColor={shapeStrokeColor}
                  onShapeColorChange={setShapeStrokeColor}
                  shapeStrokeWidth={shapeStrokeWidth}
                  onShapeWidthChange={setShapeStrokeWidth}
                  sidebarOpen={sidebarOpen}
                />
              </div>

              {/* Left Panel - Document Outline & Thumbnails (rendered after PdfHighlighter but displayed first via order) */}
              <LeftPanel
                pdfDocument={pdfDocument}
                isOpen={leftPanelOpen}
                onOpenChange={setLeftPanelOpen}
                width={256}
                theme={leftPanelTheme}
                showToggleButton={false}
                viewer={highlighterUtilsRef.current?.getViewer()}
                linkService={highlighterUtilsRef.current?.getLinkService()}
                eventBus={highlighterUtilsRef.current?.getEventBus()}
                onPageSelect={(pageNumber) => {
                  console.log("Navigating to page:", pageNumber);
                  highlighterUtilsRef.current?.goToPage(pageNumber);
                }}
                className="order-1"
              />
            </>
          )}
        </PdfLoader>

        {/* Right Sidebar - Highlights */}
        <Sidebar
          highlights={highlights}
          resetHighlights={resetHighlights}
          scrolledToHighlightId={scrolledToHighlightId}
          onEditHighlight={handleEditFromSidebar}
          onDeleteHighlight={(highlight: CommentedHighlight) => storeDeleteHighlight(highlight.id)}
          isOpen={sidebarOpen}
          className="order-3"
        />
      </div>

      {contextMenu && <ContextMenu {...contextMenu} />}

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* Signature pad modal */}
      <SignaturePad
        isOpen={isSignaturePadOpen}
        onComplete={handleSignatureComplete}
        onClose={() => setIsSignaturePadOpen(false)}
      />
    </div>
  );
}
