import { createTheme } from "@mui/material";

const shadow = "0 4px 20px 2px rgba(0,0,0,0.05)";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1B258F",
      light: "#44474E",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: shadow,
        },
      },
    },
  },
});
