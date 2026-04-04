import {
  Pagination as MuiPagination,
  PaginationItem,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { theme } from "@libs/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Pagination(props: {
  page: number;
  limit: number;
  totalCount?: number;
  onLimitChange: (limit: number) => void;
  onChange: (page: number) => void;
  limitOptions?: number[];
}) {
  const {
    page = 1,
    limit,
    totalCount,
    onChange,
    onLimitChange,
    limitOptions = [10, 30, 50],
  } = props;

  const count = useMemo(() => {
    if (totalCount) {
      return Math.ceil(totalCount / limit);
    }
    return 1;
  }, [totalCount, limit]);

  const currentDisplayedCount = useMemo(() => {
    if (!totalCount) return 0;
    return Math.min(limit, totalCount - (page - 1) * limit);
  }, [totalCount, limit, page]);

  useEffect(() => {
    onChange(1);
  }, [limit, onChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    onLimitChange(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
        borderTop: `1px solid ${theme.palette.grey[100]}`,
        background: theme.palette.grey[200],
        borderRadius: "0 0 12px 12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Select
          value={limit}
          onChange={handleLimitChange}
          size="small"
          IconComponent={ExpandMoreIcon}
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                marginTop: "6px",
                borderRadius: "12px",
                border: "1px solid rgba(25, 28, 30, 0.08)",
                boxShadow: "0px 12px 32px rgba(25, 28, 30, 0.06)",
                padding: "4px 0",
                "& .MuiMenuItem-root": {
                  fontSize: "14px",
                  color: "#4D5156",
                  borderRadius: "6px",
                  margin: "2px 8px",
                  padding: "8px 12px",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    backgroundColor: "#F4F6F9",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "#F4F6F9",
                    },
                  },
                },
              },
            },
          }}
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#4D5156",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid rgba(25, 28, 30, 0.08)",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#EBEFF5",
            },
            "& .MuiSelect-select": {
              padding: "8px 16px",
              paddingRight: "36px !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused": {
              backgroundColor: "#FFFFFF",
              boxShadow: `0 0 0 2px ${theme.palette.primary.light}40`,
            },
            "& .MuiSelect-icon": {
              color: "#8B95A1",
              right: "8px",
              transition: "transform 0.2s ease",
            },
            "&.Mui-expanded .MuiSelect-icon": {
              transform: "rotate(180deg)",
            },
          }}
        >
          {limitOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}개씩 보기
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body2" sx={{ fontWeight: 500, color: "#4D5156" }}>
          {`전체 ${(totalCount || 0).toLocaleString()} / ${currentDisplayedCount * page + currentDisplayedCount}번째 표시 중`}
        </Typography>
      </Box>

      <MuiPagination
        page={page}
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={(_, newPage) => onChange(newPage)}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: () => "이전",
              next: () => "다음",
            }}
            {...item}
            sx={{
              margin: "0 4px",
              borderColor: "#E0E3E6",
              color: "#4D5156",
              "&.Mui-selected": {
                backgroundColor: "transparent",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontWeight: 700,
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(0, 6, 102, 0.04)",
              },
              "&.MuiPaginationItem-previousNext": {
                padding: "0 12px",
                border: "1px solid #E0E3E6",
              },
              "&.Mui-disabled": {
                opacity: 0.5,
              },
            }}
          />
        )}
      />
    </Box>
  );
}
