import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { toggleTheme } from "@redux/store/slices/configSlice";

export const DarkModeToggle: React.FC = () => {
  const theme = useSelector((state: RootState) => state.config.theme);
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
