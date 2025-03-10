import React from "react";

interface ListColor {
  bgColor?: string;
  color?: string;
}
interface StatusLabelProps {
  statusKey?:
    | "WaitingAccepted"
    | "WaitingInactive"
    | "Active"
    | "Inactive"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "FREE"
    | "PRO"
    | "ENTERPRISE"
    | "New"
    | "Expired"
    | "NearExpiration"
    | "Paid"
    | "Approved"
    | "Ugent"
    | "High"
    | "Medium";
  text: string;
  bgColor?: string;
  color?: string;
  defaultColor?: ListColor;
}

const BaseStatusLabel: React.FC<StatusLabelProps> = ({
  statusKey = "Inactive", // Mặc định nếu không có giá trị
  text,
  bgColor,
  color,
  defaultColor,
}) => {
  console.log(defaultColor);

  // Các màu mặc định cho từng status
  const statusStyles: Record<string, { bgColor: string; color: string }> = {
    WaitingAccepted: {
      bgColor: bgColor || "#FFDD57", // vàng nhạt
      color: color || "#856404",
    },
    WaitingInactive: {
      bgColor: bgColor || "#FFDD57",
      color: color || "#856404",
    },
    Active: {
      bgColor: bgColor || "#28A745", // xanh lá
      color: color || "#FFFFFF",
    },
    Inactive: {
      bgColor: bgColor || "#DC3545", // đỏ
      color: color || "#FFFFFF",
    },
    HIGH: {
      bgColor: bgColor || "#DC3545", // đỏ đậm
      color: color || "#FFFFFF",
    },
    MEDIUM: {
      bgColor: bgColor || "#FFC107", // vàng cam
      color: color || "#212529",
    },
    LOW: {
      bgColor: bgColor || "#28A745", // xanh lá tươi
      color: color || "#FFFFFF",
    },
    FREE: {
      bgColor: bgColor || "#17A2B8", // xanh dương lơ
      color: color || "#FFFFFF",
    },
    PRO: {
      bgColor: bgColor || "#007BFF", // xanh dương
      color: color || "#FFFFFF",
    },
    ENTERPRISE: {
      bgColor: bgColor || "#6F42C1", // tím
      color: color || "#FFFFFF",
    },
    New: {
      bgColor: bgColor || "#17A2B8", // xanh dương lơ
      color: color || "#FFFFFF",
    },
    Expired: {
      bgColor: bgColor || "#007BFF", // xanh dương
      color: color || "#FFFFFF",
    },
    NearExpiration: {
      bgColor: bgColor || "#FFC107", // vàng cam
      color: color || "#212529",
    },
    Paid: {
      bgColor: bgColor || "#28A745", // xanh dương
      color: color || "#FFFFFF",
    },
    Approved: {
      bgColor: bgColor || "#20C997", // vàng cam
      color: color || "#FFFFFF",
    },
    Ugent: {
      bgColor: bgColor || "#DC3545", // đỏ đậm
      color: color || "#FFFFFF",
    },
    High: {
      bgColor: bgColor || "#FD7E14", // đỏ đậm
      color: color || "#FFFFFF",
    },
  };

  const styles = statusStyles[statusKey] || statusStyles.Inactive;

  return (
    <span
      style={{
        backgroundColor:
          defaultColor && Object.entries(defaultColor).length > 0
            ? defaultColor.bgColor
            : styles.bgColor,
        color:
          defaultColor && Object.entries(defaultColor).length > 0
            ? defaultColor.color
            : styles.color,
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: "bold",
        display: "inline-block",
        maxWidth: "120px",
        textWrap: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </span>
  );
};

export default BaseStatusLabel;
