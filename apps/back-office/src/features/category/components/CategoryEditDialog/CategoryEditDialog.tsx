import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@components";
import { useForm } from "react-hook-form";
import { theme } from "@libs/theme";
import CloseIcon from "@mui/icons-material/Close";
import { useCategoryUpdate } from "../../hooks";
import type { CategoryModel } from "@features/category/models";

const zodSchema = z.object({
  name: z.string().min(1, "카테고리명을 입력해주세요."),
});

type ZodSchema = z.infer<typeof zodSchema>;

export function CategoryEditDialog(props: {
  category: CategoryModel;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { category, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const { mutate: updateCategory } = useCategoryUpdate();

  // 5. form hooks
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ZodSchema>({
    mode: "onTouched",
    defaultValues: {
      name: category.name,
    },
    resolver: zodResolver(zodSchema),
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;

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
            minWidth: "400px",
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
            카테고리 수정
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ marginTop: "16px" }} />

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputField
            label="카테고리명"
            required
            name="name"
            control={control}
          />
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
            onClick={handleSubmit((data) => {
              updateCategory(
                { id: category.id, ...data },
                {
                  onSuccess: () => {
                    enqueueSnackbar("카테고리가 성공적으로 수정되었습니다.", {
                      variant: "success",
                    });
                    onClose();
                  },
                  onError: (error) => {
                    enqueueSnackbar(error.message, {
                      variant: "error",
                    });
                  },
                },
              );
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
