import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { SearchTextField, CardBox } from "@components";
import { useState, useRef, useEffect } from "react";
import { useInfiniteSeriesList } from "../../hooks";
import { theme } from "@libs/theme";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export function SeriesSearchSection(props: {
  selectedSeriesId?: number;
  onSelect: (id?: number) => void;
}) {
  // 1. destructure props
  const { selectedSeriesId, onSelect } = props;

  // 2. lib hooks
  // 3. state hooks
  const [limit] = useState(30);
  const [inputText, setInputText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // 4. query hooks
  const {
    seriesList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSeriesList({
    limit,
    filter: {
      searchKey: "title",
      searchValue,
    },
  });

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 8. handlers
  // 9. render

  return (
    <CardBox
      sx={{ maxWidth: "360px", width: "100%", flexDirection: "column", gap: 2 }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <SearchTextField
          placeholder="시리즈명을 입력하세요."
          sx={{ width: "100%" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSearchValue(inputText);
              onSelect(undefined);
            }
          }}
        />
        <IconButton>{/* <FilterButton onlyIcon /> */}</IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <Box sx={{ width: "100%", p: 0 }}>
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : (
          <List sx={{ width: "100%", p: 0 }}>
            {seriesList.map((series, index) => (
              <Box key={`${series.id}-${index}`}>
                {index === 0 && <Divider sx={{ marginBottom: 1 }} />}
                <ListItemButton
                  selected={selectedSeriesId === series.id}
                  onClick={() => onSelect(series.id)}
                  sx={{
                    borderRadius: "8px",
                    mb: 1,
                    padding: "12px 16px",
                    border: "1px solid transparent",
                    transition: "all 0.2s ease",
                    "&.Mui-selected": {
                      backgroundColor: `${theme.palette.primary.light}15`,
                      border: `1px solid ${theme.palette.primary.main}`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.light}25`,
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor:
                          selectedSeriesId === series.id
                            ? theme.palette.primary.main
                            : theme.palette.grey[200],
                        color:
                          selectedSeriesId === series.id
                            ? "#fff"
                            : theme.palette.grey[600],
                        width: 40,
                        height: 40,
                      }}
                    >
                      <ImportContactsIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={series.title} />
                </ListItemButton>
                <Divider sx={{ marginBottom: 1 }} />
              </Box>
            ))}

            <Box
              ref={observerTarget}
              sx={{
                width: "100%",
                py: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isFetchingNextPage && (
                <CircularProgress size={24} color="primary" />
              )}
            </Box>
          </List>
        )}
      </Box>
    </CardBox>
  );
}
