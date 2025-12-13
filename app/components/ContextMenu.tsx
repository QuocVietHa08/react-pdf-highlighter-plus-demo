import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export interface ContextMenuProps {
  xPos: number;
  yPos: number;
  editComment: () => void;
  deleteHighlight: () => void;
}

export function ContextMenu({
  xPos,
  yPos,
  editComment,
  deleteHighlight,
}: ContextMenuProps) {
  return (
    <Card
      className="fixed z-50 w-44 shadow-lg"
      style={{ top: yPos + 2, left: xPos + 2 }}
    >
      <CardContent className="p-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={editComment}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Comment
        </Button>
        <Separator className="my-1" />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={deleteHighlight}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
