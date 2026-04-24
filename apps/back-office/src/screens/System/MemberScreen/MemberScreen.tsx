import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import {
  Title,
  FilterButton,
  ExportButton,
  ListViewHeader,
  CustomDataGrid,
  type GridColDef,
  Pagination,
  MenuButton,
  FilterChipGroup,
  DialogButton,
  DeleteConfirmDialog,
} from "@components";
import { theme } from "@libs/theme";
import React, { useState, useMemo } from "react";
import {
  useAdminList,
  useAdminStatusLabel,
  useAdminRoleLabel,
  useAdminRoleOptions,
  useAdminStatusOptions,
} from "@features/admin/hooks";
import type { AdminModel } from "@features/admin/models";
import { AdminFilterMenu } from "@features/admin/components";
import { AdminRoleType, AdminStatusType } from "@theo-library/shared";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

export function MemberScreen() {
  // 1. destructure props
  // 2. lib hooks
  const getAdminStatusLabel = useAdminStatusLabel();
  const getAdminRoleLabel = useAdminRoleLabel();
  const roleOptions = useAdminRoleOptions();
  const statusOptions = useAdminStatusOptions();

  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<{
    searchKey: string;
    searchValue: string;
    roles: AdminRoleType[];
    statuses: AdminStatusType[];
  }>({ searchKey: "name", searchValue: "", roles: [], statuses: [] });

  // 4. query hooks
  const { admins, isLoading } = useAdminList({ page, limit, filter });

  // 5. form hooks
  // 6. calculate values
  const hasFilter = filter.roles.length > 0 || filter.statuses.length > 0;
  const columns = useMemo<GridColDef<AdminModel>[]>(
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
        renderCell: ({ value }) => {
          const role = getAdminRoleLabel(value);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: role.color,
                fontWeight: "bold",
              }}
            >
              {role.label}
            </Box>
          );
        },
      },
      {
        field: "status",
        headerName: "상태",
        flex: 1,
        renderCell: ({ value }) => {
          const status = getAdminStatusLabel(value);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: status.color,
                fontWeight: "bold",
              }}
            >
              ● {status.label}
            </Box>
          );
        },
      },
      {
        field: "action",
        headerName: "동작",
        width: 80,
        renderCell: ({ row }) => {
          return (
            <React.Fragment>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertRoundedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <DialogButton
                  render={({ onOpen }) => (
                    <MenuItem onClick={onOpen}>수정</MenuItem>
                  )}
                >
                  {({ onClose, onKeyDown }) => <div>hi</div>}
                </DialogButton>
                <DialogButton
                  render={({ onOpen }) => (
                    <MenuItem onClick={onOpen}>삭제</MenuItem>
                  )}
                >
                  {({ onClose, onKeyDown }) => (
                    <DeleteConfirmDialog
                      onClose={onClose}
                      onKeyDown={onKeyDown}
                      onDelete={() => {}}
                    />
                  )}
                </DialogButton>
              </Menu>
            </React.Fragment>
          );
        },
      },
    ],
    [getAdminStatusLabel, getAdminRoleLabel, anchorEl],
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
              { searchKey: "name", label: "이름" },
              { searchKey: "email", label: "이메일" },
            ]}
            onSearch={(search) => {
              setFilter((prev) => ({ ...prev, ...search }));
              setPage(1);
            }}
            filterButton={
              <MenuButton
                render={({ onOpen }) => <FilterButton onClick={onOpen} />}
              >
                {({ onClose, anchorEl }) => (
                  <AdminFilterMenu
                    onClose={onClose}
                    anchorEl={anchorEl}
                    initialValues={filter}
                    onChange={(values) => {
                      setFilter((prev) => ({ ...prev, ...values }));
                      setPage(1);
                    }}
                  />
                )}
              </MenuButton>
            }
            exportButton={<ExportButton />}
            appliedChips={
              hasFilter && (
                <Box sx={{ display: "flex", gap: 8 }}>
                  <FilterChipGroup
                    options={roleOptions}
                    selectedValues={filter.roles}
                    onChange={(values) => {
                      setFilter((prev) => ({ ...prev, roles: values }));
                      setPage(1);
                    }}
                    viewMode
                    category="역할"
                  />
                  <FilterChipGroup
                    options={statusOptions}
                    selectedValues={filter.statuses}
                    onChange={(values) => {
                      setFilter((prev) => ({ ...prev, statuses: values }));
                      setPage(1);
                    }}
                    viewMode
                    category="상태"
                  />
                </Box>
              )
            }
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
