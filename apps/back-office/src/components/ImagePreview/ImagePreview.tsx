import {
  Box,
  Typography,
  FormLabel,
  type SxProps,
  type Theme,
} from "@mui/material";
import { theme } from "@libs/theme";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export function ImagePreview(props: {
  label: string;
  imageUrl?: string | null;
  alt?: string;
  sx?: SxProps<Theme>;
}) {
  const { label, imageUrl, alt = "이미지", sx } = props;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 1, // 라벨과 이미지 사이의 간격
        ...sx,
      }}
    >
      {/* ✅ 라벨이 전달되었을 때만 상단에 렌더링 */}
      {label && (
        <FormLabel
          sx={{
            marginLeft: "4px", // 다른 폼 필드들과 텍스트 시작선을 맞추기 위한 여백
            fontWeight: "bold",
            fontSize: "14px",
            color: theme.palette.primary.light,
          }}
        >
          {label}
        </FormLabel>
      )}

      {/* 이미지 뷰어 영역 */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "3 / 4", // 도서/시리즈 썸네일 비율
          backgroundColor: "#F2F4F6",
          borderRadius: "12px",
          border: `1px solid ${theme.palette.grey[200]}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              color: "#A0A5AB",
            }}
          >
            <InsertPhotoIcon fontSize="large" sx={{ opacity: 0.5 }} />
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              이미지 없음
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
