import React from "react";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

interface BaseButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  className,
  disabled,
  onClick,
  loading = false,
}) => {
  return (
    <Button
      className={className}
      variant="contained"
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "20px",
        cursor: "pointer",
        textTransform: "none",
        boxShadow: "unset",
        "&:hover": {
          boxShadow: "0px 4px 12px 0px #0000001A",
        },
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "#ffffff" }} />
      ) : (
        text
      )}
    </Button>
  );
};

export default BaseButton;
