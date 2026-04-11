import {
  Box,
  FormLabel,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Link } from "react-router-dom";

export function ViewField(props: {
  label: string;
  value: string;
  type?: "text" | "url";
  sx?: SxProps<Theme>;
}) {
  const { label, value, type = "text", sx } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <FormLabel sx={{ fontWeight: "bold", fontSize: "14px" }}>
        {label}
      </FormLabel>
      {type === "url" ? (
        <Link to={value} target="_blank" style={{ textDecoration: "none" }}>
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
      ) : (
        <Typography sx={{ fontSize: "16px", color: "#000", ...sx }}>
          {value}
        </Typography>
      )}
    </Box>
  );
}
