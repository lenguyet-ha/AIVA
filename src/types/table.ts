// material-ui
import { TableCellProps } from "@mui/material";

// types
import { KeyedObject } from "./root";
import { ParamFetch } from "./auth";

export type ArrangementOrder = "asc" | "desc" | undefined;

export type GetComparator = (
  o: ArrangementOrder,
  o1: string,
) => (a: KeyedObject, b: KeyedObject) => number;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: "left" | "right" | "inherit" | "center" | "justify" | undefined;
};

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface ParamObject {
  [key: string]: any;
}

export const TABLE_OPTIONS = {
  enableRowSelection: false,
  enableColumnResizing: true,
  enableColumnOrdering: true,
  enableColumnDragging: false,
  enablePinning: true,
  enableStickyHeader: true,
  manualPagination: true,
};

export interface TableColumnConfig {
  key: string;
  label: string;
  type: string;
  size: number;
  align: string;
  isEdit?: boolean; //cho phép edit
  isDetail?: boolean; //có nút xem chi tiết
  required?: boolean;
  newKey?: string;
  enableClickToCopy?: boolean;
  enableResizing?: boolean;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
  apiSelect?: string;
  params?: ParamFetch[];
  isEvent?: boolean;
  isHistoryPayment?: boolean;
}

export interface TableBorder {
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
}

export interface urlConfigTable {
  add?: string;
  find?: string;
  findById?: string;
  delete?: string;
}
