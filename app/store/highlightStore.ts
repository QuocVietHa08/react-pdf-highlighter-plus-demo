import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Highlight, Content } from "react-pdf-highlighter-plus";

export interface CommentedHighlight extends Highlight {
  content: Content;
  comment?: string;
  // Freetext style properties
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontFamily?: string;
  // Text/Area highlight style properties
  highlightColor?: string;
  highlightStyle?: "highlight" | "underline" | "strikethrough";
  // Shape highlight style properties
  shapeType?: "rectangle" | "circle" | "arrow";
  strokeColor?: string;
  strokeWidth?: number;
}

interface HighlightStore {
  highlights: CommentedHighlight[];
  addHighlight: (highlight: CommentedHighlight) => void;
  updateHighlight: (id: string, updates: Partial<CommentedHighlight>) => void;
  deleteHighlight: (id: string) => void;
  resetHighlights: () => void;
}

export const useHighlightStore = create<HighlightStore>()(
  persist(
    (set) => ({
      highlights: [],
      addHighlight: (highlight) =>
        set((state) => ({
          highlights: [highlight, ...state.highlights],
        })),
      updateHighlight: (id, updates) =>
        set((state) => ({
          highlights: state.highlights.map((h) =>
            h.id === id ? { ...h, ...updates } : h
          ),
        })),
      deleteHighlight: (id) =>
        set((state) => ({
          highlights: state.highlights.filter((h) => h.id !== id),
        })),
      resetHighlights: () => set({ highlights: [] }),
    }),
    {
      name: "pdf-highlights-storage",
    }
  )
);
