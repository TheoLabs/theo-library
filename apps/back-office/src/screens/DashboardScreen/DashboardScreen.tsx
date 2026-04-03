import { Box, Grid } from "@mui/material";
import {
  CardBox,
  CustomDataGrid,
  ListViewHeader,
  type GridColDef,
  FilterButton,
  ExportButton,
} from "@components";
import { useMemo } from "react";
import { theme } from "@libs/theme";

export function DashboardScreen() {
  // 1. destructure props
  // 2. lib hooks
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
      }}
    >
      {/* 상단 카드 그룹 섹션 */}
      <Box>
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          border: `1px solid ${theme.palette.grey[100]}`,
          background: theme.palette.background.paper,
        }}
      >
        <ListViewHeader
          title="도서관 계약 목록"
          summary="엔터프라이즈 자산 배포 계약의 전체 현황입니다."
          filterButton={<FilterButton />}
          exportButton={<ExportButton />}
        />
        <CustomDataGrid
          rows={[]}
          columns={columns}
          loading={false}
          headerClassName=""
        />
      </Box>
    </Box>
  );
}
