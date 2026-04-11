import { Card, type SxProps, type Theme } from "@mui/material";
import type React from "react";
import { theme } from "@libs/theme";

export function CardBox(props: {
  children: React.ReactNode;
  verticalLine?: boolean;
  sx?: SxProps<Theme>;
}) {
  const { children, verticalLine = false, sx } = props;

  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        padding: "16px 16px 16px 20px",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.grey[100]}`,
        ...(verticalLine && {
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: theme.palette.primary.dark,
            borderRadius: "12px 0 0 12px",
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
