import React, { useState, useMemo } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { DarkModeToggle } from "@containers/DarkModeToggle";
import { FleetOverview } from "@containers/FleetOverview";
import { VehicleList } from "@containers/VehicleList";

export const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 960px)");

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const sidebarContent = useMemo(
    () => (
      <Box
        width={260}
        height="100vh"
        display="flex"
        flexDirection="column"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          p: 2,
          boxShadow: isMobile ? 0 : 2,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          {isMobile ? (
            <IconButton onClick={toggleDrawer}>
              <ArrowCircleLeftIcon />
            </IconButton>
          ) : (
            <Typography variant="h6">CUBONIC Fleet</Typography>
          )}
          <DarkModeToggle />
        </Box>

        <Box flex={1} overflow="auto">
          <Divider>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Overview
            </Typography>
          </Divider>
          <Box sx={{ mb: 2 }}>
            <FleetOverview />
          </Box>
          <Divider>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Vehicle List
            </Typography>
          </Divider>

          <Box>
            <VehicleList />
          </Box>
        </Box>
      </Box>
    ),
    [isMobile],
  );

  return (
    <>
      {/* Mobile: Floating Burger Menu Button */}
      {isMobile && (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "background.paper",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" margin={"auto"}>
            CUBONIC Fleet
          </Typography>
        </>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            position: isMobile ? "absolute" : "fixed",
            left: 0,
            top: 0,
            height: "100vh",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};
