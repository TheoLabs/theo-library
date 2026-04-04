import { Box, Grid } from "@mui/material";
import {
  CardBox,
  CustomDataGrid,
  ListViewHeader,
  type GridColDef,
  FilterButton,
  ExportButton,
  Pagination,
  Title,
} from "@components";
import { useMemo, useState } from "react";
import { theme } from "@libs/theme";

export function DashboardScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const columns = useMemo<GridColDef<any, any, any>[]>(
    () => [
      {
        field: "id",
        headerName: "도서관명",
        flex: 1,
      },
      {
        field: "contractType",
        headerName: "계약 유형",
        flex: 1,
      },
      {
        field: "startOn",
        headerName: "시작일",
        flex: 1,
      },
      {
        field: "endOn",
        headerName: "종료일",
        flex: 1,
      },
      {
        field: "status",
        headerName: "상태",
        flex: 1,
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
        gap: 9,
        overflow: "hidden",
      }}
    >
      <Box>
        <Title title="대시보드" summary="자산 및 라이센스 주기 실시간 현황" />
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 6, lg: 3 }}>
            <CardBox>hi</CardBox>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <CardBox>hi</CardBox>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <CardBox>hi</CardBox>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <CardBox>hi</CardBox>
          </Grid>
        </Grid>
      </Box>

      {/* 중앙 DataGrid 컨테이너 */}
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
            title="도서관 계약 목록"
            summary="엔터프라이즈 자산 배포 계약의 전체 현황입니다."
            filterButton={<FilterButton />}
            exportButton={<ExportButton />}
          />
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
          <CustomDataGrid
            rows={[
              {
                id: 1,
                contractType: "",
                startOn: "",
                endOn: "",
                status: "",
              },
            ]}
            columns={columns}
            loading={false}
            headerClassName=""
          />
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Pagination
            page={page}
            limit={limit}
            totalCount={300}
            onLimitChange={setLimit}
            onChange={setPage}
          />
        </Box>
      </Box>

      {/* 하단 새로 추가된 카드가 찌그러지지 않게 보호 */}
      <Box sx={{ flexShrink: 0 }}>
        <CardBox>hihi</CardBox>
      </Box>
    </Box>
  );
}
