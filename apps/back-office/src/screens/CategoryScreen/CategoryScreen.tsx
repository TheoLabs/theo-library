import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Title,
  ListViewHeader,
  Pagination,
  CustomDataGrid,
  type GridColDef,
  FilterButton,
  ExportButton,
  DialogButton,
} from "@components";
import { theme } from "@libs/theme";
import React, { useMemo, useState } from "react";
import { type CategoryModel } from "@features/category/models";
import { useCategoryList } from "@features/category/hooks";
import AddIcon from "@mui/icons-material/Add";
import {
  CategoryAddDialog,
  CategoryEditDialog,
} from "@features/category/components";
import { format } from "@libs/date";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

export function CategoryScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 4. query hooks
  const { categories, isLoading } = useCategoryList({ page, limit });

  // 6. calculate values
  const columns = useMemo<GridColDef<CategoryModel>[]>(() => {
    return [
      {
        field: "name",
        headerName: "카테고리명",
        width: 200,
      },
      {
        field: "createdAt",
        headerName: "생성일",
        flex: 1,
        valueGetter: (value) => format(value, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        field: "action",
        headerName: "동작",
        width: 80,
        renderCell: ({ row }) => {
          return (
            <React.Fragment>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertRoundedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <DialogButton
                  render={({ onOpen }) => (
                    <MenuItem onClick={onOpen}>수정</MenuItem>
                  )}
                >
                  {({ onClose, onKeyDown }) => (
                    <CategoryEditDialog
                      category={row}
                      onClose={() => {
                        onClose();
                        handleCloseMenu();
                      }}
                      onKeyDown={onKeyDown}
                    />
                  )}
                </DialogButton>
                <MenuItem onClick={handleCloseMenu}>삭제</MenuItem>
              </Menu>
            </React.Fragment>
          );
        },
      },
    ];
  }, [anchorEl]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
        <DialogButton
          render={({ onOpen }) => (
            <Button onClick={onOpen} sx={{ height: "48px" }}>
              <AddIcon sx={{ mr: 2 }} />
              <Typography sx={{ fontWeight: 800 }}>카테고리 등록</Typography>
            </Button>
          )}
        >
          {({ onClose, onKeyDown }) => (
            <CategoryAddDialog onClose={onClose} onKeyDown={onKeyDown} />
          )}
        </DialogButton>
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
          <CustomDataGrid
            rows={categories?.items || []}
            columns={columns}
            loading={isLoading}
          />
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Pagination
            page={page}
            limit={limit}
            totalCount={categories?.total}
            onLimitChange={setLimit}
            onChange={setPage}
          />
        </Box>
      </Box>
    </Box>
  );
}
