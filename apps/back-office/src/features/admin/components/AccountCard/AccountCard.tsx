import { CardBox } from "@components";
import { Box, Chip, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { theme } from "@libs/theme";
import { useAdminList } from "../../hooks";
import { AdminRoleType } from "@theo-library/shared";

export function AccountCard(props: { clientId: number }) {
  // 1. destructure props
  const { clientId } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { admins, isLoading } = useAdminList({
    page: 1,
    limit: 1,
    filter: { clientId, roles: [AdminRoleType.LIBRARY] },
  });
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <CardBox sx={{ flexDirection: "column", gap: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AdminPanelSettingsOutlinedIcon
          sx={{ width: "32px", height: "32px" }}
        />
        <Typography sx={{ fontWeight: 600, marginTop: 1 }}>
          계정 정보
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          gap: 2,
          padding: "8px 16px",
          borderRadius: "12px",
          justifyContent: "space-between",
          background: theme.palette.background.default,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: theme.palette.text.secondary,
          }}
        >
          theo@dobedub.com
        </Typography>
        <Chip
          label="승인 대기중"
          color="info"
          sx={{ fontSize: "16px", fontWeight: 600 }}
        />
      </Box>
    </CardBox>
  );
}
