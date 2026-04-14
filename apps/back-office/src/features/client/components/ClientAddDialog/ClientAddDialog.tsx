import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import { theme } from "@libs/theme";
import { InputField } from "@components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { formatPhoneNumber } from "@libs/utils";
import { useClientCreate } from "../../hooks";
import { useSnackbar } from "notistack";

const zodSchema = z.object({
  name: z.string().min(1, "도서관명을 입력해주세요."),
  subDomain: z.string().min(1, "서브도메인을 입력해주세요."),
  contactNumber: z.string().min(1, "연락처를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
});

type ZodSchema = z.infer<typeof zodSchema>;

export function ClientAddDialog(props: {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const { mutate: createClient } = useClientCreate();

  // 5. form hooks
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<ZodSchema>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      subDomain: "",
      contactNumber: "",
      address: "",
    },
    resolver: zodResolver(zodSchema),
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;
  const contactNumberValue = watch("contactNumber");

  // 7. effect hooks
  useEffect(() => {
    const formattedNumber = formatPhoneNumber(contactNumberValue);
    if (contactNumberValue !== formattedNumber) {
      setValue("contactNumber", formattedNumber, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [contactNumberValue, setValue]);
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
            <Grid size={6}>
              <InputField
                label="도서관명"
                required
                name="name"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="서브도메인"
                required
                name="subDomain"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="연락처1"
                required
                placeholder="'-'은 자동으로 채워집니다."
                name="contactNumber"
                control={control}
              />
            </Grid>
            <Grid size={6}>
              <InputField
                label="주소"
                required
                name="address"
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
            disabled={isDisabled}
            onClick={handleSubmit((data) => {
              createClient(data, {
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
