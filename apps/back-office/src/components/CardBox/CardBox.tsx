import { Card, type SxProps, type Theme } from "@mui/material";
import type React from "react";
import { theme } from "@libs/theme";

export function CardBox(props: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  // 1. destructure props
  const { children, sx } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Card
      sx={{
        display: "flex",
        padding: "16px",
        borderRadius: "12px",
        border: `1px solid ${theme.palette.grey[100]}`,
        boxShadow: "none",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
