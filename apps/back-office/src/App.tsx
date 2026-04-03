import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@libs/theme";
import { AppRouter } from "@routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
