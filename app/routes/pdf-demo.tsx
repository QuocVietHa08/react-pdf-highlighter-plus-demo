import { lazy, Suspense } from "react";
import type { Route } from "./+types/pdf-demo";
import { ClientOnly } from "~/components/ClientOnly";

const PdfViewer = lazy(() =>
  import("~/components/PdfViewer").then((mod) => ({ default: mod.PdfViewer }))
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PDF Highlighter Demo" },
    { name: "description", content: "PDF viewer with highlighting capabilities" },
  ];
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg">Loading PDF Viewer...</div>
    </div>
  );
}

export default function PdfDemo() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <Suspense fallback={<LoadingFallback />}>
        <PdfViewer />
      </Suspense>
    </ClientOnly>
  );
}
