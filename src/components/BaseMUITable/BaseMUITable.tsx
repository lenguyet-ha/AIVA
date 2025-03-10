import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Box,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  Skeleton,
  TextField,
  Popover,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import BaseTableDialog from "../BaseTableDialog/BaseTableDialog";
import { BaseConfirm } from "../BaseConfirm";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import RefreshIcon from "@mui/icons-material/Refresh";

import BaseStatusLabel from "../BaseStatusLabel/BaseStatusLabel";
import {
  convertStatusToVietnamese,
  convertSystem,
  formatDate,
  truncateText,
} from "@/src/helpers/format";
import { useRouter } from "next/router";
import { ArrowDropDown, Settings } from "@mui/icons-material";
interface Option {
  text: string;
  value: string;
}
interface URLConfig {
  edit: string;
  add?: string;
  delete?: string;
}

// Định nghĩa kiểu dữ liệu cho cột
type ColumnType = (typeof COLUMN_TYPE)[keyof typeof COLUMN_TYPE];
interface TableColumn {
  key: string;
  label: string;
  columnType: ColumnType;
  actions?: {
    label: string;
    actionType: "DELETE" | "EDIT" | "VIEW" | "CALL" | "SEND_EMAIL";
  }[];
  options?: Option[];
}

// Định nghĩa kiểu dữ liệu cho hàng
interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  onAction?: (actionType: string, rowData: Record<string, any>) => void;
  pageSize?: number;
  pagination?: any;
  onRefresh?: () => void;
  loading?: boolean;
  limit?: number;
  handleChangeLimit?: (value: number) => void;
  handleChangeCurrentPage?: (value: number) => void;
  onSearch?: (value: string) => void;
  urlVal?: URLConfig;
  isSearch?: boolean;
  isViewAnotherLink?: boolean;
  linkView?: string;
  isCheckAll?: boolean;
  isAdd?: boolean;
}

