import React, { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";

interface Option {
  text: string;
  value: string;
  _id?: string;
  name?: string;
  code?: string;
}

// Định nghĩa kiểu dữ liệu cho cột
type ColumnType = (typeof COLUMN_TYPE)[keyof typeof COLUMN_TYPE];
interface ColumnConfig {
  key: string;
  label: string;
  columnType: ColumnType;
  options?: Option[]; // Nếu là DROPDOWN, cần danh sách options
  required?: boolean;
  isMultiple?: boolean;
}

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  formData: Record<string, any>;
  onFormChange: (key: string, value: any) => void;
  onSubmit: () => void;
  editMode?: boolean; // Thêm chế độ chỉnh sửa
  viewMode?: boolean; // Chế độ chỉ xem
  size?: "small" | "medium" | "large" | "xslarge"; // Thêm size vào đây
}

const BaseTableDialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  columns,
  formData,
  onFormChange,
  onSubmit,
  editMode = false,
  viewMode = false,
  size = "medium", // Default size là medium
}) => {
  // State để lưu trạng thái lỗi
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Thêm logic để xử lý kích thước của dialog
  const getDialogMaxWidth = () => {
    switch (size) {
      case "small":
        return "xs";
      case "large":
        return "lg";
      case "xslarge":
        return "xl";
      default:
        return "sm"; // Mặc định là "medium"
    }
  };

  // Kiểm tra dữ liệu hợp lệ trước khi submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    columns.forEach(column => {
      // Kiểm tra trường `required`
      if (
        column.required &&
        (!formData[column.key] || formData[column.key] === "")
      ) {
        newErrors[column.key] = "Trường này không được để trống";
        isValid = false;
      }

      // Kiểm tra định dạng URL nếu cột là "link"
      if (column.key === "link" && formData[column.key]) {
        const urlRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/))[\w-]+$/;
        if (!urlRegex.test(formData[column.key])) {
          newErrors[column.key] = "Vui lòng nhập đúng link YouTube";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  useEffect(() => {
    console.log("Form Data: ", formData);
  }, [formData]);
  
  // Xử lý khi nhấn "Lưu"
  const handleSubmit = () => {
    if (validateForm()) {
      setErrors({});
      console.log("hehehloo")
      onSubmit();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // Render input fields
  const renderFields = useCallback(() => {
    return columns.map(column => {
      console.log("formData", formData);
      console.log("formData[column.key]", formData[column.key]);
      console.log("column.key", column.key);
      let inputField;
      if (column.key !== "id") {
        // Kiểm tra xem cột có key là "link"
        if (column.key === "link" && !viewMode) {
          // Kiểm tra nếu là link và đang ở chế độ chỉnh sửa hoặc thêm mới
          inputField = (
            <TextField
              label={column.label}
              type="text"
              fullWidth
              required={column.required}
              value={formData[column.key] || ""}
              error={!!errors[column.key]}
              helperText={errors[column.key] || ""}
              disabled={viewMode}
              onChange={e => onFormChange(column.key, e.target.value)}
              onBlur={() => {
                // Kiểm tra định dạng URL (ví dụ: YouTube)
                const urlRegex =
                  /^(https?:\/\/)?(www\.)?((youtube\.com\/(watch\?v=|embed\/)[\w-]+)|(player\.vimeo\.com\/video\/\d+.*))$/;

                if (
                  formData[column.key] &&
                  !urlRegex.test(formData[column.key])
                ) {
                  setErrors(prev => ({
                    ...prev,
                    [column.key]: "Vui lòng nhập đúng link YouTube",
                  }));
                } else {
                  setErrors(prev => ({ ...prev, [column.key]: "" }));
                }
              }}
            />
          );
        } else {
          switch (column.columnType) {
            case COLUMN_TYPE.TEXT:
              inputField = (
                <TextField
                  label={column.label}
                  type="text"
                  fullWidth
                  required={column.required}
                  value={formData[column.key] || ""}
                  error={!!errors[column.key]}
                  helperText={errors[column.key] || ""}
                  disabled={viewMode}
                  onChange={e => onFormChange(column.key, e.target.value)}
                  onBlur={e => {
                    if (e.target.value) {
                      setErrors(prev => ({ ...prev, [column.key]: "" }));
                    }
                  }}
                />
              );
              break;

            case COLUMN_TYPE.NUMBER:
              inputField = (
                <TextField
                  label={column.label}
                  type="number"
                  fullWidth
                  required={column.required}
                  value={formData[column.key] || ""}
                  error={!!errors[column.key]}
                  helperText={errors[column.key] || ""}
                  disabled={viewMode}
                  onChange={e =>
                    onFormChange(column.key, Number(e.target.value))
                  }
                />
              );
              break;

            case COLUMN_TYPE.DATE:
              inputField = (
                <TextField
                  label={column.label}
                  type="date"
                  fullWidth
                  required={column.required}
                  value={formData[column.key] || ""}
                  error={!!errors[column.key]}
                  disabled={viewMode}
                  helperText={errors[column.key] || ""}
                  onChange={e => onFormChange(column.key, e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              );
              break;

            case COLUMN_TYPE.DROPDOWN:
              if (column.options) {
                inputField = (
                  <TextField
                    select
                    label={column.label}
                    fullWidth
                    required={column.required}
                    value={formData[column.key] || ""}
                    error={!!errors[column.key]}
                    disabled={viewMode}
                    helperText={errors[column.key] || ""}
                    onChange={e => onFormChange(column.key, e.target.value)} // Truyền giá trị của `value` thay vì `text`
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
              break;
            case COLUMN_TYPE.DROPDOWNWITHTEXT:
              if (column.options) {
                inputField = (
                  <TextField
                    select
                    label={column.label}
                    fullWidth
                    required={column.required}
                    value={formData[column.key] || ""}
                    error={!!errors[column.key]}
                    disabled={viewMode}
                    helperText={errors[column.key] || ""}
                    onChange={e => onFormChange(column.key, e.target.value)} // Truyền giá trị của `value` thay vì `text`
                    SelectProps={{
                      multiple: column?.isMultiple,
                      MenuProps: {
                        disablePortal: true, // Đảm bảo dropdown gắn vào container của nó
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        style: {
                          maxHeight: "500px",
                        },
                      },
                    }}
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
              break;

            case COLUMN_TYPE.DROPDOWN_HIGHLIGHT:
              if (column.options) {
                inputField = (
                  <TextField
                    select
                    label={column.label}
                    fullWidth
                    required={column.required}
                    value={formData[column.key] || ""}
                    error={!!errors[column.key]}
                    disabled={viewMode}
                    helperText={errors[column.key] || ""}
                    onChange={e => onFormChange(column.key, e.target.value)} // Truyền giá trị của `value` thay vì `text`
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
              break;
            default:
              inputField = null;
          }
        }
      }

      return (
        <div
          key={column.key}
          style={{ marginBottom: "12px", marginTop: "8px" }}
        >
          {inputField}
        </div>
      );
    });
  }, [columns, formData, onFormChange, errors, viewMode]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={getDialogMaxWidth()}
    >
      <DialogTitle>
        {viewMode ? "Xem Chi Tiết" : editMode ? "Chỉnh Sửa" : "Thêm"}
      </DialogTitle>
      <DialogContent>{renderFields()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Hủy
        </Button>
        {!viewMode && (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editMode ? "Cập Nhật" : "Lưu"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BaseTableDialog;
