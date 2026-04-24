import {
  Box,
  FormLabel,
  Typography,
  IconButton,
  CircularProgress,
  type SxProps,
  type Theme,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "@libs/theme";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import React, { useRef, useState } from "react";

export function FileDropzoneField<T extends FieldValues>(props: {
  label: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  accept?: string;
  sx?: SxProps<Theme>;
  onUpload: (file: File) => Promise<string>;
}) {
  const {
    label,
    name,
    control,
    required = false,
    accept,
    sx,
    onUpload,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localFileName, setLocalFileName] = useState<string>("");

  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", gap: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          // field.value는 이제 File 객체가 아니라 서버에서 받아온 S3 URL(문자열)입니다.
          const uploadedUrl: string | null | undefined = field.value;

          // 업로드 처리 공통 로직
          const handleFileProcess = async (file: File) => {
            setIsUploading(true);
            setLocalFileName(file.name); // 화면에 보여줄 파일명 임시 저장
            try {
              const s3Url = await onUpload(file); // 서버로 전송 후 URL 받아오기
              field.onChange(s3Url); // 훅 폼에 URL 문자열 저장
            } catch (err) {
              console.error("파일 업로드 실패:", err);
              setLocalFileName("");
            } finally {
              setIsUploading(false);
            }
          };

          const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragActive(true);
          };

          const handleDragLeave = () => {
            setIsDragActive(false);
          };

          const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleFileProcess(e.dataTransfer.files[0]);
            }
          };

          return (
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
                    color: theme.palette.primary.light,
                    "& .MuiFormLabel-asterisk": {
                      color: theme.palette.error.main,
                    },
                  }}
                >
                  {label}
                </FormLabel>
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

              <input
                type="file"
                ref={inputRef}
                hidden
                accept={accept}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileProcess(e.target.files[0]);
                  }
                  e.target.value = ""; // 동일한 파일 재선택 가능하게 초기화
                }}
              />

              <Box
                onClick={() =>
                  !uploadedUrl && !isUploading && inputRef.current?.click()
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  width: "100%",
                  minHeight: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  backgroundColor: isDragActive
                    ? "rgba(0, 6, 102, 0.04)"
                    : "#EBEFF5",
                  borderRadius: "12px",
                  border: `2px dashed ${
                    error
                      ? theme.palette.error.main
                      : isDragActive
                        ? theme.palette.primary.main
                        : "#B0B8C1"
                  }`,
                  cursor: uploadedUrl || isUploading ? "default" : "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: uploadedUrl
                      ? "#B0B8C1"
                      : error
                        ? theme.palette.error.dark
                        : theme.palette.primary.light,
                  },
                  ...sx,
                }}
              >
                {/* 1. 업로드 로딩 중 상태 */}
                {isUploading ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <CircularProgress
                      size={28}
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      업로드 중...
                    </Typography>
                  </Box>
                ) : uploadedUrl ? (
                  /* 2. 업로드 완료 상태 (URL이 존재하는 경우) */
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: "#FFF",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* 이미지 파일인지 URL 확장자로 검사하여 미리보기 렌더링 */}
                    {uploadedUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) ? (
                      <Box
                        component="img"
                        src={uploadedUrl}
                        alt="preview"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "6px",
                          objectFit: "cover",
                          border: `1px solid ${theme.palette.grey[200]}`,
                          marginRight: 2,
                        }}
                      />
                    ) : (
                      <InsertDriveFileOutlinedIcon
                        sx={{
                          color: theme.palette.primary.main,
                          mr: 2,
                          fontSize: 32,
                        }}
                      />
                    )}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#4D5156",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* 새로 올린 파일이면 localFileName, 수정 모드면 URL에서 추출 */}
                        {localFileName || uploadedUrl.split("/").pop()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        업로드 완료됨
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(null); // 삭제 시 폼에서 URL 제거
                        setLocalFileName("");
                      }}
                      sx={{ ml: 1 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  /* 3. 기본 미선택 상태 */
                  <React.Fragment>
                    <CloudUploadOutlinedIcon
                      sx={{
                        fontSize: 40,
                        color: error
                          ? theme.palette.error.main
                          : theme.palette.primary.light,
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#4D5156" }}
                    >
                      파일을 드래그하거나 클릭하여 업로드
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#8B95A1", mt: 0.5 }}
                    >
                      PNG, JPG, SVG 가능 (최대 10MB)
                    </Typography>
                  </React.Fragment>
                )}
              </Box>
            </React.Fragment>
          );
        }}
      />
    </Box>
  );
}
