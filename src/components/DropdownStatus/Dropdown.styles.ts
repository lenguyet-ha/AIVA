import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
    },
    subContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "8px",
      alignItems: "center",
      paddingRight: "8px",
      paddingLeft: "8px",
      cursor: "pointer",
      minHeight: "40px",
    },
    viewoption: {
      borderRadius: "4px",
      padding: "8px",
      display: "flex",
      flexWrap: "nowrap",
      gap: "8px",
    },
    txtdropdowncheckbox: {
      backgroundColor: "#E8EAF3",
      borderRadius: "3px",
      padding: "4px 8px",
      display: "inline-flex", // Sử dụng inline-flex để tránh xuống dòng
      alignItems: "center", // Căn giữa nội dung theo chiều dọc
      whiteSpace: "nowrap", // Không xuống dòng
      overflow: "hidden", // Ẩn phần tràn
      textOverflow: "ellipsis", // Thêm dấu "..." nếu text dài quá
    },
    txttypho: {
      maxWidth: "120px",
      color: "#44546F",
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: "16px",
      whiteSpace: "nowrap", // Không xuống dòng
      overflow: "hidden", // Ẩn phần tràn
      textOverflow: "ellipsis", // Thêm dấu "..." nếu text dài quá
    },
    subtxt: {
      backgroundColor: "#E8EAF3",
      borderRadius: "3px",
      padding: "4px 8px",
      display: "inline-block",
    },
    subtypho: {
      color: "#44546F",
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: "16px",
    },
    defaultcolor: {
      color: "#999",
    },
    icon: {
      width: "12px",
      height: "12px",
      filter: "invert(50%) brightness(50%)",
      "&:hover": {
        filter: "unset",
      },
      cursor: "pointer",
    },
  }),
);
