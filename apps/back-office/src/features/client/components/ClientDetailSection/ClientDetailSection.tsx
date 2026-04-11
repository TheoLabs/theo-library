import { Box, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { useClientDetail } from "../../hooks";
import { CardBox, ViewField } from "@components";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { theme } from "@libs/theme";

export function ClientDetailSection(props: { clientId: number }) {
  // 1. destructure props
  const { clientId } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { client, isLoading } = useClientDetail({ clientId });

  // 5. form hooks
  // 6. calculate values
  const loading = !client || isLoading;
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      sx={{ display: "flex", flex: 1, flexDirection: "column", height: "100%" }}
    >
      {loading ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* 도서관 기본 정보 */}
            <CardBox
              verticalLine
              sx={{ flex: 1, flexDirection: "column", gap: 6 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <BusinessIcon
                  sx={{
                    width: "32px",
                    height: "32px",
                    color: theme.palette.secondary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600, marginTop: 2 }}>
                  기관 정보
                </Typography>
              </Box>

              <Grid container spacing={6}>
                <Grid size={6}>
                  <ViewField label="기관명" value={client.name} />
                </Grid>
                <Grid size={6}>
                  <ViewField
                    label="도메인"
                    type="url"
                    url={`https://${client.subDomain}.theo.com`}
                    value={`https://${client.subDomain}.theo.com`}
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.secondary.main,
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <ViewField label="연락처" value={client.contactNumber} />
                </Grid>
                <Grid size={6}>
                  <ViewField label="주소" value={client.address} />
                </Grid>
              </Grid>
            </CardBox>

            <Box
              sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 2 }}
            >
              {/* 도서관 계약 정보 */}
              <CardBox
                sx={{
                  flexDirection: "column",
                  backgroundColor: theme.palette.primary.dark,
                  color: "#FFF",
                  gap: 4,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AssignmentIcon sx={{ width: "32px", height: "32px" }} />
                  <Typography sx={{ fontWeight: 600 }}>계약 정보</Typography>
                </Box>

                <Grid container spacing={6}>
                  <Grid size={6}>
                    <ViewField
                      darkTheme
                      label="계약 유형"
                      value="구독형"
                      sx={{ fontSize: "24px" }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <ViewField
                      darkTheme
                      label="계약 상태"
                      type="chip"
                      value="활성"
                      sx={{
                        fontSize: "14px",
                        backgroundColor: theme.palette.success.main,
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid size={12}>
                    <ViewField
                      darkTheme
                      label="계약 기간"
                      value="2026.01.01 ~ 2026.12.31"
                      sx={{ fontSize: "16px" }}
                    />
                  </Grid>
                </Grid>
              </CardBox>

              {/* 계정 정보 */}
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
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
