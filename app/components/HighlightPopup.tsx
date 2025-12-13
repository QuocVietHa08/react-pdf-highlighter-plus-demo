import type { ViewportHighlight } from "react-pdf-highlighter-plus";
import { type CommentedHighlight } from "~/store/highlightStore";
import { Card, CardContent } from "./ui/card";

interface HighlightPopupProps {
  highlight: ViewportHighlight<CommentedHighlight>;
}

export function HighlightPopup({ highlight }: HighlightPopupProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-3 text-sm">
        {highlight.comment || "No comment"}
      </CardContent>
    </Card>
  );
}
