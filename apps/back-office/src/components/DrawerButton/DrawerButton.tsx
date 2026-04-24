import React, { useCallback, useState } from "react";

type RenderFn = (args: { onOpen: () => void }) => React.ReactNode;

type ChildrenFn = (args: {
  open: boolean;
  onClose: () => void;
}) => React.ReactNode;

export function DrawerButton(props: {
  children: ChildrenFn;
  render: RenderFn;
  className?: string;
}) {
  // 1. destructure props
  const { children, render, className } = props;

  // 2. lib hooks
  // 3. state hooks
  const [open, setOpen] = useState(false);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleOpen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // 9. render
  return (
    <div className={className}>
      {render({ onOpen: handleOpen })}
      {children({ open, onClose: handleClose })}
    </div>
  );
}
