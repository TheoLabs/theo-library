import {
  Box,
  FormLabel,
  TextField,
  type SxProps,
  type Theme,
  Typography,
} from "@mui/material";
import { theme } from "@libs/theme";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import React from "react";

export function InputField<T extends FieldValues>(props: {
  label: string;
  required?: boolean;
  placeholder?: string;
  name: Path<T>;
  disabled?: boolean;
  control: Control<T>;
  sx?: SxProps<Theme>;
}) {
  // 1. destructure props
  const {
    label,
    name,
    control,
    placeholder,
    required = false,
    sx,
    disabled,
  } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", gap: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
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
            <TextField
              {...field}
              size="small"
              placeholder={placeholder}
              error={!!error && !disabled}
              disabled={disabled}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: disabled ? "#F2F4F6" : "#EBEFF5",
                  borderRadius: "12px",
                  transition: "all 0.2s ease-in-out",

                  // 1. 기본 상태
                  "& fieldset": {
                    borderColor: "transparent",
                  },

                  // 2. 호버(Hover) 상태
                  "&:hover:not(.Mui-disabled) fieldset": {
                    borderColor: theme.palette.primary.light,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },

                  // ✅ 4. 에러(Error) 상태 - 검증 실패 시 빨간색 테두리
                  "&.Mui-error fieldset": {
                    borderColor: theme.palette.error.main,
                    borderWidth: "1px",
                  },
                  "&.Mui-error:hover fieldset": {
                    borderColor: theme.palette.error.dark, // 에러 상태에서 호버 시 조금 더 진한 빨간색
                  },
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                  },
                },

                // 텍스트 및 플레이스홀더 스타일링
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                  fontSize: "16px",
                  color: "#4D5156",
                  fontWeight: 500,
                  "&::placeholder": {
                    color: "#8B95A1",
                    opacity: 1,
                    fontSize: "14px",
                  },
                  "&.Mui-disabled": {
                    color: "#A0A5AB",
                    WebkitTextFillColor: "#A0A5AB",
                    cursor: "not-allowed",
                  },
                },

                // 에러 텍스트 스타일링 (helperText)
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "2px",
                  fontWeight: 500,
                },
                ...sx,
              }}
            />
          </React.Fragment>
        )}
      />
    </Box>
  );
}
