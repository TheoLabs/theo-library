import { Box, Typography } from "@mui/material";
import { theme } from "@libs/theme";

export function Title(props: { title: string; summary?: string }) {
  // 1. destructure props
  const { title, summary } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "38px",
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          color: theme.palette.primary.light,
        }}
      >
        {summary}
      </Typography>
    </Box>
  );
}