const BaseMUITable: React.FC<TableProps> = ({
  columns,
  data,
  onAction,
  pageSize = 5,
  pagination,
  onRefresh,
  loading = false,
  limit = 10,
  handleChangeLimit,
  handleChangeCurrentPage,
  onSearch,
  urlVal,
  isSearch = false,
  isViewAnotherLink = false,
  linkView,
  isCheckAll = false,
  isAdd = false,
}) => {
  // State cho phân trang
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [currentId, setCurrentId] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const [currentRow, setCurrentRow] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [openCfm, setOpenCfm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  // State lưu trạng thái cột nào đang hiển thị
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}),
  );
  const openActions = Boolean(anchorEl2);
  const list_pageIndex = ["10", "25", "50"];
  // State cho Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // Xử lý chuyển trang
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (newPage === page) {
      return;
    }
    setPage(newPage);
    if (handleChangeCurrentPage) {
      handleChangeCurrentPage(newPage);
    }
  };

  // Xử lý bật/tắt cột
  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClickActions = (
    event: React.MouseEvent<HTMLElement>,
    rowData: Record<string, any>,
  ) => {
    setCurrentRow(rowData); // Cập nhật state
    setAnchorEl2(event.currentTarget); // Mở popover sau khi state đã cập nhật
  };

  // Xử lý làm mới dữ liệu
  const handleRefreshData = () => {
    if (onRefresh) {
      onRefresh(); // Chờ `onRefresh` hoàn thành
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Đóng popover
  const handleCloseActions = () => {
    setAnchorEl2(null);
  };

  const handleOpenDialog = () => {
    setViewMode(false);
    setEditMode(false);
    const initialData: Record<string, any> = {};
    columns.forEach(col => {
      if (col.key !== "id") {
        if (col.columnType === "TEXT") initialData[col.key] = "";
        if (col.columnType === "NUMBER") initialData[col.key] = 0;
        if (col.columnType === "DATE")
          initialData[col.key] = new Date().toISOString().split("T")[0];
        if (col.columnType === "DROPDOWN") {
          initialData[col.key] =
            col.options && col.options.length > 0 ? col.options[0].value : "";
        }
        if (col.columnType === "DROPDOWNWITHTEXT") {
          initialData[col.key] = [];
        }
      }
    });
    console.log(initialData);

    setFormData(initialData);
    setDialogOpen(true);
  };

  // Xử lý thay đổi giá trị trong Dialog
  const handleFormChange = (key: string, value: any) => {
    console.log(value);

    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (editMode) {
      // Cập nhật hàng đã chỉnh sửa trong tableData
      // setTableData(prevData =>
      //   prevData.map(row => (row.id === formData.id ? formData : row)),
      // );
      console.log('hehe')
    } else {
      console.log("hewhe")
      if (formData?.status && Object.entries(formData?.status).length > 0) {
        formData.status = formData?.status?.value;
      }
      // setTableData([...tableData, { id: tableData.length + 1, ...formData }]);
    }
    if (onAction) {
    console.log("heheeee")
      onAction(editMode ? COLUMN_TYPE.EDIT : COLUMN_TYPE.ADD, formData);
    }
    setDialogOpen(false);
    setEditMode(false); // Reset chế độ chỉnh sửa
  };

  // Xử lý mở dialog khi sửa hàng
  const handleEditRow = (rowData: Record<string, any>) => {
    setCurrentId(rowData?.id);
    setFormData({ ...rowData });
    setEditMode(true);
    if (urlVal) {
      router.push(`${urlVal.edit}/${rowData?.id}`);
      return;
    }
    setDialogOpen(true);
  };

  const handleViewRow = (rowData: Record<string, any>) => {
    setCurrentId(rowData?.id);
    setFormData({ ...rowData }); // Giữ nguyên dữ liệu
    setEditMode(false);
    if (isViewAnotherLink) {
      if (linkView) {
        router.push(`/${linkView}/${rowData?.id}`);
        return;
      }
    }
    setViewMode(true); // Bật chế độ xem
    setDialogOpen(true);
  };

  // Mở dialog xác nhận xóa
  const handleDeleteRow = (rowData: Record<string, any>) => {
    setFormData({ ...rowData });
    setOpenCfm(true);
  };

  // Đóng Cfm
  const onCloseCfm = () => {
    setOpenCfm(false);
  };

  const handleAction = (rowData: Record<string, any>, type: string) => {
    switch (type) {
      case COLUMN_TYPE.EDIT:
        handleEditRow(rowData);
        break;
      case COLUMN_TYPE.VIEW:
        handleViewRow(rowData);
        break;
      case COLUMN_TYPE.DELETE:
        handleDeleteRow(rowData);
        break;
      default:
        break;
    }
    setAnchorEl2(null);
    setCurrentRow({});
  };

  // Hàm xóa category
  const handleDeleteCategory = () => {
    if (onAction) {
      onAction(COLUMN_TYPE.DELETE, formData);
    }
    setOpenCfm(false);
  };

  const isLastLoginMoreThan30Days = (lastLogin: string) => {
    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - lastLoginDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24); // Tính số ngày chênh lệch
    return diffDays > 30;
  };

  // useEffect(() => {
  //   const totalPagesVal = Math.ceil(tableData.length / rowsPerPage);
  //   console.log(tableData.length);

  //   setTotalPages(totalPagesVal);
  // }, [tableData]);

  useEffect(() => {
    console.log("data", tableData);
    if (data) {
      setTableData(data);
    
    }
  }, [data]);

  useEffect(() => {
    if (pagination) {
      setPage(pagination.currentPage);
      setTotalPages(pagination.pageCount);
    }
  }, [pagination]);

  const getActionColor = (
    actionType: string,
  ): "error" | "primary" | "secondary" => {
    switch (actionType) {
      case COLUMN_TYPE.DELETE:
        return "error";
      case COLUMN_TYPE.EDIT:
        return "primary";
      case COLUMN_TYPE.CALL:
        return "error";
      case COLUMN_TYPE.SEND_EMAIL:
        return "primary";
      default:
        return "secondary";
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(
      prev =>
        prev.includes(id)
          ? prev.filter(rowId => rowId !== id) // Nếu đã chọn thì bỏ chọn
          : [...prev, id], // Nếu chưa chọn thì thêm vào danh sách
    );
  };

  const getColor = (actionType: string): string => {
    switch (actionType) {
      case COLUMN_TYPE.DELETE:
        return "#d32f2f";
      case COLUMN_TYPE.EDIT:
        return "#1976d2";
      case COLUMN_TYPE.CALL:
        return "#1976d2";
      case COLUMN_TYPE.SEND_EMAIL:
        return "#d32f2f";
      default:
        return "#9c27b0";
    }
  };

  const renderCellContent = useCallback(
    (column, row) => {
      // console.log("row", row);
      // console.log("column", column);
      if (column.columnType === "ACTION" && column.actions) {
        return (
          <IconButton
            onClick={e => {
              handleClickActions(e, row);
            }}
          >
            <Settings />
          </IconButton>
        );
      }
      if (column.columnType === COLUMN_TYPE.DROPDOWN_HIGHLIGHT) {
        return (
          <>
            <Box
              sx={{
                width: "100%",
                ...(column.key === "accountStatus" &&
                  row["accountStatus"] === "NearExpiration" && {
                    marginLeft: "10px",
                  }),
              }}
            >
              <BaseStatusLabel
                statusKey={row[column.key] || ""}
                text={
                  column?.options?.filter(
                    item => item.value === row[column.key],
                  )[0]?.text || ""
                }
              />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {column.key === "accountStatus" &&
                row["accountStatus"] === "NearExpiration"
                  ? `(Còn ${row["remainingDays"]} ngày nữa)`
                  : ""}
              </p>
            </Box>
          </>
        );
      }
      if (column.key === "isSystem") {
        return convertSystem(row[column.key]);
      }
      if (column.columnType === COLUMN_TYPE.DATE) {
        return convertSystem(formatDate(row[column.key]));
      }
      if (column.columnType === COLUMN_TYPE.DROPDOWN) {
        return (
          <TextField
            select
            fullWidth
            required={column.required}
            value={row[column.key] || ""}
            // error={!!errors[column.key]}
            disabled={viewMode}
            // helperText={errors[column.key] || ""}
            onChange={e => console.log(e.target.value)} // Truyền giá trị của `value` thay vì `text`
          >
            {column.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {" "}
                {/* Sử dụng `value` trong `MenuItem` */}
                {option.text} {/* Hiển thị `text` */}
              </MenuItem>
            ))}
          </TextField>
        );
      }
      if (column.columnType === COLUMN_TYPE.DROPDOWNWITHTEXT) {
        return (
          <span>
            {row[column.key] && row[column.key]?.length > 0
              ? row[column.key]?.map(value => value.name).join(", ")
              : ""}
          </span>
        );
      }

      if (column.key === "link") {
        return (
          <a
            onClick={() => {
              window.open(row[column.key]);
            }}
            style={{
              cursor: "pointer",
              color: "blue",
            }}
          >
            {convertSystem(row[column.key])}
          </a>
        );
      }
      if (column.isDate) {
        return <span>{truncateText(formatDate(row[column.key]))}</span>;
      }
      if (column.key === "lastLogin") {
        return (
          <span
            style={{
              color: isLastLoginMoreThan30Days(row[column.key])
                ? "red"
                : "black",
            }}
          >
            {truncateText(row[column.key])}
          </span>
        );
      }
      if (column.key === "info") {
        return (
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => router.push(`/${linkView}/${row?.id}`)}
          >
            {truncateText(row[column.key]?.lastName) +
              " " +
              truncateText(row[column.key]?.firstName)}
          </span>
        );
      }
      if (column.key === "surveyTag") {
        return (
          <span>
            {truncateText(row[column.key])
              ? truncateText(row[column.key])?.replace(/,/g, ", ")
              : ""}
          </span>
        );
      }
      return truncateText(row[column.key]);
    },
    [handleAction, currentRow], // Chỉ phụ thuộc vào `handleAction`, tránh re-render không cần thiết
  );

  const handleSetLimit = (value: number) => {
    if (handleChangeLimit) {
      handleChangeLimit(value);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]); // Nếu tất cả đã được chọn, bỏ chọn hết
    } else {
      setSelectedRows(tableData.map(row => row.id)); // Chọn tất cả
    }
  };

  return (
   
    <Paper sx={{ padding: 2, borderRadius: "10px" }}>
      {/* Dropdown Ẩn/Hiện Cột */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={3} justifyContent="center">
          {isSearch && (  
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm..."
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px", // ✅ Chiều cao cho cả input
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px", // ✅ Căn chỉnh padding bên trong
                },
              }}
              value={searchText}
              onChange={e => handleSearch(e.target.value)}
            />
          )}
          {!isAdd && (
            <IconButton
              onClick={handleOpenDialog}
              size="small"
              sx={{
                borderRadius: "8px",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                mr: 1,
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <IconButton onClick={handleRefreshData}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {columns.map(column => (
              <MenuItem
                key={column.key}
                onClick={() => toggleColumnVisibility(column.key)}
              >
                <Checkbox checked={visibleColumns[column.key]} />
                {column.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          {/* Header của bảng */}
          <TableHead>
            <TableRow>
              {isCheckAll && (
                <TableCell>
                  <Checkbox
                    checked={
                      selectedRows.length === tableData.length &&
                      tableData.length > 0
                    }
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < tableData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              {columns
                .filter(column => visibleColumns[column.key]) // Chỉ hiển thị cột được chọn
                .map(column => (
                  <TableCell
                    key={column.key}
                    align="left"
                    sx={{
                      fontWeight: "bold",
                      minWidth:
                        column.columnType === "ACTION" ? "100px" : "150px",
                      position:
                        column.columnType === "ACTION" ? "sticky" : "static",
                      right: column.columnType === "ACTION" ? 0 : "auto",
                      backgroundColor: "white",
                      zIndex: column.columnType === "ACTION" ? 1000 : "auto",
                      maxWidth: "200px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          {/* Body của bảng */}
          <TableBody>
            {loading
              ? [...Array(limit)].map((_, index) => (
                  <TableRow key={index}>
                    {columns.map(column => (
                      <TableCell key={column.key}>
                        <Skeleton variant="text" width="100%" height={30} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {isCheckAll && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </TableCell>
                    )}
                    {columns
                      .filter(column => visibleColumns[column.key]) // Chỉ hiển thị cột được chọn
                      .map(column => (
                        <TableCell
                          key={column.key}
                          align="left"
                          style={{
                            minWidth:
                              column.key === "actions" ? "100px" : undefined,
                            position:
                              column.columnType === "ACTION"
                                ? "sticky"
                                : "static",
                            right: column.columnType === "ACTION" ? 0 : "auto",
                            backgroundColor: "white",
                            zIndex:
                              column.columnType === "ACTION" ? 1000 : "auto",
                            alignItems: "center",
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {renderCellContent(column, row)}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <TextField
          select
          value={limit}
          onChange={e => handleSetLimit(Number(e.target.value))}
          sx={{
            width: 72,
            height: 40,
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              padding: "8px",
            },
          }}
        >
          {list_pageIndex.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="large"
          shape="rounded"
        />
      </Box>
      <Popover
        id="popover-actions"
        open={openActions}
        anchorEl={anchorEl2}
        onClose={handleCloseActions}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "10px" }}>
          {/* Item 1: Xếp bàn */}
          {columns
            ?.filter(column => visibleColumns[column.key])
            ?.filter(item => item.columnType === "ACTION")[0]
            ?.actions?.map((value, index) => (
              <MenuItem
                sx={{ color: getColor(value?.actionType) }}
                onClick={() => handleAction(currentRow, value?.actionType)}
              >
                <ListItemText
                  sx={{ color: getColor(value?.actionType) }}
                  primary={value?.label}
                />
              </MenuItem>
            ))}
        </div>
      </Popover>
      <BaseTableDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setViewMode(false); // Tắt chế độ xem khi đóng
        }}
        columns={columns.filter(
          item => item.key !== "id" && item.key !== "status",
        )}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        editMode={editMode} // Truyền giá trị này để biết đang sửa hay thêm mới
        viewMode={viewMode}
      />
      <BaseConfirm
        open={openCfm}
        title={"Xóa"}
        content={"Bạn có chắc chắn muốn xóa các hàng được chọn?"}
        onClose={onCloseCfm}
        onSubmit={handleDeleteCategory}
      />
    </Paper>
  );
};

export default BaseMUITable;
