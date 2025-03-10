import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    select: {
      color: "#44546F",
      fontWeight: 700,
      fontSize: "11px",
      lineHeight: "16px",
      borderRadius: "5px",
      minWidth: "100px",
      border: "none",
    },
    menuItem: {
      color: "#44546F",
      fontWeight: 700,
      fontSize: "11px",
      lineHeight: "16px",
      borderRadius: "5px",
      padding: "8px 12px",
    },
  }),
);

interface DropdownProps {
  options: { eventName: string; id: string; date: string }[]; // Mảng các option
  id: string; // Prop `id` từ component cha
  onSelect?: (selected: string, id: string) => void; // Hàm callback nhận cả selected và id
  initialValue?: string;
  onBlur?: (id: string) => void; // Hàm callback truyền id ra ngoài khi onBlur
}

const BaseDropdown: React.FC<DropdownProps> = ({
  options,
  id,
  onSelect,
  onBlur,
  initialValue,
}) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (initialValue !== undefined && initialValue !== "") {
      setSelectedOption(initialValue);
    }
  }, [initialValue]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (onSelect) {
      onSelect(value, id); // Gọi callback với selected và id từ component cha
    }
    setSelectedOption(value);
  };

  const handleBlur = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (onBlur) {
      onBlur(value); // Gọi callback với selected và id từ component cha
    }
  };

  return (
    <FormControl fullWidth>
      <Select
        value={selectedOption || ""} // Đảm bảo `value` không bị undefined
        onChange={handleChange}
        displayEmpty
        fullWidth
        onBlur={handleBlur}
        className={classes.select}
        sx={{
          "& .MuiInputBase-root": {
            border: "none !important", // Loại bỏ border mặc định
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important", // Loại bỏ border ở outline
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.id} className={classes.menuItem}>
            {option.eventName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BaseDropdown;
