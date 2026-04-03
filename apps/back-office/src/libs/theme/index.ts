import { createTheme } from "@mui/material";

const shadow = "0 4px 20px 2px rgba(0,0,0,0.05)";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1B258F",
      light: "#44474E",
    },
    grey: {
      100: "#E0E3E6",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  spacing: "4px",
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: shadow,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontWeight: 500,
        },
      },
    },
  },
});
