import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { useStyles } from "./PopoverDropdown.styles";
import BorderTextField from "../CustomeTextFieldComponent/BorderTextField";
import DropdownWithStatus from "@/src/components/DropdownStatus/DropdownStatus";
import BaseDropdownMultiple from "../DropdownStatus/BaseDropdownMultiple";
import CustomCalendar from "@/src/components/DatePicker/DatePicker";
import BaseTextArea from "../BaseTextArea/BaseTextArea";
import TimeRangePicker from "../BaseTime/BaseTimeRange";
import { dispatch } from "@/src/store";
import dayjs from "dayjs";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { TextField } from "@mui/material";
interface StatusItemWork {
  text: string;
  status: "success" | "error" | "warning" | "inprogress" | "default";
  value: string;
}

interface PopoverDropdownProps {
  idVal: string;
  options: string[];
  handleFilterChange: (id: string, value: string | number[]) => void;
  filterValues: { [key: string]: string | number[] }; // Nhận filterValues từ component cha
  filterType?:
    | "text"
    | "dropdown"
    | "date"
    | "dropdown_multiple"
    | "dropdown_default"
    | "text_area"
    | "time_range"
    | "text_number"
    | undefined; // Loại filter
  filterType2?:
    | "text"
    | "dropdown"
    | "date"
    | "dropdown_multiple"
    | "dropdown_default"
    | "time_range"
    | undefined; // Loại filter
  listobject?: StatusItemWork[];
  txt?: string;
  txt2?: string;
  idVal2?: string;
}

