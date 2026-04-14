import { CardBox, ViewField } from "@components";
import { theme } from "@libs/theme";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Grid, Typography, Box, Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useContractList } from "../../hooks";
import { ContractStatus } from "@theo-library/shared";
import React from "react";

export function ContractCard(props: { clientId: number }) {
  // 1. destructure props
  const { clientId } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { contracts } = useContractList({
    page: 1,
    limit: 1,
    clientId,
    filter: {
      statuses: [ContractStatus.ACTIVE],
    },
  });
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <CardBox
      sx={{
        flexDirection: "column",
        backgroundColor: theme.palette.primary.dark,
        color: "#FFF",
        gap: 4,
        minHeight: "210px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AssignmentIcon sx={{ width: "32px", height: "32px" }} />
        <Typography sx={{ fontWeight: 600 }}>계약 정보</Typography>
      </Box>

      {!contracts || !contracts.items.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{
              color: theme.palette.background.paper,
              borderColor: theme.palette.background.paper,
              borderWidth: "2px",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            계약 추가
          </Button>
        </Box>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </CardBox>
  );
}
