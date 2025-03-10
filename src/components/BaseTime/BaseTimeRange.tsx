import React, { useEffect, useState } from "react";
import { Box, TextField, FormHelperText } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface TimeRangePickerProps {
  labelStart?: string;
  labelEnd?: string;
  initialStartTime?: string; // Giá trị mặc định cho start time (HH:mm)
  initialEndTime?: string; // Giá trị mặc định cho end time (HH:mm)
  onTimeChange: (
    startTime: Date | null,
    endTime: Date | null,
    idRow?: string | null,
  ) => void;
  onErrorChange?: (hasError: boolean) => void; // Thêm prop onErrorChange
  idRow?: string;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  labelStart = "Start Time",
  labelEnd = "End Time",
  onTimeChange,
  onErrorChange,
  initialStartTime,
  initialEndTime,
  idRow,
}) => {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartTimeChange = (newStartTime: dayjs.Dayjs | null) => {
    if (newStartTime && endTime && newStartTime.isAfter(endTime)) {
      setError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      onErrorChange?.(true); // Báo lỗi cho component cha
      return;
    }
    setStartTime(newStartTime);
    setError(null);
    onErrorChange?.(false); // Không có lỗi nữa
    onTimeChange(
      newStartTime?.toDate() || null,
      endTime?.toDate() || null,
      idRow,
    );
  };

  useEffect(() => {
    if (initialStartTime !== "") setStartTime(dayjs(initialStartTime, "HH:mm"));
    if (initialEndTime !== "") setEndTime(dayjs(initialEndTime, "HH:mm"));
  }, [initialStartTime, initialEndTime]);

  const handleEndTimeChange = (newEndTime: dayjs.Dayjs | null) => {
    if (newEndTime && startTime && newEndTime.isBefore(startTime)) {
      setError("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      onErrorChange?.(true); // Không có lỗi nữa

      return;
    }
    setEndTime(newEndTime);
    setError(null);
    onErrorChange?.(false); // Không có lỗi nữa

    onTimeChange(
      startTime?.toDate() || null,
      newEndTime?.toDate() || null,
      idRow,
    );
  };

  const handleTimeChange = (startTime: Date | null, endTime: Date | null) => {
    // Convert to desired time format (HH:mm)
    const formattedStartTime = startTime
      ? dayjs(startTime).format("HH:mm")
      : "";
    const formattedEndTime = endTime ? dayjs(endTime).format("HH:mm") : "";

    // Log the selected time range
    console.log(
      "Selected Time Range:",
      `${formattedStartTime}-${formattedEndTime}`,
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2} flexDirection="column">
        <Box display="flex" gap={1}>
          <Box flex={1}>
            <TimePicker
              value={startTime}
              sx={{
                "& input.MuiOutlinedInput-input": {
                  width: "80px",
                  height: "16px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              onChange={handleStartTimeChange}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small" // Làm nhỏ input
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "50px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "25px",
              }}
            >
              -
            </span>
          </Box>
          <Box flex={1}>
            <TimePicker
              value={endTime}
              onChange={handleEndTimeChange}
              sx={{
                "& input.MuiOutlinedInput-input": {
                  width: "80px",
                  height: "16px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small" // Làm nhỏ input
                  sx={{
                    width: "120px", // Điều chỉnh chiều rộng
                    "& .MuiInputBase-root": { height: 36, fontSize: "14px" }, // Chiều cao và cỡ chữ nhỏ hơn
                  }}
                />
              )}
            />
          </Box>
        </Box>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </LocalizationProvider>
  );
};

export default TimeRangePicker;
