import { useLayoutEffect, useRef, useState } from "react";
import { CommentForm } from "./CommentForm";
import {
  type GhostHighlight,
  type PdfSelection,
  usePdfHighlighterContext,
} from "react-pdf-highlighter-plus";
import { Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ExpandableTipProps {
  addHighlight: (highlight: GhostHighlight, comment: string) => void;
}

export function ExpandableTip({ addHighlight }: ExpandableTipProps) {
  const [compact, setCompact] = useState(true);
  const selectionRef = useRef<PdfSelection | null>(null);

  const {
    getCurrentSelection,
    removeGhostHighlight,
    setTip,
    updateTipPosition,
  } = usePdfHighlighterContext();

  useLayoutEffect(() => {
    updateTipPosition!();
  }, [compact, updateTipPosition]);

  return (
    <Card className="shadow-lg">
      <CardContent className="p-1">
        {compact ? (
          <Button
            size="sm"
            onClick={() => {
              setCompact(false);
              selectionRef.current = getCurrentSelection();
              selectionRef.current!.makeGhostHighlight();
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add highlight
          </Button>
        ) : (
          <CommentForm
            placeHolder="Your comment..."
            onSubmit={(input) => {
              addHighlight(
                {
                  content: selectionRef.current!.content,
                  type: selectionRef.current!.type,
                  position: selectionRef.current!.position,
                },
                input,
              );

              removeGhostHighlight();
              setTip(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
