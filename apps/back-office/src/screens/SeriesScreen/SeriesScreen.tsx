import { Typography, Box, Button, Divider } from "@mui/material";
import { Title, DialogButton } from "@components";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  SeriesSearchSection,
  SeriesDetailSection,
  SeriesAddDialog,
} from "@features/series/components";

export function SeriesScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [selectedSeriesId, setSelectedSeriesId] = useState<number>();

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
        <Title title="시리즈 목록" />
        <DialogButton
          render={({ onOpen }) => (
            <Button onClick={onOpen} sx={{ height: "48px" }}>
              <AddIcon sx={{ mr: 2 }} />
              <Typography sx={{ fontWeight: 800 }}>시리즈 등록</Typography>
            </Button>
          )}
        >
          {({ onClose, onKeyDown }) => (
            <SeriesAddDialog onClose={onClose} onKeyDown={onKeyDown} />
          )}
        </DialogButton>
      </Box>
      <Box sx={{ display: "flex", gap: 4, height: "100%" }}>
        <SeriesSearchSection
          selectedSeriesId={selectedSeriesId}
          onSelect={setSelectedSeriesId}
        />
        <Divider orientation="vertical" />

        {selectedSeriesId ? (
          <SeriesDetailSection seriesId={selectedSeriesId} />
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">시리즈를 선택해주세요.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
