import React, { useState, useEffect, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker
import { Box, Popover } from "@mui/material";
import { useStyles } from "./DatePicker.styles";
import debounce from "lodash.debounce";

interface CustomCalendarProps {
  onChange?: (date: string) => void; // Callback khi thay đổi ngày
  handleFocus: () => void;
  isHighLight: boolean;
  onBlur?: (date: string | null) => void; // Thêm onBlur vào props
  initialDate?: string | null; // Nhận ngày ban đầu từ component cha
  disabled?: boolean; // Thêm prop disabled để vô hiệu hóa toàn bộ DatePicker
  isOnlyMonth?: boolean; // Thêm prop để quyết định hiển thị tháng hay ngày
  isBorder?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onChange,
  handleFocus,
  isHighLight = false,
  onBlur,
  initialDate = null, // Đặt giá trị mặc định là null
  disabled = false, // Thêm disabled vào props
  isOnlyMonth = false,
  isBorder = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Để quản lý popover
  const [open, setOpen] = useState(false); // Trạng thái popover (mở/đóng)
  const classes = useStyles();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  // Kiểm tra nếu `initialDate` có giá trị và chuyển đổi thành `Date`
  useEffect(() => {
    if (initialDate) {
      // Chuyển string thành Date object
      const dateObj = new Date(
        Date.UTC(
          parseInt(initialDate.split("-")[0]), // Năm
          parseInt(initialDate.split("-")[1]) - 1, // Tháng (tháng bắt đầu từ 0)
          parseInt(initialDate.split("-")[2]), // Ngày
        ),
      );
      setSelectedDate(dateObj);
    }
  }, [initialDate]);
  // Debounce onChange để tránh việc gọi callback quá nhiều lần
  const debouncedOnChange = useMemo(
    () => debounce((date: string) => onChange?.(date), 300),
    [onChange],
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (date) {
        // Đảm bảo là chúng ta làm việc với ngày trong UTC
        const newDate = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        );

        // Tăng thêm 1 ngày
        newDate.setDate(newDate.getDate());

        // Cập nhật lại ngày đã chọn
        setSelectedDate(newDate);

        // Gọi hàm debounced để cập nhật giá trị ngày
        debouncedOnChange(newDate.toISOString().split("T")[0]);
      }

      setOpen(false); // Đóng popover khi chọn ngày
    },
    [debouncedOnChange],
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
      setIsFocus(true);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.subContainer}
        style={{
          border:
            isFocus && isHighLight
              ? "1px solid #FD9D68"
              : isBorder
              ? "1px solid #a0a0a0"
              : "none",
          borderRadius: "5px",
        }}
        onBlur={() => {
          setIsFocus(false);
          if (onBlur && selectedDate) {
            onBlur(selectedDate.toISOString().split("T")[0]); // Gọi onBlur nếu có
          }
        }}
      >
        <span
          onClick={handleClick} // Mở popover khi click vào span
          className={classes.txtchoose}
        >
          {selectedDate
            ? isOnlyMonth
              ? `Tháng ${
                  selectedDate.getMonth() + 1
                }/${selectedDate.getFullYear()}`
              : selectedDate.toISOString().split("T")[0]
            : isOnlyMonth
            ? "Chọn tháng"
            : "Chọn ngày"}
        </span>
        <img
          src={"/images/svg/icon_dropdown.svg"}
          alt="expanded"
          className={classes.icon}
          onClick={handleClick} // Mở popover khi click vào icon
          style={{
            filter: isFocus || selectedDate ? "unset" : undefined,
          }}
        />
        <Popover
          open={open} // Kiểm tra trạng thái mở của Popover
          anchorEl={anchorEl} // Dùng TextField làm anchor
          onClose={handleClose} // Đóng khi click bên ngoài
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2 }}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              dateFormat="yyyy-MM-dd"
              dropdownMode="select"
              className="custom-datepicker"
              disabled={disabled} // Vô hiệu hóa toàn bộ DatePicker nếu disabled = true
            />
          </Box>
        </Popover>
      </div>
    </div>
  );
};

export default React.memo(CustomCalendar);
