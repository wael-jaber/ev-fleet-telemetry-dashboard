import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxisProps,
  YAxisProps,
  TooltipProps,
} from "recharts";
import { Typography, Paper, Box } from "@mui/material";
import { useState, useMemo, useRef } from "react";

export interface ScatterGridChartProps {
  title: string;
  data: { x: number; y: number }[]; // x is timestamp, y is the value
  maxVisiblePoints?: number;
  pointColor?: string;
  xAxisProps?: Partial<XAxisProps>; // Exposed X-Axis props
  yAxisProps?: Partial<YAxisProps>; // Exposed Y-Axis props
  tooltipProps?: Partial<TooltipProps<number, string>>; // Exposed Tooltip props
}

/**
 * A fully **customizable scatter grid chart**.
 * - Supports **dragging via touch & mouse**
 * - Limits **view to a customizable number of points**
 * - **Prevents infinite right scrolling**
 * - **Exposes tooltip & axis customization**
 */
export const ScatterGridChart: React.FC<ScatterGridChartProps> = ({
  title,
  data,
  maxVisiblePoints = 5,
  pointColor = "#8884d8",
  xAxisProps = {},
  yAxisProps = {},
  tooltipProps = {},
}) => {
  const [offset, setOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollSpeed = 5; // Adjust scroll sensitivity

  // Sort data in ascending order of X (timestamp)
  const sortedData = useMemo(() => data.sort((a, b) => a.x - b.x), [data]);

  // Ensure we only see the last `maxVisiblePoints` initially
  const lastIndex = sortedData.length - 1;
  const firstVisibleIndex = Math.max(0, lastIndex - maxVisiblePoints + 1);

  // Slice the visible data properly
  const visibleData = useMemo(
    () =>
      sortedData.slice(
        Math.max(0, firstVisibleIndex - offset),
        Math.min(lastIndex + 1, firstVisibleIndex - offset + maxVisiblePoints),
      ),
    [sortedData, offset, maxVisiblePoints],
  );

  /**
   * Handles dragging via touch or mouse
   */
  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current =
      "touches" in event
        ? event.touches[0].clientX
        : (event as React.MouseEvent).clientX;
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;

    const currentX =
      "touches" in event
        ? event.touches[0].clientX
        : (event as React.MouseEvent).clientX;
    const deltaX = (startX.current - currentX) / scrollSpeed;

    if (Math.abs(deltaX) > 5) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + (deltaX > 0 ? 1 : -1);

        // Ensure the rightmost limit is the latest data point
        return Math.max(
          0,
          Math.min(newOffset, lastIndex - maxVisiblePoints + 1),
        );
      });

      startX.current = currentX; // Reset starting position
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        cursor: isDragging.current ? "grabbing" : "grab", // Show grab cursor
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <Typography variant="h6" gutterBottom>
        {title} <span style={{ fontSize: "0.8em", color: "gray" }}>(CET)</span>
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            {/* Grid for better visualization */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* X-axis (Customizable) */}
            <XAxis {...xAxisProps} />

            {/* Y-axis (Customizable) */}
            <YAxis {...yAxisProps} />

            {/* Tooltip (Customizable) */}
            <Tooltip {...tooltipProps} />

            {/* Scatter plot */}
            <Scatter name="Telemetry" data={visibleData} fill={pointColor} />
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};
