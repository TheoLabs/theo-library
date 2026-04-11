import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "@libs/theme";

// ✅ TextFieldProps를 확장하여 커스텀 스타일 Prop 추가
type SearchTextFieldProps = TextFieldProps & {
  searchStyle?: "default" | "header"; // default: 기존 큰 회색 창, header: 리스트 헤더용 흰색 창
};

export function SearchTextField({
  searchStyle = "default",
  ...props
}: SearchTextFieldProps) {
  // 분기 처리를 위한 플래그
  const isDefault = searchStyle === "default";

  return (
    <TextField
      {...props}
      placeholder={props.placeholder || "검색어를 입력하세요..."}
      variant="outlined"
      size={isDefault ? "small" : props.size}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: isDefault ? theme.palette.primary.light : "#000",
                  fontSize: isDefault ? "20px" : "22px",
                }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: isDefault ? "240px" : "480px", // 스타일에 따른 기본 너비

        "& .MuiOutlinedInput-root": isDefault
          ? {
              // 👇 Header 스타일: 흰색 배경, 테두리 있음
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              transition: "all 0.2s ease-in-out",
              "& fieldset": { borderColor: "#E0E3E6" },
              "&:hover fieldset": { borderColor: "#B0B8C1" },
              "&.Mui-focused fieldset": { border: "none" },
              "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(0, 6, 102, 0.2)" },
            }
          : {
              // 👇 Default 스타일: 회색 배경, 테두리 없음
              backgroundColor: "#EBEFF5",
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              "& fieldset": { border: "none" },
              "&.Mui-focused": {
                backgroundColor: "#FFFFFF",
                boxShadow: `0 0 0 2px ${theme.palette.primary.light}40`,
              },
            },

        "& .MuiInputBase-input": {
          padding: isDefault ? "8px 0" : "10px 14px 10px 0",
          fontSize: "14px",
          color: "#4D5156",
          fontWeight: isDefault ? 400 : 500,
          "&::placeholder": {
            color: "#8B95A1",
            opacity: 1,
          },
        },
        // 👇 외부에서 전달한 sx가 있다면 가장 마지막에 덮어씌움 (유연성 확보)
        ...props.sx,
      }}
    />
  );
}
