import {
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Box,
  Typography,
  Paper,
} from "@mui/material";

export interface BatteryListProps {
  data: { label: string; value: number }[];
}

/**
 * A **reusable battery list** component.
 * - Displays **labels & battery progress bars**.
 * - Supports **any dataset** in `{ label, value }` format.
 */
export const BatteryList: React.FC<BatteryListProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          No data available.
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {data.map(({ label, value }) => (
        <ListItem
          key={label}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            primary={label}
            primaryTypographyProps={{ fontWeight: "bold" }}
          />
          <Box sx={{ width: "100%" }}>
            <Typography variant="body2">{value.toFixed(1)}%</Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#ddd",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    value > 50 ? "green" : value > 20 ? "orange" : "red",
                },
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
