import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../Sidebar/Sidebar";

/**
 * Dashboard Component
 */
export const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
    </Box>
  );
};
