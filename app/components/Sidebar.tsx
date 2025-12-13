import { useMemo, useState } from "react";
import type { Highlight } from "react-pdf-highlighter-plus";
import { type CommentedHighlight } from "~/store/highlightStore";
import {
  FileText,
  RefreshCw,
  Trash2,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface SidebarProps {
  highlights: Array<CommentedHighlight>;
  resetHighlights: () => void;
  scrolledToHighlightId: string | null;
  onEditHighlight: (highlight: CommentedHighlight) => void;
  onDeleteHighlight: (highlight: CommentedHighlight) => void;
  isOpen: boolean;
}

const updateHash = (highlight: Highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

const getHighlightTypeLabel = (type: string) => {
  switch (type) {
    case "text":
      return "Text";
    case "area":
      return "Area";
    case "freetext":
      return "Note";
    case "image":
      return "Image";
    case "drawing":
      return "Drawing";
    case "shape":
      return "Shape";
    default:
      return type;
  }
};

const getHighlightTypeBadgeVariant = (type: string): "highlight" | "area" | "note" | "image" | "drawing" | "shape" | "default" => {
  switch (type) {
    case "text":
      return "highlight";
    case "area":
      return "area";
    case "freetext":
      return "note";
    case "image":
      return "image";
    case "drawing":
      return "drawing";
    case "shape":
      return "shape";
    default:
      return "default";
  }
};

export function Sidebar({
  highlights,
  resetHighlights,
  scrolledToHighlightId,
  onEditHighlight,
  onDeleteHighlight,
  isOpen,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set());

  // Filter highlights
  const filteredHighlights = useMemo(() => {
    if (!searchQuery) return highlights;

    const query = searchQuery.toLowerCase();
    return highlights.filter(
      (h) =>
        h.content?.text?.toLowerCase().includes(query) ||
        h.comment?.toLowerCase().includes(query)
    );
  }, [highlights, searchQuery]);

  // Group highlights by page
  const highlightsByPage = useMemo(() => {
    const groups: Record<number, CommentedHighlight[]> = {};
    filteredHighlights.forEach((highlight) => {
      const page = highlight.position.boundingRect.pageNumber;
      if (!groups[page]) {
        groups[page] = [];
      }
      groups[page].push(highlight);
    });
    return groups;
  }, [filteredHighlights]);

  const pageNumbers = Object.keys(highlightsByPage)
    .map(Number)
    .sort((a, b) => a - b);

  const togglePage = (pageNumber: number) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(pageNumber)) {
      newExpanded.delete(pageNumber);
    } else {
      newExpanded.add(pageNumber);
    }
    setExpandedPages(newExpanded);
  };

  // Expand all pages by default
  useMemo(() => {
    if (pageNumbers.length > 0 && expandedPages.size === 0) {
      setExpandedPages(new Set(pageNumbers));
    }
  }, [pageNumbers]);

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-80" : "w-0 overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Highlights</h2>
            <p className="text-xs text-muted-foreground">
              {highlights.length} annotation{highlights.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 border-b p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search highlights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8 h-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Highlights list */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {pageNumbers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="mb-2 h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                {highlights.length === 0
                  ? "No highlights yet"
                  : "No matching highlights"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                {highlights.length === 0
                  ? "Select text or use the + button to add annotations"
                  : "Try adjusting your search"}
              </p>
            </div>
          ) : (
            pageNumbers.map((pageNumber) => (
              <Collapsible
                key={pageNumber}
                open={expandedPages.has(pageNumber)}
                onOpenChange={() => togglePage(pageNumber)}
                className="mb-2"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-3 py-2 text-sm font-medium hover:bg-muted/80">
                  <span>Page {pageNumber}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {highlightsByPage[pageNumber].length}
                    </Badge>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      expandedPages.has(pageNumber) && "rotate-180"
                    )} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-1 pt-1">
                  <div className="space-y-1">
                    {highlightsByPage[pageNumber].map((highlight) => (
                      <Card
                        key={highlight.id}
                        onClick={() => updateHash(highlight)}
                        className={cn(
                          "cursor-pointer transition-colors group",
                          scrolledToHighlightId === highlight.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={getHighlightTypeBadgeVariant(highlight.type || "area")} className="text-xs">
                                  {getHighlightTypeLabel(highlight.type || "area")}
                                </Badge>
                              </div>
                              {highlight.content?.text && (
                                <p className="text-sm line-clamp-2">
                                  "{highlight.content.text.slice(0, 80)}
                                  {highlight.content.text.length > 80 ? "..." : ""}"
                                </p>
                              )}
                              {highlight.comment && (
                                <p className="text-xs text-muted-foreground mt-1 italic line-clamp-1">
                                  {highlight.comment}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteHighlight(highlight);
                              }}
                              title="Delete highlight"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer actions */}
      {highlights.length > 0 && (
        <div className="flex-shrink-0 border-t p-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={resetHighlights}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear All Highlights
          </Button>
        </div>
      )}
    </div>
  );
}
