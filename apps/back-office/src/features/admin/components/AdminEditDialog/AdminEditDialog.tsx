import type { AdminModel } from "@features/admin/models";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminRoleType, AdminStatusType } from "@theo-library/shared";
import CloseIcon from "@mui/icons-material/Close";
import { InputField, SelectField } from "@components";
import { theme } from "@libs/theme";
import { useSnackbar } from "notistack";
import {
  useAdminStatusOptions,
  useAdminRoleOptions,
  useAdminChangeStatus,
} from "@features/admin/hooks";

const zodSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  email: z.string().min(1, "이메일 형식이 올바르지 않습니다."),
  role: z.enum(AdminRoleType),
  status: z.enum(AdminStatusType),
});

type ZodSchema = z.infer<typeof zodSchema>;

export function AdminEditDialog(props: {
  admin: AdminModel;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { admin, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();
  const adminStatusOptions = useAdminStatusOptions();
  const adminRoleOptions = useAdminRoleOptions();

  // 3. state hooks
  // 4. query hooks
  const { mutate: changeStatus } = useAdminChangeStatus();

  // 5. form hooks
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<ZodSchema>({
    mode: "onTouched",
    defaultValues: {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status,
    },
    resolver: zodResolver(zodSchema),
  });

  // 6. calculate values
  const isDisabled = !isValid || !isDirty;

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
            width: "620px",
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
            관리자 수정
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ marginTop: "16px" }} />

      <DialogContent>
        <Grid container spacing={4}>
          <Grid size={6}>
            <InputField disabled label="이름" name="name" control={control} />
          </Grid>
          <Grid size={6}>
            <InputField
              disabled
              label="이메일"
              name="email"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <SelectField
              disabled
              label="역할"
              name="role"
              control={control}
              options={adminRoleOptions}
            />
          </Grid>
          <Grid size={6}>
            <SelectField
              label="상태"
              name="status"
              control={control}
              options={adminStatusOptions}
            />
          </Grid>
        </Grid>
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
              changeStatus(
                { id: admin.id, ...data },
                {
                  onSuccess: () => {
                    enqueueSnackbar("관리자가 성공적으로 수정되었습니다.", {
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
