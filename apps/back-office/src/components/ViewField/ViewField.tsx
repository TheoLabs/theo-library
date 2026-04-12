import {
  Box,
  FormLabel,
  Typography,
  Chip,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "@libs/theme";

export function ViewField(props: {
  label: string;
  value: string;
  darkTheme?: boolean;
  url?: string;
  type?: "text" | "url" | "chip";
  sx?: SxProps<Theme>;
}) {
  const { label, value, darkTheme = false, type = "text", url, sx } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <FormLabel
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          color: darkTheme ? "#CACACA" : theme.palette.primary.light,
        }}
      >
        {label}
      </FormLabel>

      {type === "text" && (
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: darkTheme ? "#FFF" : "#000",
            ...sx,
          }}
        >
          {value}
        </Typography>
      )}
      {type === "url" && url && (
        <Link to={url} target="_blank" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#000",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "block",
              ...sx,
            }}
          >
            {value}
          </Typography>
        </Link>
      )}

      {type === "chip" && (
        <Chip
          label={value}
          sx={{
            width: "fit-content",
            fontSize: "16px",
            fontWeight: "bold",
            color: darkTheme ? "#FFF" : "#000",
            ...sx,
          }}
        />
      )}
    </Box>
  );
}
