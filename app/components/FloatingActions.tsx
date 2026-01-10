import { useState, useEffect } from "react";
import {
  Plus,
  X,
  Highlighter,
  StickyNote,
  Image,
  PenTool,
  Pencil,
  Square,
  Circle,
  ArrowRight,
  RectangleHorizontal,
  MousePointer2,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Slider } from "./ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ShapeType = "rectangle" | "circle" | "arrow";

interface FloatingActionsProps {
  highlightPen: boolean;
  onToggleHighlightPen: () => void;
  freetextMode: boolean;
  onToggleFreetextMode: () => void;
  areaMode: boolean;
  onToggleAreaMode: () => void;
  onAddImage: () => void;
  onAddSignature: () => void;
  drawingMode: boolean;
  onToggleDrawingMode: () => void;
  drawingStrokeColor: string;
  onDrawingColorChange: (color: string) => void;
  drawingStrokeWidth: number;
  onDrawingWidthChange: (width: number) => void;
  shapeMode: ShapeType | null;
  onSetShapeMode: (mode: ShapeType | null) => void;
  shapeStrokeColor: string;
  onShapeColorChange: (color: string) => void;
  shapeStrokeWidth: number;
  onShapeWidthChange: (width: number) => void;
  sidebarOpen?: boolean;
  onExitAllModes: () => void;
}

const colorOptions = [
  "#000000",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
];

const FAB_USED_KEY = "pdf-highlighter-fab-used";

