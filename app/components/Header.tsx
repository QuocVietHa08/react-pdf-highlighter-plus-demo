import { Download, Minus, PanelLeftClose, PanelLeft, Plus, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ThemeToggle } from "./ui/theme-toggle";

interface HeaderProps {
  pdfScaleValue: number | undefined;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportPdf: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onChangePdf?: () => void;
}

export function Header({
  pdfScaleValue,
  onZoomIn,
  onZoomOut,
  onExportPdf,
  sidebarOpen,
  onToggleSidebar,
  onChangePdf,
}: HeaderProps) {
  const displayZoom = pdfScaleValue
    ? `${Math.round(pdfScaleValue * 100)}%`
    : "Auto";

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-14 items-center justify-between border-b bg-background px-4">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="h-8 w-8">
                {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">PDF</span>
            </div>
            <span className="text-sm font-semibold">Highlighter</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {onChangePdf && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onChangePdf}>
                    <Upload className="h-4 w-4 mr-1" />
                    Change PDF
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload a different PDF</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6" />
            </>
          )}

          {/* Zoom controls */}
          <div className="flex items-center rounded-md border bg-muted/50">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onZoomOut} className="h-8 w-8 rounded-r-none">
                  <Minus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
            <span className="flex items-center justify-center px-3 text-sm font-medium min-w-[52px] border-x">
              {displayZoom}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onZoomIn} className="h-8 w-8 rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Theme toggle */}
          <ThemeToggle />

          <Separator orientation="vertical" className="h-6" />

          {/* Export button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onExportPdf}>
                <Download className="h-4 w-4 mr-1" />
                Export PDF
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export PDF with annotations</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
