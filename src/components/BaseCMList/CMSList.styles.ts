import { createStyles, makeStyles } from "@mui/styles";
import { colors, Theme } from "@mui/material";
import { colorVal } from "@/src/constants/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      paddingTop: "0px",
      backgroundColor: colorVal.lightWhite,
    },
    title: {
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: "36px",
      color: colorVal.dark,
      marginBottom: "24px",
      textAlign: "center",
      flex: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      position: "relative",
      marginBottom: "16px",
    },
    returnBtn: {
      position: "absolute",
      left: 0,
    },
    viewgrid: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    gridContainer: {
      display: "flex",
      gap: "24px",
      justifyContent: "center",
      width: "100%",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#fff",
      minWidth: "400px",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid #DDE0E5",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "all 0.3s",
      "&:hover": {
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        transform: "scale(1.02)",
      },
    },
    cardHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      color: colorVal.dark,
      marginBottom: "16px",
    },
    field: {
      display: "flex",
      flexDirection: "column", // Đặt label trên input
      marginBottom: "16px", // Tạo khoảng cách giữa các field
    },
    label: {
      fontWeight: 500,
      fontSize: "14px",
      color: "#6C7A93",
      marginBottom: "4px", // Tạo khoảng cách giữa label và input
    },
    value: {
      width: "100%", // Input luôn full width
    },
    iframeContainer: {
      marginTop: "12px",
      borderRadius: "8px",
      overflow: "hidden",
    },
    iframe: {
      width: "100%",
      height: "180px",
      borderRadius: "8px",
      border: "none",
    },
    datePickerContainer: {
      width: "100%", // Đảm bảo DatePicker full width như TextField
      "& input": {
        width: "100%", // Đảm bảo ô nhập DatePicker có cùng độ rộng
        padding: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
      },
      "& .react-datepicker-wrapper": {
        width: "100%",
      },
    },
    backButton: {
      alignSelf: "flex-start",
    },
    confirmButton: {
      width: "120px",
      maxWidth: "400px",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
    cancelButton: {
      width: "120px",
      maxWidth: "400px",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      marginRight: "10px",
    },
    viewbtn: {
      maxWidth: "450px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "30px",
      gap: "10px",
    },
  }),
);
