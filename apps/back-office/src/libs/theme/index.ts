import { createTheme } from "@mui/material";

const shadow = "0 4px 20px 2px rgba(0,0,0,0.05)";

declare module "@mui/material/styles" {
  interface Palette {
    chip: {
      info: string;
      success: string;
      warning: string;
      error: string;
      gray: string;
    };
  }
  interface PaletteOptions {
    chip: {
      info: string;
      success: string;
      warning: string;
      error: string;
      gray: string;
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
      gray: "rgba(211, 212, 214, 1)",
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
    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: {
          marginTop: "6px",
          borderRadius: "12px",
          border: "1px solid rgba(25, 28, 30, 0.08)",
          boxShadow: "0px 12px 32px rgba(25, 28, 30, 0.06)",
        },
        list: {
          padding: "4px 0",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
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
            color: "#1B258F",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#F4F6F9",
            },
          },
        },
      },
    },
  },
});
