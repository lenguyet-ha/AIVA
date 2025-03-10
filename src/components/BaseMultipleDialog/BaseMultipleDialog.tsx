import React, { useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useStyles } from "./BaseMultipleDialog.styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
import dayjs, { Dayjs } from "dayjs";

interface ConfigItem {
  label: string;
  key: string;
  type: string;
  required: boolean;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  txtHeader: string;
  txtContent?: string;
  config: ConfigItem[];
  data: Record<string, any>;
  isOpenWithData?: boolean;
  onSubmit: (values: Record<string, any>) => void;
}

const MultipleDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  txtHeader,
  txtContent,
  config,
  data,
  onSubmit,
  isOpenWithData,
}) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data, isOpenWithData]); // Chỉ chạy khi `data` thay đổi

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (key: string, value: any, type?: string) => {
    let formattedValue = value;
    setErrors({});

    setFormValues(prev => ({ ...prev, [key]: formattedValue }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    config.forEach(field => {
      if (field.required && !formValues[field.key]?.toString().trim()) {
        newErrors[field.key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      dispatch(showErrorSnackBar("Vui lòng nhập thông tin cần thiết!"));
      return;
    }
    setErrors({});
    onSubmit(formValues);
    setFormValues(data);
  };

  if (!isOpen) return null;

  const renderField = (field: ConfigItem) => {
    return (
      <>
        {field.type === "text" ? (
          <label className={classes.fieldLabel}>{field.label}</label>
        ) : (
          <label className={classes.fieldLabeldata}>{field.label}</label>
        )}
        {field.type === "text" && (
          <TextField
            className={classes.inputField}
            variant="outlined"
            value={formValues[field.key] || ""}
            onChange={e => handleChange(field.key, e.target.value)}
            error={!!errors[field.key]}
            helperText={errors[field.key] ? "Không được để trống" : ""}
          />
        )}
        {field.type === "date" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={
                formValues[field.key] ? dayjs(formValues[field.key]) : null
              } // Ensure it's Dayjs
              onChange={date => handleChange(field.key, date, "date")}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: errors[field.key],
                  helperText: errors[field.key] ? "Vui lòng chọn ngày" : "",
                },
              }}
              // renderInput={params => (
              //   <TextField
              //     {...params}
              //     className={classes.inputField}
              //     error={!!errors[field.key]}
              //     helperText={errors[field.key] ? "Vui lòng chọn ngày" : ""}
              //   />
              // )}
            />
          </LocalizationProvider>
        )}
      </>
    );
  };

  return (
    <div className={classes.dialogOverlay}>
      <div className={classes.dialogBox}>
        <div className={classes.viewHeader}>
          <span className={classes.txtheader}>{txtHeader}</span>
          <img
            src={"/images/svg/icon_close.svg"}
            alt="icon_close"
            className={classes.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={classes.viewcontent}>
          {config.map(field => renderField(field))}
        </div>
        <div className={classes.viewbtn}>
          <div className={classes.viewaction}>
            <Button
              className={classes.closeButton}
              onClick={() => {
                setFormValues({});
                setErrors({});
                onClose();
              }}
            >
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

export default MultipleDialog;
