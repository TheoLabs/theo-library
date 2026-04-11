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
  TextField,
} from "@mui/material";
import { theme } from "../../../../libs/theme";

export function ClientAddButton(props: {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
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
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          fdaf
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
            onClick={onClose}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            <Typography>완료</Typography>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
