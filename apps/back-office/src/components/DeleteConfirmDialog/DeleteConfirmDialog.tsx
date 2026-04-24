import { theme } from "@libs/theme";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export function DeleteConfirmDialog(props: {
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onDelete: () => void;
}) {
  // 1. destructure props
  const { onClose, onKeyDown, onDelete } = props;

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
            width: "480px",
          },
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <DeleteIcon />
            <Typography>삭제</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ borderWidth: 1, marginY: 4 }} />
      <DialogContent>
        <Typography>이 작업은 되돌릴 수 없습니다.</Typography>
        <Typography>정말 삭제하시겠습니까?</Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{ flex: 1, display: "flex", gap: 4, justifyContent: "flex-end" }}
        >
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            variant="contained"
            color="error"
          >
            삭제
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
