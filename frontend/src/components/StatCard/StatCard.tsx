import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
}) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1.2 }}>
      <CardContent sx={{ flex: 1, p: "6px !important" }}>
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
          {value}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "0.85rem", fontWeight: 500 }}
        >
          {title}
        </Typography>
      </CardContent>
      <Box sx={{ color: iconColor, pr: 1.5 }}>{icon}</Box>
    </Card>
  );
};
