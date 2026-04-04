import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "@libs/theme";

export function SearchTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      placeholder={props.placeholder}
      variant="outlined"
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#000", fontSize: "22px" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: "480px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#EBEFF5",
          borderRadius: "12px",
          transition: "all 0.2s ease-in-out",

          // 👇 가장 핵심: 기본적으로 생기는 검은 테두리를 완벽하게 없앰
          "& fieldset": {
            border: "none",
          },

          // 👇 포커스(클릭) 되었을 때의 모던한 효과
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF", // 포커스 시 배경을 하얗게
            boxShadow: `0 0 0 2px ${theme.palette.primary.light}40`, // 테마 색상을 활용한 부드러운 빛번짐(Glow) 효과
          },
        },

        // 텍스트 및 플레이스홀더 스타일링
        "& .MuiInputBase-input": {
          padding: "10px 14px 10px 0", // 높이 조절 및 아이콘 우측 여백
          fontSize: "14px",
          color: "#4D5156",
          fontWeight: 500,
          "&::placeholder": {
            color: "#8B95A1", // 플레이스홀더 색상
            opacity: 1, // 브라우저 기본 투명도 덮어쓰기
          },
        },
        ...props.sx,
      }}
    />
  );
}
