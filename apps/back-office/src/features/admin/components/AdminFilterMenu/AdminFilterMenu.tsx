import { Menu, Box, Typography } from "@mui/material";
import { AdminRoleType, AdminStatusType } from "@theo-library/shared";
import { FilterAction, FilterChipGroup } from "@components";
import { useState } from "react";
import {
  useAdminRoleOptions,
  useAdminStatusOptions,
} from "@features/admin/hooks";

export function AdminFilterMenu(props: {
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
  const roleOptions = useAdminRoleOptions();
  const statusOptions = useAdminStatusOptions();

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
              options={roleOptions}
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
              options={statusOptions}
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
