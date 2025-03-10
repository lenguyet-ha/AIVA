import React from "react";
import { Box } from "@mui/material";

// Interface cho dữ liệu item
interface Item {
  id: number;
  text: string;
}

// Props cho HorizontalList
interface HorizontalListProps {
  items: Item[]; // Danh sách items được truyền từ cha
  onContainerClick: () => void; // Hàm callback khi container được click
  onRemoveItem: (id: number) => void; // Hàm callback xóa item
}

const HorizontalList: React.FC<HorizontalListProps> = ({
  items,
  onContainerClick,
  onRemoveItem,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        padding: 16,
        borderRadius: 8,
        cursor: "pointer",
        flex: 1,
      }}
      onClick={onContainerClick} // Gọi hàm khi click vào container
    >
      {/* Render từng item */}
      {items.map(item => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 8px",
            backgroundColor: "rgba(232, 234, 243, 1)",
            border: "1px solid #ccc",
            borderRadius: 3,
            gap: "4px",
          }}
        >
          {/* Text */}
          <span
            style={{
              fontWeight: 700,
              fontSize: "11px",
              lineHeight: "16px",
              color: "rgba(68, 84, 111, 1)",
            }}
          >
            {item.text}
          </span>

          {/* Icon close */}
          <img
            src={"/images/svg/icon_close.svg"}
            alt="close"
            style={{ width: "12px", height: "12px", cursor: "pointer" }}
            onClick={e => {
              e.stopPropagation(); // Ngăn sự kiện click container
              onRemoveItem(item.id); // Gọi hàm xóa từ component cha
            }}
          />
        </Box>
      ))}
    </div>
  );
};

export default HorizontalList;
