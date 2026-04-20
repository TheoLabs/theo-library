import { Box, Button, Divider, Typography } from "@mui/material";
import { Title, DialogButton } from "@components";
import { useState } from "react";
import {
  ClientSearchSection,
  ClientDetailSection,
  ClientAddDialog,
} from "@features/client/components";
import AddIcon from "@mui/icons-material/Add";

export function ClientScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [selectedClientId, setSelectedClientId] = useState<number>();

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title title="도서관 조회" />
        <DialogButton
          render={({ onOpen }) => (
            <Button onClick={onOpen} sx={{ height: "48px" }}>
              <AddIcon sx={{ mr: 2 }} />
              <Typography sx={{ fontWeight: 800 }}>도서관 등록</Typography>
            </Button>
          )}
        >
          {({ onClose, onKeyDown }) => (
            <ClientAddDialog onClose={onClose} onKeyDown={onKeyDown} />
          )}
        </DialogButton>
      </Box>
      <Box sx={{ display: "flex", gap: 4, height: "100%" }}>
        <ClientSearchSection
          selectedClientId={selectedClientId}
          onSelect={setSelectedClientId}
        />
        <Divider orientation="vertical" />

        {selectedClientId ? (
          <ClientDetailSection clientId={selectedClientId} />
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">도서관을 선택해주세요.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
