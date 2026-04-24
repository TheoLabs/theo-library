import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { theme } from "@libs/theme";
import type React from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchTextField } from "../SearchTextField";

export function ListViewHeader(props: {
  title: string;
  summary?: string;
  searchItems?: { searchKey: string; label: string }[];
  onSearch?: (search: { searchKey: string; searchValue: string }) => void;
  filterButton?: React.ReactNode;
  exportButton?: React.ReactNode;
}) {
  // 1. destructure props
  const { title, summary, searchItems, onSearch, filterButton, exportButton } =
    props;

  // 2. lib hooks
  // 3. state hooks
  const [searchKey, setSearchKey] = useState(searchItems?.[0]?.searchKey);
  const [searchValue, setSearchValue] = useState("");

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      sx={{
        padding: "24px 24px 32px",
        background: theme.palette.grey[200],
        borderRadius: "12px 12px 0 0",
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            color: theme.palette.primary.main,
            fontWeight: 800,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {summary}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {searchItems && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* 1. 검색 조건 (Select) */}
            {searchItems.length > 0 && (
              <TextField
                select
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                size="small"
                // 👇 드롭다운 메뉴창(Paper) 모던 스타일 적용
                slotProps={{
                  select: {
                    IconComponent: ExpandMoreIcon,
                    MenuProps: {
                      PaperProps: {
                        elevation: 0,
                        sx: {
                          marginTop: "6px",
                          borderRadius: "12px",
                          border: "1px solid rgba(25, 28, 30, 0.08)", // 아주 연한 테두리
                          boxShadow: "0px 12px 32px rgba(25, 28, 30, 0.06)", // 둥둥 떠있는 듯한 그림자
                          padding: "4px 0",
                          "& .MuiMenuItem-root": {
                            fontSize: "14px",
                            color: "#4D5156",
                            borderRadius: "6px",
                            margin: "2px 8px", // 벽에 붙지 않도록 좌우 여백
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
                    },
                  },
                }}
                sx={{
                  width: "140px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    transition: "all 0.2s ease-in-out",
                    "& fieldset": {
                      borderColor: "#E0E3E6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B0B8C1",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 2px rgba(0, 6, 102, 0.2)",
                    },
                  },
                  "& .MuiSelect-select": {
                    fontSize: "14px",
                    color: "#4D5156",
                    padding: "8px 14px",
                  },
                  // 👇 아이콘 스타일링 (회전 효과 포함)
                  "& .MuiSelect-icon": {
                    color: "#8B95A1",
                    right: "8px",
                    transition: "transform 0.2s ease",
                  },
                  "& .MuiSelect-iconOpen": {
                    transform: "rotate(180deg)",
                  },
                }}
              >
                {searchItems.map((item) => (
                  <MenuItem key={item.searchKey} value={item.searchKey}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {/* 2. 검색 영역 (Input) */}
            <SearchTextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch?.({ searchKey: searchKey || "", searchValue });
                }
              }}
              size="small"
              placeholder="검색어를 입력하세요..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: theme.palette.primary.light,
                          fontSize: "20px",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {filterButton}
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 4 }}>{exportButton}</Box>
      </Box>
    </Box>
  );
}
