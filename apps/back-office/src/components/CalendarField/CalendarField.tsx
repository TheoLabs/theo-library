import {
  Box,
  FormLabel,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import React from "react";
import { theme } from "@libs/theme";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface CalendarFieldProps<T extends FieldValues> extends Omit<
  DatePickerProps,
  "value" | "onChange" | "label" | "name"
> {
  label?: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  clearable?: boolean;
  sx?: SxProps<Theme>;
}

export function CalendarField<T extends FieldValues>(
  props: CalendarFieldProps<T>,
) {
  const {
    label,
    name,
    control,
    required = false,
    placeholder = "YYYY-MM-DD",
    clearable = true,
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
        render={({
          field: { onChange, value, ref, onBlur },
          fieldState: { error },
        }) => {
          const dateValue = value ? dayjs(value) : null;

          return (
            <React.Fragment>
              {/* 라벨 영역 */}
              {(label || error) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {label && (
                    <FormLabel
                      required={required}
                      sx={{
                        marginLeft: "4px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#202124", // 라벨 색상도 조금 더 진하게 조정
                        "& .MuiFormLabel-asterisk": {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      {label}
                    </FormLabel>
                  )}
                  {error && (
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
              )}

              <DatePicker
                {...rest}
                inputRef={ref}
                format="YYYY-MM-DD"
                value={dateValue}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue && newValue.isValid()) {
                    onChange(newValue.format("YYYY-MM-DD"));
                  } else {
                    onChange(undefined);
                  }
                }}
                slotProps={{
                  desktopPaper: {
                    sx: {
                      borderRadius: "16px",
                      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                      marginTop: "8px",
                      padding: "8px",
                    },
                  },
                  // 2. 하단 액션바(초기화 버튼 영역) 패딩 추가
                  actionBar: {
                    actions: ["clear"],
                    sx: {
                      padding: "12px 16px", // 버튼이 경계에 붙지 않도록 여백 추가
                      "& .MuiButton-root": {
                        borderRadius: "8px",
                        fontWeight: "bold",
                        // 초기화 버튼 색상이 너무 튀면 여기서 조정 가능합니다.
                      },
                    },
                  },
                  // 3. 날짜 숫자 색상을 검정색으로 변경
                  day: {
                    sx: {
                      color: "#000000", // 기본 날짜 색상 검정
                      fontWeight: 500,
                      "&.Mui-selected": {
                        color: "#FFFFFF", // 선택된 날짜는 흰색 유지
                      },
                    },
                  },
                  // 4. 입력 필드 디자인 수정
                  textField: {
                    size: "small",
                    error: !!error,
                    onBlur,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#EBEFF5",
                        borderRadius: "12px",
                        transition: "all 0.2s ease-in-out",
                        // 날짜 텍스트 색상 검정
                        "& input": { color: "#000000" },
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.light,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                          borderWidth: "1.5px",
                        },
                      },
                      ...sx,
                    },
                  },
                  // 요일 헤더 색상 등 추가 조정
                  calendarHeader: {
                    sx: {
                      "& .MuiPickersCalendarHeader-label": {
                        color: "#000000",
                        fontWeight: "bold",
                      },
                      "& .MuiIconButton-root": { color: "#000000" },
                    },
                  },
                }}
              />
            </React.Fragment>
          );
        }}
      />
    </Box>
  );
}
