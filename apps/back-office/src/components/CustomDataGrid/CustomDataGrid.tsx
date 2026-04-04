import { forwardRef } from "react";
import {
  DataGrid as MuiDataGrid,
  type DataGridProps,
  type GridColDef,
} from "@mui/x-data-grid";
import { theme } from "@libs/theme";

export type { GridColDef } from "@mui/x-data-grid";
export type CustomDataGridProps = Omit<
  DataGridProps,
  "rows" | "columns" | "loading"
> & {
  rows: DataGridProps["rows"];
  columns: GridColDef[];
  loading?: boolean;
  headerClassName?: string;
};

export const CustomDataGrid = forwardRef<HTMLDivElement, CustomDataGridProps>(
  ({ rows, columns, loading = false, headerClassName, sx, ...props }, ref) => {
    const columnsWithHeaderClass = columns.map((col) => ({
      ...col,
      headerClassName: col.headerClassName || headerClassName,
    }));

    return (
      <MuiDataGrid
        ref={ref}
        rows={rows}
        columns={columnsWithHeaderClass}
        loading={loading}
        hideFooterPagination
        hideFooter
        disableColumnMenu
        disableColumnSorting
        disableRowSelectionOnClick
        rowHeight={56}
        columnHeaderHeight={56}
        sx={{
          fontSize: "12px",
          overflow: "hidden",
          borderRadius: "0 0 12px 12px",
          border: "none",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: `${theme.palette.grey[200]}`,
            color: `${theme.palette.primary.light}`,
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 24px",
          },
          "& .MuiDataGrid-cell": {
            color: theme.palette.text.secondary, // 모던한 진한 회색 (또는 theme.palette.text.primary 사용)
            fontSize: "14px",
            padding: "0 24px",
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "#fff",
          },
          "& .MuiCheckbox-root:hover": {
            backgroundColor: "transparent",
          },
          "& .css-2rjb2j-MuiButtonBase-root-MuiSwitchBase-root-MuiCheckbox-root":
            {
              padding: "0",
            },
          ...sx,
        }}
        {...props}
      />
    );
  },
);

CustomDataGrid.displayName = "CustomDataGrid";
