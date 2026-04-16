import { CardBox, DialogButton, ViewField } from "@components";
import { theme } from "@libs/theme";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Grid, Typography, Box, Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useContractList, ContractTypeLabel } from "../../hooks";
import { ContractStatus } from "@theo-library/shared";
import React from "react";
import { ContractAddDialog } from "../ContractAddDialog";

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
          <DialogButton
            render={({ onOpen }) => (
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={onOpen}
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
            )}
          >
            {({ onClose, onKeyDown }) => (
              <ContractAddDialog
                clientId={clientId}
                onClose={onClose}
                onKeyDown={onKeyDown}
              />
            )}
          </DialogButton>
        </Box>
      ) : (
        <React.Fragment>
          <Grid container spacing={6}>
            <Grid size={6}>
              <ViewField
                darkTheme
                label="계약 유형"
                value={ContractTypeLabel[contracts.items[0].type]}
                sx={{ fontSize: "24px" }}
              />
            </Grid>
            <Grid size={6}>
              <ViewField
                darkTheme
                label="계약 상태"
                type="chip"
                value={contracts.items[0].status}
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
                value={`${contracts.items[0].startOn} ~ ${contracts.items[0].endOn}`}
                sx={{ fontSize: "16px" }}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </CardBox>
  );
}
