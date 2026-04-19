import { Box } from "@mui/material";
import {
  Title,
  ListViewHeader,
  Pagination,
  CustomDataGrid,
  type CustomDataGridProps,
  FilterButton,
  ExportButton,
} from "@components";
import { theme } from "@libs/theme";
import { useState } from "react";

export function CategoryScreen() {
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
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 4,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title title="카테고리 관리" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          border: `1px solid ${theme.palette.grey[100]}`,
          background: theme.palette.background.paper,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <ListViewHeader
            title="카테고리 목록"
            summary="카테고리 전체 목록입니다."
            searchItems={[{ searchKey: "name", label: "카테고리명" }]}
            onSearch={(search) => {
              console.log(search);
            }}
            filterButton={<FilterButton />}
            exportButton={<ExportButton />}
          />
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
          {/* <CustomDataGrid
            rows={admins?.items || []}
            columns={columns}
            loading={false}
          /> */}
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          {/* <Pagination
            page={page}
            limit={limit}
            totalCount={admins?.total}
            onLimitChange={setLimit}
            onChange={setPage}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}
