import { useEffect, useRef, useCallback } from "react";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_COMPLETED_KEY = "pdf-highlighter-tour-completed";

export function useTour() {
  const driverRef = useRef<Driver | null>(null);

  const startTour = useCallback(() => {
    // Initialize driver with steps
    driverRef.current = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayColor: "rgba(0, 0, 0, 0.75)",
      steps: [
        {
          element: "[data-tour='fab-button']",
          popover: {
            title: "Annotation Tools",
            description:
              "Click here to access all annotation tools: highlights, notes, drawings, shapes, and more!",
            side: "left",
            align: "center",
          },
        },
        {
          element: "[data-tour='zoom-controls']",
          popover: {
            title: "Zoom Controls",
            description: "Adjust the PDF zoom level for comfortable viewing.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "[data-tour='left-panel-toggle']",
          popover: {
            title: "Document Navigation",
            description:
              "Access the document outline and page thumbnails for quick navigation.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "[data-tour='sidebar-toggle']",
          popover: {
            title: "Highlights Panel",
            description:
              "View and manage all your annotations. Click any highlight to jump to it.",
            side: "bottom",
            align: "end",
          },
        },
        {
          element: "[data-tour='export-button']",
          popover: {
            title: "Export PDF",
            description:
              "When you're done, export your annotated PDF with all highlights preserved!",
            side: "bottom",
            align: "end",
          },
        },
      ],
      onDestroyStarted: () => {
        localStorage.setItem(TOUR_COMPLETED_KEY, "true");
        driverRef.current?.destroy();
      },
    });

    driverRef.current.drive();
  }, []);

  const hasCompletedTour = useCallback(() => {
    return localStorage.getItem(TOUR_COMPLETED_KEY) === "true";
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      driverRef.current?.destroy();
    };
  }, []);

  return { startTour, hasCompletedTour };
}
