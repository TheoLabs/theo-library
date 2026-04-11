import React, { useCallback, useState } from "react";

type RenderFn = (args: { onOpen: () => void }) => React.ReactNode;
type ChildrenFn = (args: {
  onClose: () => void;
  onKeyDown: React.KeyboardEventHandler;
}) => React.ReactNode;

function DialogButton(props: {
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
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleKeyDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  // 9. render
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      className={className}
    >
      {render({ onOpen: handleOpen })}
      {open && children({ onClose: handleClose, onKeyDown: handleKeyDown })}
    </div>
  );
}

export { DialogButton };