export function FloatingActions({
  highlightPen,
  onToggleHighlightPen,
  freetextMode,
  onToggleFreetextMode,
  areaMode,
  onToggleAreaMode,
  onAddImage,
  onAddSignature,
  drawingMode,
  onToggleDrawingMode,
  drawingStrokeColor,
  onDrawingColorChange,
  drawingStrokeWidth,
  onDrawingWidthChange,
  shapeMode,
  onSetShapeMode,
  shapeStrokeColor,
  onShapeColorChange,
  shapeStrokeWidth,
  onShapeWidthChange,
  sidebarOpen = false,
  onExitAllModes,
}: FloatingActionsProps) {
  // Initialize isOpen based on first-time user status (open by default for new users)
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(FAB_USED_KEY);
  });
  const [showPulse, setShowPulse] = useState(false);

  // Check if user has used FAB before (for pulse animation)
  useEffect(() => {
    const hasUsed = localStorage.getItem(FAB_USED_KEY);
    if (!hasUsed) {
      setShowPulse(true);
    }
  }, []);

  const handleFabClick = () => {
    setIsOpen(!isOpen);
    if (showPulse) {
      setShowPulse(false);
      localStorage.setItem(FAB_USED_KEY, "true");
    }
  };

  const isAnyModeActive = highlightPen || freetextMode || areaMode || drawingMode || !!shapeMode;

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed bottom-6 z-50 flex flex-col-reverse items-end gap-3 transition-all duration-300",
          sidebarOpen ? "right-[21.5rem]" : "right-6"
        )}
      >
        {/* Drawing options panel - shown when drawing mode is active */}
        {drawingMode && (
          <Card className="shadow-lg mb-2">
            <CardContent className="p-3 space-y-3">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Color</p>
                <div className="flex gap-1">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                        drawingStrokeColor === color
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => onDrawingColorChange(color)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Width: {drawingStrokeWidth}px
                </p>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[drawingStrokeWidth]}
                  onValueChange={(value) => onDrawingWidthChange(value[0])}
                  className="w-40"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shape options panel - shown when shape mode is active */}
        {shapeMode && (
          <Card className="shadow-lg mb-2">
            <CardContent className="p-3 space-y-3">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Shape: {shapeMode.charAt(0).toUpperCase() + shapeMode.slice(1)}
                </p>
                <div className="flex gap-1">
                  <Button
                    variant={shapeMode === "rectangle" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onSetShapeMode("rectangle")}
                  >
                    <RectangleHorizontal className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={shapeMode === "circle" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onSetShapeMode("circle")}
                  >
                    <Circle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={shapeMode === "arrow" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onSetShapeMode("arrow")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Color</p>
                <div className="flex gap-1">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                        shapeStrokeColor === color
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => onShapeColorChange(color)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Width: {shapeStrokeWidth}px
                </p>
                <Slider
                  min={1}
                  max={6}
                  step={1}
                  value={[shapeStrokeWidth]}
                  onValueChange={(value) => onShapeWidthChange(value[0])}
                  className="w-40"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action buttons - shown when FAB is open */}
        {isOpen && (
          <div className="flex flex-col-reverse gap-2">
            {/* Cursor/Select - Exit all modes */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={!isAnyModeActive ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onExitAllModes();
                    setIsOpen(false);
                  }}
                >
                  <MousePointer2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Select (exit annotation mode)
              </TooltipContent>
            </Tooltip>

            {/* Highlight Pen */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={highlightPen ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onToggleHighlightPen();
                    if (!highlightPen) setIsOpen(false);
                  }}
                >
                  <Highlighter className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {highlightPen ? "Exit highlight mode" : "Highlight pen"}
              </TooltipContent>
            </Tooltip>

            {/* Add Note */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={freetextMode ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onToggleFreetextMode();
                    if (!freetextMode) setIsOpen(false);
                  }}
                >
                  <StickyNote className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {freetextMode ? "Exit note mode" : "Add note"}
              </TooltipContent>
            </Tooltip>

            {/* Area Highlight */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={areaMode ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onToggleAreaMode();
                    if (!areaMode) setIsOpen(false);
                  }}
                >
                  <Square className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {areaMode ? "Exit area mode" : "Area highlight"}
              </TooltipContent>
            </Tooltip>

            {/* Add Image */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onAddImage();
                    setIsOpen(false);
                  }}
                >
                  <Image className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Add image</TooltipContent>
            </Tooltip>

            {/* Add Signature */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onAddSignature();
                    setIsOpen(false);
                  }}
                >
                  <PenTool className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Add signature</TooltipContent>
            </Tooltip>

            {/* Drawing Mode */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={drawingMode ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onToggleDrawingMode();
                    if (!drawingMode) setIsOpen(false);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {drawingMode ? "Exit drawing mode" : "Draw"}
              </TooltipContent>
            </Tooltip>

            {/* Shape Mode - Rectangle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={shapeMode === "rectangle" ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onSetShapeMode(shapeMode === "rectangle" ? null : "rectangle");
                    if (shapeMode !== "rectangle") setIsOpen(false);
                  }}
                >
                  <RectangleHorizontal className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {shapeMode === "rectangle" ? "Exit rectangle mode" : "Draw rectangle"}
              </TooltipContent>
            </Tooltip>

            {/* Shape Mode - Circle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={shapeMode === "circle" ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onSetShapeMode(shapeMode === "circle" ? null : "circle");
                    if (shapeMode !== "circle") setIsOpen(false);
                  }}
                >
                  <Circle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {shapeMode === "circle" ? "Exit circle mode" : "Draw circle"}
              </TooltipContent>
            </Tooltip>

            {/* Shape Mode - Arrow */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={shapeMode === "arrow" ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-md"
                  onClick={() => {
                    onSetShapeMode(shapeMode === "arrow" ? null : "arrow");
                    if (shapeMode !== "arrow") setIsOpen(false);
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {shapeMode === "arrow" ? "Exit arrow mode" : "Draw arrow"}
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* Main FAB button */}
        <Button
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all",
            isOpen && "rotate-45",
            !isAnyModeActive && "bg-foreground text-background hover:bg-foreground/90",
            showPulse && !isOpen && "animate-pulse-ring"
          )}
          variant={isAnyModeActive ? "default" : "default"}
          onClick={handleFabClick}
          data-tour="fab-button"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>
    </TooltipProvider>
  );
}
