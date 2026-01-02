# React PDF Highlighter Plus Demo

A modern, feature-rich PDF annotation demo application built with React, showcasing the capabilities of [react-pdf-highlighter-plus](https://www.npmjs.com/package/react-pdf-highlighter-plus).

## Features

- **Text Highlighting** - Select and highlight text with customizable colors
- **Area Selection** - Draw rectangular regions (Alt + drag)
- **Freetext Notes** - Draggable, editable sticky notes
- **Images & Signatures** - Upload images or draw signatures
- **Freehand Drawing** - Draw with customizable stroke color and width
- **Shape Annotations** - Add rectangles, circles, and arrows
- **PDF Export** - Export with all annotations permanently embedded
- **Dark/Light Mode** - Theme toggle with 6 color themes + PDF page inversion
- **Document Outline** - Navigate PDF using table of contents
- **Page Thumbnails** - Visual page navigation panel
- **LocalStorage Persistence** - Annotations persist across sessions

## Tech Stack

- **React 19** with React Router 7
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** (New York style) for UI components
- **Geist Font** for typography
- **Zustand** for state management
- **PDF.js** for PDF rendering
- **react-pdf-highlighter-plus** for annotation functionality

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-pdf-demo

# Install dependencies
npm install
# or
yarn install
```

### Development

Start the development server with HMR:

```bash
npm run dev
# or
yarn dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
app/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # App header with controls
│   ├── Sidebar.tsx      # Highlights sidebar (right)
│   ├── PdfViewer.tsx    # Main PDF viewer with LeftPanel
│   ├── FloatingActions.tsx  # FAB with annotation tools
│   └── ...
├── hooks/
│   └── useEffectiveTheme.ts  # Theme resolution hook
├── routes/
│   ├── home.tsx         # Landing page
│   └── pdf-demo.tsx     # PDF demo page
├── store/
│   ├── highlightStore.ts  # Highlight state management
│   └── themeStore.ts      # Theme state management
└── root.tsx             # App root with providers
```

## Usage

### Annotation Types

| Type | How to Use |
|------|------------|
| Text Highlight | Select text, click "Add highlight" |
| Area Highlight | Hold Alt + drag to select area |
| Sticky Note | Click note icon, then click on PDF |
| Image | Click image icon, select file, click to place |
| Signature | Click signature icon, draw, click to place |
| Drawing | Click pencil icon, draw on PDF |
| Shapes | Click shape icons (rectangle, circle, arrow) |

### Keyboard Shortcuts

- **Alt + Drag** - Create area highlight
- **Escape** - Exit current mode

### Theme Customization

Click the theme toggle in the header to:
- Switch between Light / Dark / System modes
- Choose from 6 color themes: Blue, Orange, Yellow, Green, Purple, Rose

## API Reference

This demo uses [react-pdf-highlighter-plus](https://github.com/QuocVietHa08/react-pdf-highlighter-plus). Key components:

```typescript
import {
  PdfLoader,
  PdfHighlighter,
  TextHighlight,
  AreaHighlight,
  usePdfHighlighterContext,
  useHighlightContainerContext,
  exportPdf,
} from "react-pdf-highlighter-plus";
```

### Context Hooks

- `usePdfHighlighterContext()` - Viewer utilities (scrollToHighlight, setTip, getCurrentSelection)
- `useHighlightContainerContext()` - Per-highlight utilities (highlight object, viewportToScaled)

## Deployment

### Docker

```bash
docker build -t react-pdf-demo .
docker run -p 3000:3000 react-pdf-demo
```

### Static Hosting

Build and deploy the `build/client` directory to any static hosting:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## Resources

- [react-pdf-highlighter-plus Documentation](https://quocvietha08.github.io/react-pdf-highlighter-plus/docs/)
- [npm Package](https://www.npmjs.com/package/react-pdf-highlighter-plus)
- [GitHub Repository](https://github.com/QuocVietHa08/react-pdf-highlighter-plus)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Changelog

### v1.1.0 (2026-01-02)

**New Features:**
- **Left Panel** - Added collapsible document panel with:
  - Document Outline tab (table of contents navigation)
  - Page Thumbnails tab (visual page navigation)
  - Click-to-navigate functionality
- **PDF Viewer Theme Integration** - Connected app theme to PDF viewer:
  - Dark mode with PDF page inversion (0.87 intensity)
  - Custom scrollbar colors matching app theme
  - Container background synced with theme
- **Dual Panel Layout** - New layout with:
  - Left Panel (Document Outline & Pages) - toggle with left button
  - Right Sidebar (Highlights) - toggle with right button
- **useEffectiveTheme Hook** - New hook to resolve "system" theme to actual light/dark

**Technical Changes:**
- Added `LeftPanel` component from react-pdf-highlighter-plus
- Added `PdfHighlighterTheme` for PDF viewer theming
- Added `leftPanelTheme` configuration matching shadcn/ui colors
- Restructured PdfViewer layout with CSS order for proper rendering
- Added viewer/linkService/eventBus integration for outline navigation

### v1.0.0 (Initial Release)

- Text highlighting with comments
- Area selection (Alt + drag)
- Freetext sticky notes
- Image & signature embedding
- Freehand drawing
- Shape annotations (rectangle, circle, arrow)
- PDF export with annotations
- Dark/Light mode with 6 color themes
- LocalStorage persistence

## License

MIT License

---

Built with [react-pdf-highlighter-plus](https://github.com/QuocVietHa08/react-pdf-highlighter-plus)
