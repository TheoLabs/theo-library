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
  disabled?: boolean; // ✅ disabled 속성 명시
  sx?: SxProps<Theme>;
}

export function SelectField<T extends FieldValues>(props: SelectFieldProps<T>) {
  // 1. destructure props
  const {
    label,
    name,
    control,
    options,
    placeholder,
    required = false,
    disabled = false, // ✅ 기본값 설정
    sx,
    ...rest
  } = props;

  // 9. render
  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", gap: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <React.Fragment>
            {/* 라벨 및 에러 메시지 영역 */}
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
                  // ✅ 비활성화 시 라벨 색상 톤다운
                  color: disabled ? "#A0A5AB" : theme.palette.primary.light,
                  "& .MuiFormLabel-asterisk": {
                    color: disabled ? "#A0A5AB" : theme.palette.error.main,
                  },
                }}
              >
                {label}
              </FormLabel>

              {/* ✅ 비활성화 상태일 때는 에러 메시지 숨김 */}
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

            {/* Select 컴포넌트 영역 */}
            <Select
              value={value ?? ""}
              onChange={onChange}
              displayEmpty={!!placeholder}
              size="small"
              IconComponent={ExpandMoreIcon}
              error={!!error && !disabled}
              disabled={disabled} // ✅ Select에 disabled 전달
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
                // ✅ 비활성화 시 배경색을 약간 더 죽은 회색으로 변경
                backgroundColor: disabled ? "#F2F4F6" : "#EBEFF5",
                borderRadius: "12px",
                transition: "all 0.2s ease-in-out",

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                  borderWidth: "1px",
                },

                // ✅ 2. 호버(Hover) 상태 (disabled가 아닐 때만 적용)
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

                // ✅ 비활성화 시 마우스 커서 전체 영역 변경
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                },

                // 텍스트 패딩 및 스타일
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  paddingRight: "36px !important", // 아이콘 공간 확보
                  fontSize: "16px",
                  color: "#4D5156",
                  fontWeight: 500,

                  // ✅ 비활성화 시 텍스트 색상 및 커서
                  "&.Mui-disabled": {
                    color: "#A0A5AB",
                    WebkitTextFillColor: "#A0A5AB", // Safari 호환성
                    cursor: "not-allowed",
                  },
                },

                // 우측 드롭다운 아이콘
                "& .MuiSelect-icon": {
                  color: "#8B95A1",
                  right: "8px",
                  transition: "transform 0.2s ease",
                  // ✅ 비활성화 시 아이콘 색상 톤다운
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
              {/* placeholder 렌더링 로직 */}
              {placeholder && (
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
