import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./CMSList.styles";
import {
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { lang } from "@/src/constants/lang";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";

interface CMSItem {
  [key: string]: any;
}

interface ConfigItem {
  label: string;
  key: string;
  isView: boolean;
  required?: boolean;
  isNumber?: boolean;
  type?: "text" | "number" | "date" | "DROPDOWN";
  options?: { text: string; value: any }[];
  isMultiple?: boolean;
}

interface CMSListProps {
  data: CMSItem[];
  config: ConfigItem[];
  title?: string;
  onAction?: (formData: CMSItem[]) => void;
}

const CMSList: React.FC<CMSListProps> = ({
  data,
  config,
  title = "Danh sách",
  onAction,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [formData, setFormData] = useState<CMSItem[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Lưu lỗi từng trường
  const textFieldRef = useRef(null);
  // Regex kiểm tra link YouTube
  const urlRegex =
    /^(https?:\/\/)?(www\.)?((youtube\.com\/(watch\?v=|embed\/)[\w-]+)|(player\.vimeo\.com\/video\/\d+.*))$/;

  // Xử lý khi blur (mất focus) một input
  const handleBlur = (index: number, key: string, value: string) => {
    let newErrors = { ...errors };

    // Kiểm tra trường bắt buộc
    const isRequired = config.find(field => field.key === key)?.required;
    if (isRequired && !value.trim()) {
      newErrors[key] = "Trường này là bắt buộc.";
    } else {
      delete newErrors[key]; // Xóa lỗi nếu nhập đúng
    }

    // Kiểm tra link YouTube
    if (key === "link") {
      if (value && !urlRegex.test(value)) {
        newErrors[key] = "Link không hợp lệ! Vui lòng nhập link YouTube.";
      } else {
        delete newErrors[key]; // Xóa lỗi nếu hợp lệ
      }
    }

    setErrors(newErrors);

    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [key]: value };
    setFormData(updatedData);
  };

  // Xử lý khi nhấn "Xác nhận"
  const handleSubmit = () => {
    let newErrors = { ...errors };

    // Kiểm tra tất cả các trường bắt buộc
    config.forEach(field => {
      if (field.required) {
        const isEmpty = formData.some(item => !item[field.key]?.trim());
        if (isEmpty) {
          newErrors[field.key] = "Trường này là bắt buộc.";
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onAction) {
        onAction(formData);
      }
    }
  };

  // Kiểm tra xem có lỗi nào không để bật/tắt nút "Xác nhận"
  const isFormValid = Object.keys(errors).length === 0;

  // Render các loại field
  const renderField = (field: ConfigItem, value: any, index: number) => {
    const errorMessage = errors[field.key];
    if (field.type === COLUMN_TYPE.DROPDOWN) {
      return (
        <TextField
          select
          fullWidth
          required={field.required}
          value={value || ""}
          // error={!!errors[column.key]}
          // disabled={viewMode}
          // helperText={errors[column.key] || ""}
          onChange={e => handleBlur(index, field.key, e.target.value)} // Truyền giá trị của `value` thay vì `text`
          SelectProps={{
            multiple: field?.isMultiple,
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              style: {
                maxHeight: "300px",
              },
            },
          }}
        >
          {field.options &&
            field.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.text} {/* Hiển thị `text` */}
              </MenuItem>
            ))}
        </TextField>
      );
    }
    return (
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={value || ""}
        onBlur={e => handleBlur(index, field.key, e.target.value)}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
      />
    );
  };

  // Xử lý Back: Quay lại URL trước phần `/id`
  const handleBack = () => {
    const pathSegments = router.asPath.split("/");
    if (pathSegments.length > 2) {
      pathSegments.pop();
      router.push("/" + pathSegments[1]);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (data) {
      setFormData([...data]);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <IconButton onClick={handleBack} className={classes.returnBtn}>
          <ArrowBackIcon />
        </IconButton>
        <h2 className={classes.title}>{title}</h2>
      </div>
      <div className={classes.viewgrid}>
        <div className={classes.gridContainer}>
          {formData?.map((item, index) => (
            <div key={index} className={classes.card}>
              {config
                .filter(field => field.isView !== false)
                .map(field => (
                  <div key={field.key} className={classes.field}>
                    <span className={classes.label}>{field.label}:</span>
                    <div className={classes.value}>
                      {renderField(field, item[field.key], index)}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {formData?.length > 0 && (
        <div className={classes.viewbtn}>
          <Button
            variant="contained"
            color="inherit"
            className={classes.cancelButton}
            onClick={handleBack}
          >
            {lang.btnCancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.confirmButton}
            onClick={handleSubmit}
            disabled={!isFormValid} // Nếu có lỗi thì disable
          >
            {lang.btnSubmit}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CMSList;
