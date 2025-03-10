import React, { useState } from "react";
import {
  Checkbox,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useStyles } from "./Dropdown.styles";
import { style } from "@mui/system";
interface DropdownWithCheckboxProps {
  options: string[]; // Danh sách tên được truyền vào
  onChange?: (selected: string[]) => void; // Callback khi thay đổi giá trị được chọn
  handleFocus: () => void;
  limit: number;
}

const DropdownWithCheckbox: React.FC<DropdownWithCheckboxProps> = ({
  options,
  onChange,
  handleFocus,
  limit = 2,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleOption = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option) // Bỏ chọn
      : [...selectedOptions, option]; // Chọn thêm
    setSelectedOptions(newSelectedOptions);

    if (onChange) {
      onChange(newSelectedOptions);
    }
  };

  return (
    <div
      onBlur={() => {
        setIsFocus(false);
      }}
      onFocus={() => {
        setIsFocus(true);
        handleFocus();
      }}
      className={classes.container}
    >
      {/* Khu vực hiển thị danh sách các item đã chọn */}
      <div
        className={classes.subContainer}
        style={{
          border: isFocus ? "1px solid #FD9D68" : "none",
        }}
        onClick={handleClick}
      >
        <div className={classes.viewoption}>
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.slice(0, limit || 2).map((item, index) => (
                <div key={index} className={classes.txtdropdowncheckbox}>
                  <Typography className={classes.txttypho}>{item}</Typography>
                </div>
              ))}
              {selectedOptions.length > limit && (
                <div className={classes.subtxt}>
                  <Typography className={classes.subtypho}>
                    +{selectedOptions.length - limit}
                  </Typography>
                </div>
              )}
            </>
          ) : (
            <Typography className={classes.defaultcolor}></Typography>
          )}
        </div>
        <img
          src={"/images/svg/icon_dropdown.svg"}
          alt="expanded"
          className={classes.icon}
          style={{
            filter: (isFocus || selectedOptions.length > 0) && "unset",
          }}
        />
      </div>
      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {options.map(option => (
          <MenuItem key={option} onClick={() => handleToggleOption(option)}>
            <Checkbox
              checked={selectedOptions.includes(option)}
              color="success"
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownWithCheckbox;
