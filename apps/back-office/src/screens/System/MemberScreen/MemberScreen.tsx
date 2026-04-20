import { Box, IconButton } from "@mui/material";
import {
  Title,
  FilterButton,
  ExportButton,
  ListViewHeader,
  CustomDataGrid,
  type GridColDef,
  Pagination,
} from "@components";
import { theme } from "@libs/theme";
import { useState, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAdminList } from "@features/admin/hooks";

export function MemberScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { admins, isLoading } = useAdminList({ page, limit });

  // 5. form hooks
  // 6. calculate values
  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "이름",
        flex: 1,
      },
      {
        field: "email",
        headerName: "이메일",
        flex: 1,
      },
      {
        field: "role",
        headerName: "역할",
        flex: 1,
      },
      {
        field: "status",
        headerName: "상태",
        flex: 1,
      },
      {
        field: "actions",
        headerName: "액션",
        width: 84,
        renderCell: (params) => (
          <IconButton
            // onClick={() => handleEdit(params.row.id)}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: "rgba(0, 6, 102, 0.04)",
                color: theme.palette.primary.main,
              },
            }}
          >
            <EditIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        ),
      },
    ],
    [],
  );
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
        <Title title="계정 관리" />
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
            title="계정 목록"
            summary="사내 및 도서관 계정 전체 목록입니다."
            searchItems={[
              { searchKey: "contractType", label: "계약 유형" },
              { searchKey: "status", label: "상태" },
            ]}
            onSearch={(search) => {
              console.log(search);
            }}
            filterButton={<FilterButton />}
            exportButton={<ExportButton />}
          />
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
          <CustomDataGrid
            rows={admins?.items || []}
            columns={columns}
            loading={isLoading}
          />
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Pagination
            page={page}
            limit={limit}
            totalCount={admins?.total}
            onLimitChange={setLimit}
            onChange={setPage}
          />
        </Box>
      </Box>
    </Box>
  );
}
