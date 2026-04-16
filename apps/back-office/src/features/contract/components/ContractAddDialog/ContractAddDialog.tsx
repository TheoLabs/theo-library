import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  IconButton,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { theme } from "@libs/theme";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useCreateContract, useContractTypeOptions } from "../../hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContractType } from "@theo-library/shared";
import { SelectField, CalendarField } from "@components";

const zodSchema = z
  .object({
    type: z.enum(ContractType),
    startOn: z.string().min(1, "계약 시작일을 입력해주세요."),
    endOn: z.string().min(1, "계약 종료일을 입력해주세요."),
  })
  .refine(
    (data) => {
      if (!data.startOn || !data.endOn) return true;
      return new Date(data.startOn) <= new Date(data.endOn);
    },
    {
      message: "종료일은 시작일보다 빠를 수 없습니다.",
      path: ["endOn"],
    },
  );

type zodSchema = z.infer<typeof zodSchema>;

export function ContractAddDialog(props: {
  clientId: number;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { clientId, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();
  const contractTypeOptions = useContractTypeOptions();

  // 3. state hooks
  // 4. query hooks
  const { mutate: createContract, isPending } = useCreateContract();

  // 5. form hooks
  const { control, handleSubmit } = useForm<zodSchema>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      type: ContractType.PURCHASE,
      startOn: "",
      endOn: "",
    },
    resolver: zodResolver(zodSchema),
  });

  // 6. calculate values
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
            minWidth: "640px",
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
            계약 등록
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
              <SelectField
                label="계약 유형"
                required
                name="type"
                control={control}
                options={contractTypeOptions}
              />
            </Grid>
            <Grid size={6}>
              <CalendarField
                label="계약 시작일"
                required
                name="startOn"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <CalendarField
                label="계약 종료일"
                required
                name="endOn"
                control={control}
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
            loading={isPending}
            onClick={handleSubmit((data) => {
              createContract(
                { ...data, clientId },
                {
                  onSuccess: () => {
                    enqueueSnackbar("계약이 성공적으로 등록되었습니다.", {
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
