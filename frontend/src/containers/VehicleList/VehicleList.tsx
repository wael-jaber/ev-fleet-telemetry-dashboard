import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import {
  selectFilteredVehicles,
  setSelectedVehicle,
} from "@redux/store/slices/telemetrySlice";

export const VehicleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicles = useSelector(selectFilteredVehicles);
  const selectedVehicle = useSelector(
    (state: RootState) => state.telemetry.selectedVehicleId,
  );

  const handleAllClick = () => {
    dispatch(setSelectedVehicle("all"));
  };
  const handleClick = (id: string) => {
    dispatch(setSelectedVehicle(id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <List component="nav" sx={{ overflowY: "auto", maxHeight: "50vh" }}>
        {/* "All Vehicles" with Filter Button Inside */}
        <ListItemButton
          selected={selectedVehicle === "all"}
          onClick={handleAllClick}
        >
          <Grid container alignItems="center">
            {/* Car Icon + "All Vehicles" Text */}
            <Grid item xs={10} display="flex" alignItems="center">
              <DirectionsCarIcon sx={{ mr: 1 }} />
              <ListItemText primary="All Vehicles" />
            </Grid>

            {/* Embedded Filter Button */}
            <Grid item xs={2} display="flex" justifyContent="flex-end">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering "All Vehicles" selection
                  alert("Filter modal coming soon!");
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemButton>

        {/* Individual Vehicles */}
        {vehicles.sort().map((vehicle) => (
          <ListItemButton
            key={vehicle}
            selected={selectedVehicle === vehicle}
            onClick={() => handleClick(vehicle)}
          >
            <DirectionsCarIcon sx={{ mr: 1 }} />
            <ListItemText primary={vehicle} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
