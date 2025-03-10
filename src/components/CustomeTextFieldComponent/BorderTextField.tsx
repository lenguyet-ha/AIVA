import React, { useCallback, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box, FormHelperText } from "@mui/material";

type CustomTextFieldProps = {
  text: string | undefined;
  setText: (value: string) => void;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  isNumber?: boolean;
  style?: React.CSSProperties;
  isNormalNumber?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  height?: string;
};

const BorderTextField: React.FC<CustomTextFieldProps> = React.memo(
  ({
    text,
    setText,
    label = "Input",
    placeholder = "Nhập thông tin",
    variant = "outlined",
    onFocus,
    onBlur,
    id,
    isNumber = false,
    style = {},
    isNormalNumber = false,
    disabled = false,
    error,
    helperText,
    height,
  }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
      if (text !== null && text !== undefined && text !== "") {
        setInputValue(text);
      }
    }, [text]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        if (isNumber) {
          value = value.replace(/[^0-9]/g, "");
          if (value) {
            if (isNormalNumber) {
              if (value.length > 10) {
                value = value.slice(0, 10);
              }
              value = value.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
            } else {
              value = `đ${Number(value).toLocaleString("en-US")}`;
            }
          }
        }

        setText(value.trim() || "");
        setInputValue(value);
      },
      [isNumber, isNormalNumber, setText],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
      },
      [onBlur],
    );

    return (
      <Box sx={{ marginTop: "10px", width: "100%" }}>
        <TextField
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          variant={variant}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          id={id}
          fullWidth
          sx={{
            flex: 1,
            height: height || "40px",
            "& .MuiOutlinedInput-root": {
              height: height || "40px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "400",
              borderColor:
                isFocused || inputValue ? "#FD9D68" : "rgba(0, 0, 0, 0.23)",
              "&:hover fieldset": {
                borderColor: "#FD9D68",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FD9D68",
              },
              ...style,
            },
            "& input": {
              padding: "0px 10px",
              "&.Mui-disabled": {
                "WebkitTextFillColor": "rgb(68, 84, 111)",
              },
            },
          }}
        />
        {helperText && error && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    );
  },
);

export default BorderTextField;
