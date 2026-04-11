import {
  Box,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
import { theme } from "@libs/theme";
import { SearchTextField } from "../SearchTextField";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = 240;
const headerHeight = 80;

export function BaseLayOut() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E0E3E6",
        }}
      >
        {/* 1. 실제 상단바 높이 적용 */}
        <Toolbar sx={{ minHeight: `${headerHeight}px !important` }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              padding: "0 24px",
            }}
          >
            <SearchTextField
              searchStyle="header"
              placeholder="도서관명 검색..."
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <NotificationsIcon sx={{ color: theme.palette.text.secondary }} />
              <Divider orientation="vertical" flexItem />
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Box>
                  <Typography
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    {/* TODO: 유저 정보 표시 */}
                    김정호님
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    사내 관리자
                  </Typography>
                </Box>
                <Avatar sx={{ width: 40, height: 40 }}>JH</Avatar>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: "width 0.2s",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid #E0E3E6",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            boxShadow: "none",
            boxSizing: "border-box",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar sx={{ minHeight: `${headerHeight}px !important` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Typography
                color={theme.palette.primary.main}
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                Back Office B2B
              </Typography>
              <Typography
                color={theme.palette.primary.light}
                sx={{ fontWeight: 600, fontSize: "12px" }}
              >
                관리자 콘솔
              </Typography>
            </Box>
          </Box>
        </Toolbar>
        <Navigation />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "16px 32px 32px 32px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#F7F9FC",
        }}
      >
        <Toolbar sx={{ minHeight: `${headerHeight}px !important` }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              marginTop: "16px",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