const PopoverDropdown: React.FC<PopoverDropdownProps> = ({
  idVal,
  options,
  handleFilterChange,
  filterValues,
  filterType,
  listobject,
  txt,
  txt2,
  idVal2,
  filterType2,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  const [timeRange, setTimeRange] = useState<{
    startTime: string | null;
    endTime: string | null;
  }>({
    startTime: null,
    endTime: null,
  });
  const [arrayVal, setArrayVal] = useState<number[]>([]);
  const [arrayVal2, setArrayVal2] = useState<number[]>([]);

  const handleTimeChange = (startTime: Date | null, endTime: Date | null) => {
    setTimeRange({
      startTime: startTime ? dayjs(startTime).format("HH:mm") : null,
      endTime: endTime ? dayjs(endTime).format("HH:mm") : null,
    });
    // Bạn có thể xử lý thời gian tại đây nếu cần
  };

  useEffect(() => {
    // Kiểm tra nếu idVal không có trong filterValues thì clear inputValue
    if (!filterValues[idVal]) {
      setInputValue(""); // Làm sạch input khi filter bị xóa
      setArrayVal([]);
    } else {
      if (Array.isArray(filterValues[idVal])) {
        setArrayVal(filterValues[idVal]);
      } else {
        setInputValue(filterValues[idVal]);
      }
    }
    if (idVal2) {
      if (idVal2 === "time") {
        setTimeRange({
          startTime: filterValues["startTime"]
            ? filterValues["startTime"] + ""
            : "",
          endTime: filterValues["endTime"] ? filterValues["endTime"] + "" : "",
        });
      }
      if (!filterValues[idVal2]) {
        setInputValue2(""); // Làm sạch input khi filter bị xóa
        setArrayVal2([]);
      } else {
        if (Array.isArray(filterValues[idVal2])) {
          setArrayVal2(filterValues[idVal2]);
        } else {
          setInputValue2(filterValues[idVal2]);
        }
      }
    }
  }, [filterValues, idVal, idVal2]); // Kiểm tra mỗi khi filterValues thay đổi
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    clearData();
    setAnchorEl(null);
  };

  const clearData = () => {
    setInputValue("");
    setInputValue2("");
    setArrayVal([]);
    setArrayVal2([]);
    setTimeRange({ startTime: "", endTime: "" });
  };

  const handleSubmit = () => {
    if (filterType === "dropdown_multiple") {
      if (arrayVal.length > 0) {
        handleFilterChange(idVal, arrayVal);
      }
    } else {
      if (inputValue !== null || inputValue !== "") {
        handleFilterChange(idVal, inputValue);
      }
    }
    if (idVal2) {
      if (filterType2 === "dropdown_multiple") {
        if (arrayVal2.length > 0) {
          handleFilterChange(idVal2, arrayVal2);
        }
      } else {
        if (idVal2 === "time") {
          if (!timeRange.startTime && !timeRange.endTime) {
          } else {
            if (hasError) {
              dispatch(
                showErrorSnackBar("Vui lòng nhập khoảng thời gian phù hợp"),
              );
              return;
            } else {
              if (timeRange.startTime) {
                handleFilterChange("startTime", timeRange.startTime);
              }
              if (timeRange.endTime) {
                handleFilterChange("endTime", timeRange.endTime);
              }
            }
          }
        } else {
          if (
            inputValue2 !== null ||
            inputValue2 !== "" ||
            inputValue2 !== undefined
          ) {
            handleFilterChange(idVal2, inputValue2);
          }
        }
      }
      setInputValue2(""); // Reset input text khi submit
      setArrayVal2([]);
    }
    setAnchorEl(null);
    setInputValue(""); // Reset input text khi submit
    setArrayVal([]);
    clearData();
  };

  const renderInputField = (
    filterTypeVal:
      | "text"
      | "dropdown"
      | "date"
      | "dropdown_multiple"
      | "dropdown_default"
      | "text_area"
      | "time_range"
      | "text_number"
      | undefined,
  ) => {
    switch (filterTypeVal) {
      case "text":
        return (
          <BorderTextField
            key={id}
            text={inputValue || ""}
            setText={(value: string) => setInputValue(value)}
            label="Custom Input"
            placeholder="Nhập thông tin"
            variant="outlined"
            id={`textfield`} // Dùng id row để mỗi trường có một id riêng biệt
            onBlur={e => {}} // Khi rời khỏi trường, reset focus
          />
        );
      case "dropdown_default":
        return (
          <DropdownWithStatus
            statusList={listobject ? listobject : []}
            handleFocus={() => {}}
            isCheckFocus={true}
            value={inputValue || ""}
            onChange={value => setInputValue(value + "")}
            keyVal={"none"}
            onBlur={value => {}}
            isNoBorder={true}
          />
        );
      case "dropdown":
        return (
          <DropdownWithStatus
            statusList={listobject ? listobject : []}
            handleFocus={() => {}}
            isCheckFocus={true}
            value={inputValue || ""}
            onChange={value => setInputValue(value + "")}
            keyVal={"work"}
            onBlur={value => {}}
            isNoBorder={true}
          />
        );
      case "dropdown_multiple":
        return (
          <BaseDropdownMultiple
            options={listobject}
            selectedIds={arrayVal}
            onChange={value => console.log(value)}
            handleFocus={() => {}}
            limit={2}
            onBlur={value => setArrayVal(value)}
            isNoBorder={true}
          />
        );
      case "date":
        return (
          <CustomCalendar
            // onChange={handleDateChange}
            handleFocus={() => {}}
            isHighLight={true}
            onBlur={value => setInputValue(value + "")}
            initialDate={inputValue}
            isBorder={true}
          />
        );
      case "text_area":
        return (
          // <CustomCalendar
          //   // onChange={handleDateChange}
          //   handleFocus={() => {}}
          //   isHighLight={true}
          //   onBlur={value => setInputValue(value + "")}
          //   initialDate={inputValue}
          // />
          <BaseTextArea
            placeholder="Nhập nội dung"
            // initialValue={row.original.detail}
            onBlur={e => {
              setInputValue(e + "");
            }} // Khi rời khỏi trường, reset focus
          />
        );
      case "time_range":
        return (
          // <CustomCalendar
          //   // onChange={handleDateChange}
          //   handleFocus={() => {}}
          //   isHighLight={true}
          //   onBlur={value => setInputValue(value + "")}
          //   initialDate={inputValue}
          // />
          <TimeRangePicker
            onTimeChange={handleTimeChange}
            onErrorChange={setHasError} // Nhận lỗi từ con
          />
        );
      case "text_number":
        return (
          <TextField
            value={inputValue || ""}
            onChange={e => {
              let value = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
              value = value.slice(0, 10); // Giới hạn tối đa 10 ký tự

              // Định dạng thành "0000 000 000"
              if (value.length > 7) {
                value = `${value.slice(0, 4)} ${value.slice(
                  4,
                  7,
                )} ${value.slice(7)}`;
              } else if (value.length > 4) {
                value = `${value.slice(0, 4)} ${value.slice(4)}`;
              }

              setInputValue(value);
            }}
            fullWidth
            variant="outlined"
            inputProps={{ maxLength: 12 }} // Bao gồm cả khoảng trắng trong định dạng
            className={classes.input}
            type="number"
          />
        );
      default:
        return (
          <BorderTextField
            key={id}
            text={inputValue || ""}
            setText={(value: string) => setInputValue(value)}
            label="Custom Input"
            placeholder="Nhập thông tin"
            variant="outlined"
            id={`textfield`} // Dùng id row để mỗi trường có một id riêng biệt
            onBlur={e => {}} // Khi rời khỏi trường, reset focus
          />
        );
    }
  };
  const renderInputField2 = (
    filterTypeVal:
      | "text"
      | "dropdown"
      | "date"
      | "dropdown_multiple"
      | "dropdown_default"
      | "time_range"
      | undefined,
  ) => {
    switch (filterTypeVal) {
      case "text":
        return (
          <BorderTextField
            key={id}
            text={inputValue2 || ""}
            setText={(value: string) => setInputValue2(value)}
            label="Custom Input"
            placeholder="Nhập thông tin"
            variant="outlined"
            id={`textfield`} // Dùng id row để mỗi trường có một id riêng biệt
            onBlur={e => {}} // Khi rời khỏi trường, reset focus
          />
        );
      case "dropdown_default":
        return (
          <DropdownWithStatus
            statusList={listobject ? listobject : []}
            handleFocus={() => {}}
            isCheckFocus={true}
            value={inputValue2 || ""}
            onChange={value => setInputValue2(value + "")}
            keyVal={"none"}
            onBlur={value => {}}
            isNoBorder={true}
          />
        );
      case "dropdown":
        return (
          <DropdownWithStatus
            statusList={listobject ? listobject : []}
            handleFocus={() => {}}
            isCheckFocus={true}
            value={inputValue2 || ""}
            onChange={value => setInputValue2(value + "")}
            keyVal={"work"}
            onBlur={value => {}}
            isNoBorder={true}
          />
        );
      case "dropdown_multiple":
        return (
          <BaseDropdownMultiple
            options={listobject}
            selectedIds={arrayVal2}
            onChange={value => console.log(value)}
            handleFocus={() => {}}
            limit={2}
            onBlur={value => setArrayVal2(value)}
            isNoBorder={true}
          />
        );
      case "date":
        return (
          <CustomCalendar
            // onChange={handleDateChange}
            handleFocus={() => {}}
            isHighLight={true}
            onBlur={value => setInputValue2(value + "")}
            initialDate={inputValue2}
          />
        );
      case "time_range":
        return (
          <TimeRangePicker
            onTimeChange={handleTimeChange}
            onErrorChange={setHasError} // Nhận lỗi từ con
            initialStartTime={
              timeRange?.startTime ? timeRange?.startTime + "" : ""
            }
            initialEndTime={timeRange?.endTime ? timeRange?.endTime + "" : ""}
          />
        );
      default:
        return (
          <BorderTextField
            key={id}
            text={inputValue2 || ""}
            setText={(value: string) => setInputValue2(value)}
            label="Custom Input"
            placeholder="Nhập thông tin"
            variant="outlined"
            id={`textfield`} // Dùng id row để mỗi trường có một id riêng biệt
            onBlur={e => {}} // Khi rời khỏi trường, reset focus
          />
        );
    }
  };
  const handleCancel = () => {
    setAnchorEl(null);
    clearData();
    setInputValue(""); // Reset input text khi submit
    setInputValue2("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* Nút Icon Dropdown */}
      <img
        src="/images/svg/icon_dropdown.svg"
        alt="dropdown"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        className={classes.icon}
      />

      {/* Popover hiển thị ngay bên dưới */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ minWidth: 250, padding: "16px" }}>
          <Box className={classes.txtName}>Lọc theo</Box>
          {txt !== "" && <Box className={classes.txt1}>{txt}</Box>}
          {renderInputField(filterType)}
          {txt2 !== "" && idVal2 && (
            <>
              <Box className={classes.txt1}>{txt2}</Box>
              {renderInputField2(filterType2)}
            </>
          )}
          <Box className={classes.listbtn}>
            <Box className={classes.btnCancel} onClick={handleCancel}>
              <Box className={classes.txtCancel}>Hủy</Box>
            </Box>
            <Box className={classes.btnSubmit} onClick={handleSubmit}>
              <Box className={classes.txtSubmit}>Xác nhận</Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default PopoverDropdown;
