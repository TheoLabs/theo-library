import { Box, Divider } from "@mui/material";
import { FilterChip } from "@components";

export function FilterChipGroup<T extends string | number>(props: {
  options: { label: string; value: T }[];
  selectedValues: T[];
  onChange: (newValues: T[]) => void;
}) {
  const { options, selectedValues, onChange } = props;

  const handleToggle = (value: T) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleReset = () => {
    onChange([]);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <FilterChip
        label="전체"
        value="ALL"
        isSelected={selectedValues.length === 0}
        onClick={handleReset}
      />
      <Divider orientation="vertical" sx={{ marginX: 2, borderWidth: 1 }} />
      {options.map((option) => (
        <FilterChip
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedValues.includes(option.value)}
          onClick={() => handleToggle(option.value)}
        />
      ))}
    </Box>
  );
}
