import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../Sidebar/Sidebar";
import { DashboardGrid } from "@containers/DashboardGrid";

const SIDEBAR_WIDTH = 260; // Match the width from Sidebar.tsx

/**
 * Dashboard Component
 */
export const Dashboard: React.FC = () => {
  return (
    <Box display="flex" height="100vh" width={"100vw"}>
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main content should start after the sidebar */}
      <Box
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          overflow: "hidden",
        }}
      >
        <DashboardGrid />
      </Box>
    </Box>
  );
};
