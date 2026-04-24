import { Box, Button, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { theme } from "@libs/theme";

export function FilterAction(props: {
  onReset: () => void;
  onApply: () => void;
}) {
  // 1. destructure props
  const { onReset, onApply } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box sx={{ display: "flex", marginTop: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <IconButton
          onClick={onReset}
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "#F4F6F9",
            border: "1px solid rgba(25, 28, 30, 0.08)",
            color: "#4D5156",
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: "#EBEFF5",
              borderColor: "#D1D6DB",
              color: theme.palette.primary.main,
            },
          }}
        >
          <RestartAltIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            onClick={onApply}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              fontWeight: 700,
              borderRadius: "8px",
              padding: "4px 16px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            적용
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
