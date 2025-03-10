import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { useStyles } from "./BaseTextArea.styles";
import debounce from "lodash/debounce";

interface TextareaProps {
  initialValue?: string | null;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (txt: string) => void;
  isFull?: boolean;
  isBorder?: boolean;
  isDefault?: boolean;
}

const BaseTextArea: React.FC<TextareaProps> = ({
  initialValue = "",
  onChangeText,
  placeholder = "Nhập nội dung...",
  disabled = false,
  onBlur,
  isFull = false,
  isBorder = false,
  isDefault = false,
}) => {
  const [value, setValue] = useState<string | null>(initialValue);
  const classes = useStyles();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue !== null) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const debouncedOnChangeText = useMemo(
    () => debounce((value: string) => onChangeText?.(value), 300),
    [onChangeText],
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedOnChangeText(newValue);

    if (textareaRef.current) {
      textareaRef.current.style.height = "20px"; // Reset height để tính toán lại
      const newHeight = Math.min(textareaRef.current.scrollHeight, 60); // Tối đa 60px (3 dòng)
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (onBlur) onBlur(value || "");
    },
    [onBlur, value],
  );

  return (
    <div
      style={{
        width: isFull ? "100%" : "92%",
        padding: isFull ? "0px" : "8px",
        paddingLeft: "0px",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value || ""}
        onChange={handleChange}
        className={classes.txtarea}
        disabled={disabled}
        onBlur={handleBlur}
        style={{
          fontFamily: "Roboto",
          height: isDefault ? "auto" : "18px", // Chiều cao mặc định 1 dòng
          overflow: "hidden", // Ẩn thanh cuộn
          ...(isDefault && {
            minHeight: "40px",
            borderRadius: "4px",
            padding: "10px 8px",
          }),
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default BaseTextArea;
