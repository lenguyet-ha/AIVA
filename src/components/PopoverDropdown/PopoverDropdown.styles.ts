import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "13px",
      height: "13px",
      cursor: "pointer",
      transition: "filter 0.3s ease",
      filter: "brightness(0.5) contrast(1.2)", // Tăng độ sáng khi hover
      "&:hover": {
        filter: "brightness(1)",
      },
    },
    popoverBox: {
      minWidth: "220px",
      padding: "16px",
      background: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
      borderRadius: "8px",
    },
    txtName: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#333",
      marginBottom: "12px",
    },
    txt1: {
      fontSize: "12px",
      fontWeight: 500,
      color: "gray",
      marginBottom: "12px",
      marginTop: "10px",
    },
    listbtn: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "12px",
      marginTop: "16px",
    },
    btnCancel: {
      backgroundColor: "#ddd",
      border: "1px solid #ccc",
      color: "#333",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#bbb",
        borderColor: "#aaa",
      },
    },
    btnSubmit: {
      backgroundColor: "#4e73df",
      border: "1px solid #4e73df",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#2e59d9",
        borderColor: "#2e59d9",
      },
    },
    txtSubmit: {
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
    },
    txtCancel: {
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      height: "40px",
      border: "1px solid #DFE1E7",
      "& .MuiOutlinedInput-root": {
        padding: "10px 8px",
        "& input": {
          padding: 0,
        },
        "& fieldset": {
          border: "unset",
        },
        "&.Mui-focused fieldset": {
          border: "none",
        },
      },
      "& .MuiFormHelperText-root": {
        marginTop: "-4px",
      },
      "@media (max-height: 800px)": {
        height: "44px",
      },
      "&:focus-within": {
        border: "1px solid #FD9D68 !important",
      },
    },
  }),
);
