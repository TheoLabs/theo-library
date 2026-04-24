import { Box, type SxProps, type Theme } from "@mui/material";
import React, { useCallback, useState } from "react";

type RenderFn = (args: {
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
}) => React.ReactNode;
type ChildrenFn = (args: {
  onClose: () => void;
  anchorEl: HTMLElement | null;
}) => React.ReactNode;

export function MenuButton(props: {
  children: ChildrenFn;
  render: RenderFn;
  sx?: SxProps<Theme>;
}) {
  // 1. destructure props
  const { children, render, sx } = props;

  // 2. lib hooks
  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // 9. render

  return (
    <Box sx={sx}>
      {render({ onOpen: handleOpen })}
      {Boolean(anchorEl) && children({ onClose: handleClose, anchorEl })}
    </Box>
  );
}
