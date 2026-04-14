import { useState, useMemo, type ReactElement } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "@libs/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { router } from "@routes";

interface MenuItem {
  text: string;
  icon?: ReactElement;
  path?: string;
  children?: MenuItem[];
}

const MenuItems: MenuItem[] = [
  {
    text: "대시보드",
    icon: <DashboardIcon />,
    path: router.DASHBOARD.INDEX,
  },
  {
    text: "도서관/계약 관리",
    icon: <MenuBookIcon />,
    children: [
      { text: "도서관 목록", path: router.CLIENT.INDEX },
      { text: "라이센스 관리", path: router.CLIENT.LICENSE },
    ],
  },
  {
    text: "콘텐츠 관리",
    icon: <MovieIcon />,
    path: router.CONTENT.INDEX,
  },
  {
    text: "시스템 설정",
    icon: <SettingsIcon />,
    children: [{ text: "계정 관리", path: router.SYSTEM.MEMBER }],
  },
];

// --- 서브 메뉴 아이템 컴포넌트 ---
function MenuList({ item }: { item: MenuItem }) {
  // 1. destructure props
  // 2. lib hooks
  const navigate = useNavigate();
  const location = useLocation();

  // 3. state hooks
  const hasActiveChild = useMemo(() => {
    return item.children?.some(
      (child: MenuItem) => child.path === location.pathname,
    );
  }, [item.children, location.pathname]);
  const [open, setOpen] = useState(hasActiveChild);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const isSelected = item.path === location.pathname || hasActiveChild;
  const hasChildren = Boolean(item.children);

  // 7. effect hooks
  // 8. handlers
  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  // 9. render
  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: "48px",
            justifyContent: "initial",
            padding: "12px 8px 12px 20px",
            margin: "0 16px",
            backgroundColor: isSelected ? "#EDF0F4" : "transparent",
            "&::before": isSelected
              ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "6px",
                  backgroundColor: theme.palette.primary.main,
                }
              : undefined,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              marginRight: "12px",
              justifyContent: "center",
              color: isSelected
                ? theme.palette.primary.main
                : theme.palette.primary.light,
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={item.text}
            slotProps={{
              primary: {
                whiteSpace: "nowrap",
                fontSize: "16px",
                fontWeight: 700,
                color: isSelected
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
              },
            }}
          />
          {hasChildren && (
            <ExpandMoreIcon
              sx={{
                color: isSelected
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          )}
        </ListItemButton>
      </ListItem>

      {/* 하위 메뉴 영역 */}
      {hasChildren && item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: MenuItem) => {
              const isChildSelected = location.pathname === child.path;

              return (
                <ListItemButton
                  key={child.text}
                  onClick={() => child.path && navigate(child.path)}
                  sx={{
                    minHeight: "40px",
                    pl: "54px",
                    margin: "0 16px",
                    justifyContent: "initial",
                  }}
                >
                  <ListItemText
                    primary={child.text}
                    slotProps={{
                      primary: {
                        fontSize: "14px",
                        fontWeight: 500,
                        color: isChildSelected
                          ? theme.palette.primary.main
                          : theme.palette.primary.light,
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
          .
        </Collapse>
      )}
    </>
  );
}

export function Navigation() {
  return (
    <Box sx={{ overflowX: "hidden", marginTop: "16px" }}>
      <List>
        {MenuItems.map((menu) => (
          <MenuList key={menu.text} item={menu} />
        ))}
      </List>
    </Box>
  );
}
