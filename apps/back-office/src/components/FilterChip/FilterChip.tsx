import { Chip } from "@mui/material";
import { theme } from "@libs/theme";

export function FilterChip(props: {
  label: any;
  value: any;
  isSelected: boolean;
  onClick: () => void;
  viewMode?: boolean;
  onDelete?: () => void;
}) {
  // 1. destructure props
  const { label, value, isSelected, onClick, viewMode, onDelete } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const isActive = viewMode || isSelected;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Chip
      key={value}
      label={label}
      onClick={viewMode ? undefined : onClick}
      onDelete={viewMode ? onDelete : undefined}
      clickable={!viewMode}
      sx={{
        borderRadius: "8px",
        fontWeight: isActive ? 700 : 500,
        backgroundColor: isActive
          ? theme.palette.primary.main
          : theme.palette.grey[100],
        color: isActive ? "#fff" : theme.palette.text.secondary,
        border: `1px solid ${
          isActive ? theme.palette.primary.main : "transparent"
        }`,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isSelected ? theme.palette.primary.main : "#EBEFF5",
        },
        "& .MuiChip-deleteIcon": {
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "18px",
          "&:hover": {
            color: "#fff",
          },
        },
      }}
    />
  );
}
