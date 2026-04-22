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
  onlyPage?: boolean; // true면 페이지만 렌더링
  siblingCount?: number; // 현재 페이지 양옆에 보여줄 페이지 번호 개수 (기본 1)
  boundaryCount?: number; // 맨 앞, 맨 뒤에 보여줄 페이지 번호 개수 (기본 1)
}) {
  const {
    page = 1,
    limit,
    totalCount,
    onChange,
    onLimitChange,
    limitOptions = [10, 30, 50],
    onlyPage = false,
    siblingCount = 1,
    boundaryCount = 1,
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
        justifyContent: onlyPage ? "center" : "space-between", // onlyPage일 때 가운데 정렬
        alignItems: "center",
        padding: "24px",
        borderTop: `1px solid ${theme.palette.grey[100]}`,
        background: theme.palette.grey[200],
        borderRadius: "0 0 12px 12px",
      }}
    >
      {/* onlyPage가 false일 때만 드롭다운 및 통계 텍스트 표시 */}
      {!onlyPage && (
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
              // value가 any로 넘어가는 것을 방지하기 위해 number로 타입 캐스팅
              <MenuItem key={option} value={option as number}>
                {option}개씩 보기
              </MenuItem>
            ))}
          </Select>

          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#4D5156" }}
          >
            {`전체 ${(totalCount || 0).toLocaleString()} / ${
              (page - 1) * limit + currentDisplayedCount
            }번째 표시 중`}
          </Typography>
        </Box>
      )}

      {/* 페이지네이션 영역 */}
      <MuiPagination
        page={page}
        count={count}
        siblingCount={siblingCount} // 현재 페이지 기준 양옆 번호 수 조절
        boundaryCount={boundaryCount} // 처음/끝 번호 유지 수 조절
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
