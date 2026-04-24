import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "@libs/theme";
import { InputField, FileDropzoneField, SelectField } from "@components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useFileUpload } from "@features/file/hooks";
import { useCategoryList } from "@features/category/hooks";
import { useSeriesCreate } from "@features/series/hooks";
import { useMemo } from "react";

const zodSchema = z.object({
  thumbnailImageUrl: z.string().min(1, "썸네일 이미지를 업로드해주세요."),
  title: z.string().min(1, "시리즈명을 입력해주세요."),
  summary: z.string().min(1, "시리즈 설명을 입력해주세요."),
  author: z.string().min(1, "저자를 입력해주세요."),
  illustrator: z.string().min(1, "그림작가를 입력해주세요."),
  publisher: z.string().min(1, "출판사를 입력해주세요."),
  publicationCycleDay: z
    .number({ error: "출판 주기를 입력해주세요." })
    .min(1, "1일 이상 입력해주세요."),
  categoryIds: z.array(z.number()).min(1, "카테고리를 선택해주세요."),
});

type ZodSchema = z.infer<typeof zodSchema>;

export function SeriesAddDialog(props: {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: uploadFile } = useFileUpload();

  // 3. state hooks
  // 4. query hooks
  const { categories } = useCategoryList({});
  const { mutateAsync: createSeries, isPending } = useSeriesCreate();

  // 5. form hooks
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<ZodSchema>({
    mode: "onTouched",
    defaultValues: {
      thumbnailImageUrl: "",
      title: "",
      summary: "",
      author: "",
      illustrator: "",
      publisher: "",
      publicationCycleDay: 1,
      categoryIds: [],
    },
    resolver: zodResolver(zodSchema),
  });

  console.log(errors);

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;
  const categoryOptions = useMemo(() => {
    return (
      categories?.items.map((category) => ({
        value: category.id,
        label: category.name,
      })) || []
    );
  }, [categories]);

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog
      open
      onKeyDown={onKeyDown}
      slotProps={{
        paper: {
          sx: {
            width: "700px",
          },
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "24px" }}>
            도서관 등록
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ marginTop: "16px" }} />

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid container spacing={6}>
            <Grid size={12}>
              <FileDropzoneField
                required
                label="대표 이미지"
                name="thumbnailImageUrl"
                control={control}
                accept="image/png, image/jpeg"
                onUpload={async (file) => {
                  const url = await uploadFile(file);
                  return url;
                }}
              />
            </Grid>
            <Grid size={12}>
              <InputField
                label="제목"
                required
                name="title"
                control={control}
              />
            </Grid>
            <Grid size={12}>
              <InputField
                label="시리즈 설명"
                required
                name="summary"
                control={control}
                multiline
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="저자"
                required
                name="author"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="그림작가"
                required
                name="illustrator"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="출판사"
                required
                name="publisher"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="출판 주기 (일)"
                required
                name="publicationCycleDay"
                control={control}
                type="number"
              />
            </Grid>
            <Grid size={12}>
              <SelectField
                multiple
                label="카테고리"
                required
                name="categoryIds"
                control={control}
                options={categoryOptions}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
            onClick={onClose}
            sx={{ background: theme.palette.background.default }}
          >
            <Typography color="textPrimary">취소</Typography>
          </Button>
          <Button
            disabled={isDisabled}
            loading={isPending}
            onClick={handleSubmit((data) => {
              createSeries(data, {
                onSuccess: () => {
                  enqueueSnackbar("도서관이 성공적으로 등록되었습니다.", {
                    variant: "success",
                  });
                  onClose();
                },
                onError: (error) => {
                  enqueueSnackbar(error.message, {
                    variant: "error",
                  });
                },
              });
            })}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            <Typography>완료</Typography>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
