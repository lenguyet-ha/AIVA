import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { colorVal } from "@/src/constants/colors";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    dialogBox: {
      backgroundColor: "#fff",
      width: "500px",
      height: "auto",
      padding: "24px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "left",
    },
    inputField: {
      width: "100%",
      marginTop: "8px",
    },
    datePicker: {
      width: "100%",
      "& .MuiInputBase-root": {
        width: "100%",
      },
    },
    submitButton: {
      padding: "6px 12px",
      border: "none",
      backgroundColor: "#2E68B1",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#0056b3",
      },
    },
    closeButton: {
      padding: "6px 12px",
      border: "none",
      color: colorVal.dark,
      borderRadius: "4px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "gray",
      },
    },
    txtheader: {
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "28px",
      color: colorVal.dark,
    },
    txtcontent: {
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "16px",
      color: colorVal.dark,
      paddingBottom: "10px",
    },
    viewbtn: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      marginTop: "16px",
    },
    viewaction: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: "8px",
    },
    viewcontent: {
      marginTop: "28px",
      display: "flex",
      flexDirection: "column",
    },
    fieldLabel: {
      display: "block", // Hiển thị label trên một dòng riêng
      fontSize: "14px", // Kích thước chữ
      fontWeight: "500", // Độ đậm chữ vừa phải
      marginBottom: "4px", // Tạo khoảng cách giữa label và input
      color: "#333", // Màu chữ tối hơn để dễ nhìn
      marginTop: "10px",
    },
    fieldLabeldata: {
      display: "block", // Hiển thị label trên một dòng riêng
      fontSize: "14px", // Kích thước chữ
      fontWeight: "500", // Độ đậm chữ vừa phải
      marginBottom: "10px", // Tạo khoảng cách giữa label và input
      color: "#333", // Màu chữ tối hơn để dễ nhìn
      marginTop: "12px",
    },
    closeIcon: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
    },
    viewHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  }),
);
