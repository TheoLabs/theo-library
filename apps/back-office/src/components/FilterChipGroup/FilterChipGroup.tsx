import { Box, Divider, Typography } from "@mui/material";
import { FilterChip } from "@components";

export function FilterChipGroup<T extends string | number>(props: {
  options: { label: string; value: T }[];
  selectedValues: T[];
  onChange: (newValues: T[]) => void;
  viewMode?: boolean;
  category?: string;
}) {
  // 1. destructure props
  const { options, selectedValues, onChange, viewMode, category } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const displayOptions = viewMode
    ? options.filter((opt) => selectedValues.includes(opt.value))
    : options;

  // 7. effect hooks
  // 8. handlers
  const handleToggle = (value: T) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };
  const handleRemove = (value: T) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  // 9. render
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {!viewMode ? (
        <FilterChip
          label="전체"
          value="ALL"
          isSelected={selectedValues.length === 0}
          onClick={() => onChange([])}
        />
      ) : (
        selectedValues.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              {category}
            </Typography>
            <Divider
              orientation="vertical"
              sx={{ marginX: 2, borderWidth: 1 }}
            />
          </Box>
        )
      )}
      {!viewMode && (
        <Divider orientation="vertical" sx={{ marginX: 2, borderWidth: 1 }} />
      )}
      {displayOptions.map((option) => (
        <FilterChip
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedValues.includes(option.value)}
          onClick={() => handleToggle(option.value)}
          onDelete={viewMode ? () => handleRemove(option.value) : undefined}
          viewMode={viewMode}
        />
      ))}
    </Box>
  );
}
