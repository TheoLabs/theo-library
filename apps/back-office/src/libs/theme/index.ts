import { createTheme } from "@mui/material";

const shadow = "0 4px 20px 2px rgba(0,0,0,0.05)";

declare module "@mui/material/styles" {
  interface Palette {
    chip: {
      info: string;
      success: string;
      warning: string;
      error: string;
    };
  }
  interface PaletteOptions {
    chip: {
      info: string;
      success: string;
      warning: string;
      error: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1B258F",
      light: "#44474E",
    },
    secondary: {
      main: "#015dee",
    },
    grey: {
      100: "#E0E3E6",
      200: "#FAFCFD",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
    text: {
      primary: "#1B258F",
      secondary: "#44474E",
    },
    chip: {
      info: "#015dee",
      success: "#4CAF50",
      warning: "#FF9800",
      error: "#F44336",
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          padding: "24px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "16px 0 48px 0",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0",
          color: "#000",
        },
      },
    },
  },
});
