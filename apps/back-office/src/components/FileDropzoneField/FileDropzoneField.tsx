import {
  Box,
  FormLabel,
  Typography,
  IconButton,
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
import React, { useEffect, useRef, useState } from "react";

function ImagePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    /* eslint-disable-next-line */
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Box
      component="img"
      src={previewUrl}
      alt="preview"
      sx={{
        width: 40,
        height: 40,
        borderRadius: "6px",
        objectFit: "cover", // 이미지가 찌그러지지 않게 꽉 차게 렌더링
        border: `1px solid ${theme.palette.grey[200]}`,
        marginRight: 2,
      }}
    />
  );
}

export function FileDropzoneField<T extends FieldValues>(props: {
  label: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  accept?: string;
  sx?: SxProps<Theme>;
}) {
  const { label, name, control, required = false, accept, sx } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  return (
    <Box
      sx={{ display: "flex", width: "100%", flexDirection: "column", gap: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const file: File | null = field.value;

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
              field.onChange(e.dataTransfer.files[0]);
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
                    field.onChange(e.target.files[0]);
                  }
                  e.target.value = "";
                }}
              />

              <Box
                onClick={() => !file && inputRef.current?.click()}
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
                  cursor: file ? "default" : "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: file
                      ? "#B0B8C1"
                      : error
                        ? theme.palette.error.dark
                        : theme.palette.primary.light,
                  },
                  ...sx,
                }}
              >
                {file ? (
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
                    {/* 👇 이미지 파일인지 확인하여 분기 처리 */}
                    {file.type.startsWith("image/") ? (
                      <ImagePreview file={file} />
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
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(null);
                      }}
                      sx={{ ml: 1 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
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
