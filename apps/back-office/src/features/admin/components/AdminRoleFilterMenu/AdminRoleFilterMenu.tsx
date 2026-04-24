import { Menu, Box, Typography } from "@mui/material";
import { AdminRoleType, AdminStatusType } from "@theo-library/shared";
import { FilterAction, FilterChipGroup } from "@components";
import { useState } from "react";

// 임시 옵션 데이터 (실제 프로젝트 값으로 변경해주세요)
const ROLE_OPTIONS = [
  { label: "사내 직원", value: AdminRoleType.SUPER },
  { label: "도서관", value: AdminRoleType.LIBRARY },
];

const STATUS_OPTIONS = [
  { label: "대기", value: AdminStatusType.PENDING },
  { label: "활성", value: AdminStatusType.ACTIVE },
  { label: "비활성", value: AdminStatusType.INACTIVE },
];

export function AdminRoleFilterMenu(props: {
  onClose: () => void;
  anchorEl: HTMLElement | null;
  initialValues: { roles: AdminRoleType[]; statuses: AdminStatusType[] };
  onChange: (values: {
    roles: AdminRoleType[];
    statuses: AdminStatusType[];
  }) => void;
}) {
  // 1. destructure props
  const { onClose, anchorEl, initialValues, onChange } = props;

  // 2. lib hooks
  // 3. state hooks
  const [selectedRoles, setSelectedRoles] = useState<AdminRoleType[]>(
    initialValues.roles,
  );
  const [selectedStatuses, setSelectedStatuses] = useState<AdminStatusType[]>(
    initialValues.statuses,
  );

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          sx: {
            width: "360px",
            padding: "20px",
          },
        },
        list: {
          sx: {
            padding: 0,
          },
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 700, color: "text.primary" }}
          >
            역할
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <FilterChipGroup
              options={ROLE_OPTIONS}
              selectedValues={selectedRoles}
              onChange={setSelectedRoles}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 700, color: "text.primary" }}
          >
            상태
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <FilterChipGroup
              options={STATUS_OPTIONS}
              selectedValues={selectedStatuses}
              onChange={setSelectedStatuses}
            />
          </Box>
        </Box>
      </Box>

      <FilterAction
        onApply={() => {
          onChange({ roles: selectedRoles, statuses: selectedStatuses });
          onClose();
        }}
        onReset={() => {
          setSelectedRoles([]);
          setSelectedStatuses([]);
        }}
      />
    </Menu>
  );
}
