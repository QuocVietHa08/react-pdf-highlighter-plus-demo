import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  placeHolder?: string;
}

export function CommentForm({ onSubmit, placeHolder }: CommentFormProps) {
  const [input, setInput] = useState<string>("");

  return (
    <form
      className="flex flex-col gap-2 p-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(input);
      }}
    >
      <Textarea
        placeholder={placeHolder}
        autoFocus
        className="min-h-[80px] w-full resize-none text-sm"
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <Button type="submit" size="sm" className="w-full">
        Save
      </Button>
    </form>
  );
}
