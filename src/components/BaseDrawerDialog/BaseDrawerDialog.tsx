import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

interface DialogWrapperProps {
  open: boolean; // Trạng thái mở/đóng Dialog
  onClose: () => void; // Hàm callback khi đóng Dialog
  title?: string; // Tiêu đề (nếu có)
  children: React.ReactNode; // Nội dung được truyền từ component khác
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          width: "1200px",
          height: "765px",
          margin: "auto",
          padding: "16px",
        },
      }}
    >
      {/* Header với tiêu đề và nút đóng */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          paddingBottom: "0px",
        }}
      >
        {title && (
          <div
            style={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "24px",
              color: "rgba(23, 43, 77, 1)",
            }}
          >
            {title}
          </div>
        )}
        <img
          src={"/images/svg/icon_close.svg"}
          alt="close"
          onClick={onClose}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />
      </div>

      {/* Body */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
