import { Paper, Box, IconButton, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface PanelConfig {
  id: string;
  title: string;
  component: React.ReactNode;
  layout: Omit<Layout, "i">;
}

export interface PanelsGridProps {
  panels: PanelConfig[];
  onLayoutChange: (updatedPanels: PanelConfig[]) => void;
  cols?: { [P: string]: number } | undefined;
  breakpoints?: { [P: string]: number } | undefined;
  rowHeight?: number;
}

export const PanelsGrid: React.FC<PanelsGridProps> = ({
  panels,
  onLayoutChange,
  cols,
  breakpoints,
  rowHeight,
}) => {
  const handleDragStop = (newLayout: Layout[]) => {
    const updatedPanels = panels.map((panel) => {
      const updatedLayout = newLayout.find((l) => l.i === panel.id);
      return updatedLayout ? { ...panel, layout: updatedLayout } : panel;
    });
    onLayoutChange(updatedPanels);
  };

  const mappedLayouts = panels.map(({ id, layout }) => ({ i: id, ...layout }));

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: mappedLayouts, md: mappedLayouts, sm: mappedLayouts }}
        breakpoints={breakpoints ?? { lg: 1024, md: 700, sm: 480 }}
        cols={cols ?? { lg: 2, md: 2, sm: 1 }}
        rowHeight={rowHeight ?? 400}
        onDragStop={handleDragStop} // Updates only after dragging stops
        isResizable={false}
        isDraggable
        draggableHandle=".drag-handle"
      >
        {panels.map(({ id, title, component }) => (
          <Paper
            key={id}
            elevation={3}
            sx={{
              p: 2,
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Title and Drag Handle */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <IconButton className="drag-handle" sx={{ cursor: "grab" }}>
                <DragIndicatorIcon />
              </IconButton>
            </Box>

            {/* Component Container that takes remaining height */}
            <Box sx={{ flexGrow: 1, height: "100%" }}>{component}</Box>
          </Paper>
        ))}
      </ResponsiveGridLayout>
    </Box>
  );
};
