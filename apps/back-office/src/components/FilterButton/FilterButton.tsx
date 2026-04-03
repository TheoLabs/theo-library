import { Button, Typography } from "@mui/material";
import { theme } from "@libs/theme";
import FilterListIcon from "@mui/icons-material/FilterList";

export function FilterButton() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Button
      sx={{
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.grey[100]}`,
        padding: "8px 16px",
      }}
    >
      <FilterListIcon
        fontSize="small"
        sx={{
          color: theme.palette.primary.light,
          marginRight: "8px",
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: theme.palette.primary.light,
        }}
      >
        필터
      </Typography>
    </Button>
  );
}
