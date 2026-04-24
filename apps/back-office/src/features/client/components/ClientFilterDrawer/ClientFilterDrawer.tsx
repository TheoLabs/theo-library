import { Drawer } from "@mui/material";

export function ClientFilterDrawer(props: {
  open: boolean;
  onClose: () => void;
}) {
  // 1. destructure props
  const { open, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "360px",
          },
        },
      }}
    >
      hi
    </Drawer>
  );
}
