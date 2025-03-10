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
      width: "376px",
      height: "200px",
      padding: "24px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "left",
    },
    inputField: {
      width: "100%",
      marginBottom: "10px",
      marginTop: "8px",
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
  }),
);
