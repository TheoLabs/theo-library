import { Box, Typography } from "@mui/material";
import { theme } from "@libs/theme";
import type React from "react";

export function ListViewHeader(props: {
  title: string;
  summary?: string;
  filterButton?: React.ReactNode;
  exportButton?: React.ReactNode;
}) {
  // 1. destructure props
  const { title, summary, filterButton, exportButton } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      sx={{
        padding: "24px 24px 32px",
        background: theme.palette.background.default,
        borderRadius: "12px 12px 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            color: theme.palette.primary.main,
            fontWeight: 800,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {summary}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "8px" }}>
        {filterButton}
        {exportButton}
      </Box>
    </Box>
  );
}
