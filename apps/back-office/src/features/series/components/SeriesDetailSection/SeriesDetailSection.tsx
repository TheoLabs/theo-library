import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useSeriesDetail, useSeriesStatusLabel } from "../../hooks";
import React from "react";
import { CardBox, ImagePreview, ViewField } from "@components";
import InfoIcon from "@mui/icons-material/Info";

export function SeriesDetailSection(props: { seriesId: number }) {
  // 1. destructure props
  const { seriesId } = props;

  // 2. lib hooks
  const getSeriesStatusLabel = useSeriesStatusLabel();
  // 3. state hooks
  // 4. query hooks
  const { series, isLoading } = useSeriesDetail(seriesId);

  // 5. form hooks
  // 6. calculate values
  const loading = !series || isLoading;
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
          <CardBox verticalLine sx={{ flexDirection: "column", gap: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InfoIcon sx={{ width: "32px", height: "32px" }} />
              <Typography sx={{ fontWeight: 600, mt: 1 }}>기본 정보</Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={4}>
                <ImagePreview
                  label="대표 이미지"
                  imageUrl={series.thumbnailImageUrl}
                  alt={series.title}
                  sx={{ width: "280px", height: "280px" }}
                />
              </Grid>
              <Grid
                size={8}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid container spacing={4}>
                  <Grid size={12}>
                    <ViewField label="시리즈명" value={series.title} />
                  </Grid>
                  <Grid size={6}>
                    <ViewField label="저자" value={series.author} />
                  </Grid>
                  <Grid size={6}>
                    <ViewField label="그림작가" value={series.illustrator} />
                  </Grid>
                  <Grid size={6}>
                    <ViewField label="출판사" value={series.publisher} />
                  </Grid>
                  <Grid size={6}>
                    <ViewField
                      label="출판 주기 (일)"
                      value={series.publicationCycleDay}
                    />
                  </Grid>
                  <Grid size={6}>
                    <ViewField
                      type="chip"
                      label="상태"
                      value={getSeriesStatusLabel(series.status).label}
                      sx={{
                        backgroundColor: getSeriesStatusLabel(series.status)
                          .color,
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <ViewField
                      label="총 회차 수"
                      value={series.totalEpisodeCount}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardBox>
        </React.Fragment>
      )}
    </Box>
  );
}
