import {
  Box,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  type SxProps,
  type Theme,
  type SelectProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { theme } from "@libs/theme";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import React from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps<T extends FieldValues> extends Omit<
  SelectProps,
  "name" | "value" | "onChange" | "label"
> {
  label: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export function SelectField<T extends FieldValues>(props: SelectFieldProps<T>) {
  const {
    label,
    name,
    control,
    options,
    placeholder,
    required = false,
    disabled = false,
    sx,
    ...rest
  } = props;

  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", gap: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormLabel
                required={required}
                sx={{
                  marginLeft: "4px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: disabled ? "#A0A5AB" : theme.palette.primary.light,
                  "& .MuiFormLabel-asterisk": {
                    color: disabled ? "#A0A5AB" : theme.palette.error.main,
                  },
                }}
              >
                {label}
              </FormLabel>

              {error && !disabled && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.error.main,
                    fontWeight: 600,
                  }}
                >
                  *{error.message}
                </Typography>
              )}
            </Box>

            <Select
              // ✅ multiple일 때는 기본값을 []로, 아닐 때는 ""로 설정
              value={rest.multiple ? value || [] : (value ?? "")}
              onChange={onChange}
              displayEmpty={!!placeholder}
              size="small"
              IconComponent={ExpandMoreIcon}
              error={!!error && !disabled}
              disabled={disabled}
              // ✅ multiple 선택 시 ID 대신 Label을 쉼표로 연결해서 보여주도록 처리
              renderValue={
                rest.multiple
                  ? (selected) => {
                      if ((selected as any[]).length === 0 && placeholder) {
                        return (
                          <Typography
                            sx={{ color: "#8B95A1", fontSize: "16px" }}
                          >
                            {placeholder}
                          </Typography>
                        );
                      }
                      return (selected as any[])
                        .map(
                          (val) =>
                            options.find((opt) => opt.value === val)?.label,
                        )
                        .filter(Boolean)
                        .join(", ");
                    }
                  : undefined
              }
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    marginTop: "6px",
                    borderRadius: "12px",
                    border: "1px solid rgba(25, 28, 30, 0.08)",
                    boxShadow: "0px 12px 32px rgba(25, 28, 30, 0.06)",
                    padding: "4px 0",
                    "& .MuiMenuItem-root": {
                      fontSize: "14px",
                      color: "#4D5156",
                      borderRadius: "6px",
                      margin: "2px 8px",
                      padding: "8px 12px",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        backgroundColor: "#F4F6F9",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        "&:hover": {
                          backgroundColor: "#F4F6F9",
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                backgroundColor: disabled ? "#F2F4F6" : "#EBEFF5",
                borderRadius: "12px",
                transition: "all 0.2s ease-in-out",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                  borderWidth: "1px",
                },
                "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.light,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                  borderWidth: "1px",
                },
                "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.error.main,
                  borderWidth: "1px",
                },
                "&.Mui-error:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: theme.palette.error.dark,
                  },
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                },
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  paddingRight: "36px !important",
                  fontSize: "16px",
                  color: "#4D5156",
                  fontWeight: 500,
                  "&.Mui-disabled": {
                    color: "#A0A5AB",
                    WebkitTextFillColor: "#A0A5AB",
                    cursor: "not-allowed",
                  },
                },
                "& .MuiSelect-icon": {
                  color: "#8B95A1",
                  right: "8px",
                  transition: "transform 0.2s ease",
                  "&.Mui-disabled": {
                    color: "#A0A5AB",
                  },
                },
                "&.Mui-expanded .MuiSelect-icon": {
                  transform: "rotate(180deg)",
                },
                ...sx,
              }}
              {...rest}
            >
              {placeholder && !rest.multiple && (
                <MenuItem value="" disabled sx={{ display: "none" }}>
                  <Typography
                    sx={{ color: "#8B95A1", fontSize: "14px", fontWeight: 500 }}
                  >
                    {placeholder}
                  </Typography>
                </MenuItem>
              )}

              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </React.Fragment>
        )}
      />
    </Box>
  );
}
