import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useClientDetail } from "../../hooks";
import { CardBox, ViewField } from "@components";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
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
            <CardBox sx={{ flex: 1, flexDirection: "column", gap: 4 }}>
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

              <Grid container spacing={4}>
                <Grid size={6}>
                  <ViewField label="기관명" value={client.name} />
                </Grid>
                <Grid size={6}>
                  <ViewField
                    label="도메인"
                    type="url"
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

            {/* 도서관 계약 정보 */}
            <CardBox sx={{ flex: 1 }}>ds</CardBox>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
