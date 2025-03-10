import React, { useState, useMemo, useCallback } from "react";
import { Button, TextField } from "@mui/material";
import { useStyles } from "./BaseDialog.styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Dayjs } from "dayjs";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  txtHeader: string;
  txtContent: string;
  onTextChange?: (text: string) => void;
  onSubmit?: () => void;
  text?: string;
  isDate?: boolean;
  onDateChange?: (date: Dayjs | null) => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  txtHeader,
  txtContent,
  onTextChange,
  onSubmit,
  text = "",
  isDate = false,
  onDateChange,
}) => {
  const classes = useStyles();
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [errorText, setErrorText] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [inputText, setInputText] = useState(text);

  // 📌 Tránh re-render không cần thiết
  const hasError = useMemo(
    () => errorText || errorDate,
    [errorText, errorDate],
  );

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputText(value); // Cập nhật state cục bộ
      setErrorText(value.trim() === "");

      if (onTextChange) {
        onTextChange(value); // Kiểm tra trước khi gọi
      }
    },
    [onTextChange],
  );

  const handleDateChange = useCallback(
    (newDate: Dayjs | null) => {
      setDateValue(newDate);
      setErrorDate(!newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    },
    [onDateChange],
  );

  const handleSubmit = useCallback(() => {
    let hasError = false;

    if (!isDate && !text.trim()) {
      setErrorText(true);
      hasError = true;
    }

    if (isDate && !dateValue) {
      setErrorDate(true);
      hasError = true;
    }

    if (hasError) {
      dispatch(showErrorSnackBar("Vui lòng nhập đầy đủ thông tin!"));
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }, [text, isDate, dateValue, onSubmit]);

  const handleClose = useCallback(() => {
    setErrorText(false);
    setErrorDate(false);
    onClose();
  }, [onClose]);

  // 🔥 Tránh render khi `isOpen = false`
  if (!isOpen) return null;

  return (
    <div className={classes.dialogOverlay}>
      <div className={classes.dialogBox}>
        <span className={classes.txtheader}>{txtHeader}</span>
        <div className={classes.viewcontent}>
          <span className={classes.txtcontent}>{txtContent}</span>

          {isDate ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={dateValue}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    error: errorDate,
                    helperText: errorDate ? "Vui lòng chọn ngày" : "",
                  },
                }}
                // renderInput={params => (
                //   <TextField
                //     {...params}
                //     error={errorDate}
                //     helperText={errorDate ? "Vui lòng chọn ngày" : ""}
                //     className={classes.inputField}
                //   />
                // )}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              className={classes.inputField}
              variant="outlined"
              placeholder="Nhập thông tin"
              value={text}
              onChange={handleTextChange}
              error={errorText}
              helperText={errorText ? "Không được để trống" : ""}
            />
          )}
        </div>

        <div className={classes.viewbtn}>
          <div className={classes.viewaction}>
            <Button className={classes.closeButton} onClick={handleClose}>
              Hủy
            </Button>
            <Button className={classes.submitButton} onClick={handleSubmit}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
