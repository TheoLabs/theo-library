import { useState } from "react";
import { useClientList, useClientStatus } from "@features/client/hooks";
import {
  CardBox,
  DrawerButton,
  FilterButton,
  SearchTextField,
} from "@components";
import { theme } from "@libs/theme";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ClientFilterDrawer } from "../ClientFilterDrawer";

export function ClientSearchSection(props: {
  selectedClientId?: number;
  onSelect: (id?: number) => void;
}) {
  // 1. destructure props
  const { onSelect, selectedClientId } = props;

  // 2. lib hooks
  const { getStatusConfig } = useClientStatus();

  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputText, setInputText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // 4. query hooks

  const { clients, isLoading } = useClientList({
    page,
    limit,
    filter: {
      searchKey: "name",
      searchValue,
    },
  });
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <CardBox sx={{ minWidth: "360px", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <SearchTextField
          placeholder="도서관명을 입력하세요."
          sx={{ width: "100%" }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSearchValue(inputText);
              onSelect(undefined);
              setPage(1);
            }
          }}
        />
        <DrawerButton
          render={({ onOpen }) => <FilterButton onlyIcon onClick={onOpen} />}
        >
          {({ open, onClose }) => (
            <Box>
              <ClientFilterDrawer open={open} onClose={onClose} />
            </Box>
          )}
        </DrawerButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List sx={{ width: "100%", p: 0 }}>
          {clients?.items.map((client, index) => (
            <Box key={client.id}>
              {index === 0 && <Divider sx={{ marginBottom: 1 }} />}
              <ListItemButton
                selected={selectedClientId === client.id}
                onClick={() => onSelect(client.id)}
                sx={{
                  borderRadius: "8px",
                  mb: 1, // 아이템 간의 간격
                  padding: "12px 16px",
                  border: "1px solid transparent", // 기본 테두리 투명하게
                  transition: "all 0.2s ease",
                  // 👇 선택되었을 때의 스타일
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.light}15`, // 아주 연한 테마 색상 배경
                    border: `1px solid ${theme.palette.primary.main}`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.light}25`,
                    },
                  },
                }}
              >
                {/* 좌측 도서관 아이콘 */}
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        selectedClientId === client.id
                          ? theme.palette.primary.main
                          : theme.palette.grey[200],
                      color:
                        selectedClientId === client.id
                          ? "#fff"
                          : theme.palette.grey[600],
                      width: 40,
                      height: 40,
                    }}
                  >
                    <AccountBalanceIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>

                {/* 중앙 텍스트 (이름 및 상태 등) */}
                <ListItemText
                  primary={client.name}
                  secondary={client.address || "주소 정보 없음"} // 서브 텍스트 예시
                />
              </ListItemButton>

              <Divider sx={{ marginBottom: 1 }} />
            </Box>
          ))}
        </List>
      </Box>
    </CardBox>
  );
}
