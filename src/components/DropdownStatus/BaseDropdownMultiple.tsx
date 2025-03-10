import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Checkbox,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import { useStyles } from "./Dropdown.styles";

interface StatusItem {
  name: string;
  status: "success" | "error" | "warning" | "inprogress" | "default";
  id: number;
  disabled?: boolean;
}

interface DropdownWithCheckboxProps {
  options: StatusItem[] | string[];
  onChange?: (selected: number[]) => void;
  handleFocus: () => void;
  onBlur?: (selected: number[]) => void;
  selectedIds: number[];
  limit: number;
  disabled?: boolean;
  isNoBorder?: boolean;
}

const BaseDropdownMultiple: React.FC<DropdownWithCheckboxProps> = ({
  options,
  onChange,
  handleFocus,
  onBlur,
  selectedIds = [],
  limit = 2,
  disabled = false,
  isNoBorder = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // Ensure this is always an array
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const classes = useStyles();

  // Debounce the onChange callback
  const debouncedOnChange = useMemo(
    () => debounce((selected: number[]) => onChange?.(selected), 200),
    [onChange],
  );

  useEffect(() => {
    if (JSON.stringify(selectedOptions) !== JSON.stringify(selectedIds)) {
      setSelectedOptions(selectedIds || []);
    }
  }, [selectedIds]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleOption = useCallback(
    (option: StatusItem) => {
      if (disabled || option.disabled) return;

      const optionId = option.id;
      const newSelectedOptions = selectedOptions?.includes(optionId)
        ? selectedOptions?.filter(item => item !== optionId)
        : [...selectedOptions, optionId];
      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions, debouncedOnChange, disabled],
  );

  const handleBlur = () => {
    setIsFocus(false);
    if (onBlur) {
      onBlur(selectedOptions);
    }
  };

  // Memoize rendering of the options
  const renderedOptions = useMemo(() => {
    return options.map(option => (
      <MenuItem
        key={option.id}
        onClick={() => handleToggleOption(option)}
        disabled={disabled || option.disabled}
      >
        <Checkbox
          checked={selectedOptions?.includes(option.id)}
          disabled={disabled || option.disabled}
          sx={{
            color: "#00BF76",
            "&.Mui-checked": { color: "#00BF76" },
            "&.Mui-disabled": { color: "#d0d0d0" },
          }}
        />
        <ListItemText primary={option.name} />
      </MenuItem>
    ));
  }, [options, selectedOptions, disabled, handleToggleOption]);

  return (
    <div
      onBlur={handleBlur}
      onFocus={() => {
        setIsFocus(true);
        handleFocus();
      }}
      className={classes.container}
    >
      <div
        className={classes.subContainer}
        style={{
          border: isFocus
            ? "1px solid #FD9D68"
            : !isNoBorder
            ? "none"
            : "1px solid rgba(0, 0, 0, 0.23)",
        }}
        onClick={handleClick}
      >
        <div className={classes.viewoption}>
          {selectedOptions?.length > 0 ? (
            <>
              {selectedOptions?.slice(0, limit || 2).map((item, index) => (
                <div key={index} className={classes.txtdropdowncheckbox}>
                  <Typography className={classes.txttypho}>
                    {options.find(option => option.id === item)?.name}
                  </Typography>
                </div>
              ))}
              {selectedOptions?.length > limit && (
                <div className={classes.subtxt}>
                  <Typography className={classes.subtypho}>
                    +{selectedOptions?.length - limit}
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
            filter: (isFocus || selectedOptions?.length > 0) && "unset",
          }}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {renderedOptions}
      </Menu>
    </div>
  );
};

export default React.memo(BaseDropdownMultiple);
