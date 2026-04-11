import { Box, Button, Divider, Typography } from "@mui/material";
import {
  Title,
  ListViewHeader,
  CustomDataGrid,
  Pagination,
  FilterButton,
  ExportButton,
  CardBox,
  SearchTextField,
} from "@components";
import { theme } from "@libs/theme";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export function ClientScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
        <Button sx={{ height: "48px" }}>
          <AddIcon sx={{ mr: 2 }} />
          <Typography sx={{ fontWeight: 800 }}>도서관 등록</Typography>
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 4, height: "100%" }}>
        <CardBox sx={{ minWidth: "360px", flexDirection: "column", gap: 2 }}>
          <SearchTextField
            placeholder="도서관명을 입력하세요."
            sx={{ width: "100%" }}
          />

          <Divider />
        </CardBox>

        <Divider orientation="vertical" />

        <Box sx={{ display: "flex", flex: 1, backgroundColor: "blue" }}>
          fas
        </Box>
      </Box>
    </Box>
  );
}
