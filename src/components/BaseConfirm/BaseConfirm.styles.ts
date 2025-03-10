import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { colorVal } from "@/src/constants/colors";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "& .MuiDialog-paper": {
        borderRadius: "12px",
        padding: "0px",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      alignItems: "center",
      padding: "24px",
    },
    content_header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "24px",
      color: colorVal.dark,
    },
    close: {
      cursor: "pointer",
    },
    content_text: {
      width: "100%",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      color: colorVal.dark,
    },
    content_btn: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      gap: "12px",
    },
    btn_cancel: {
      width: "auto",
      minWidth: "120px",
      height: "40px",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24.8px",
      color: "#AE2E24",
      backgroundColor: "#f5ded1",
      textTransform: "none",
      borderRadius: "100px",
      "&:hover": {
        backgroundColor: "#f5ded1",
      },
    },
    btn_cfm: {
      width: "auto",
      minWidth: "120px",
      height: "40px",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24.8px",
      color: "#FFFFFF",
      backgroundColor: "#2E68B1",
      textTransform: "none",
      borderRadius: "100px",
      "&:hover": {
        backgroundColor: "#0f4487",
      },
    },
  }),
);
