import { Chip } from "@mui/material";
import { theme } from "@libs/theme";

export function FilterChip(props: {
  label: any;
  value: any;
  isSelected: boolean;
  onClick: () => void;
}) {
  // 1. destructure props
  const { label, value, isSelected, onClick } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Chip
      key={value}
      label={label}
      onClick={onClick}
      clickable
      sx={{
        borderRadius: "8px",
        fontWeight: isSelected ? 700 : 500,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.grey[100],
        color: isSelected ? "#fff" : theme.palette.text.secondary,
        border: `1px solid ${
          isSelected ? theme.palette.primary.main : "transparent"
        }`,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isSelected ? theme.palette.primary.main : "#EBEFF5",
        },
      }}
    />
  );
}
