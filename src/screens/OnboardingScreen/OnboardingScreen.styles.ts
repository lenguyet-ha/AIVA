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
    close: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
    },
    close_icon: {
      cursor: "pointer",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      alignItems: "center",
      padding: "30px 20px",
      "@media (max-width: 1600px)": {
        padding: "20px",
        gap: "12px",
      },
    },
    content_info: {
      display: "flex",
      flexDirection: "column",
      gap: "35px",
      alignItems: "center",
      "@media (max-width: 1600px)": {
        gap: "20px",
      },
    },
    content_info_top: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      alignItems: "center",
    },
    title: {
      fontSize: "40px",
      fontWeight: "500",
      color: colorVal.dark,
      lineHeight: "48px",
      "@media (max-width: 1600px)": {
        fontSize: "32px",
        lineHeight: "40px",
      },
      "@media (max-width: 600px)": {
        fontSize: "30px",
        lineHeight: "38px",
      },
    },
    desc: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#666D80",
      lineHeight: "25.5px",
      textAlign: "center",
      "@media (max-width: 1600px)": {
        fontSize: "14px",
        lineHeight: "18.5px",
      },
    },
    content_info_bottom: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      "@media (max-width: 1600px)": {
        gap: "14px",
      },
    },
    content_name: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      "@media (max-width: 1600px)": {
        gap: "14px",
      },
      "@media (max-width: 600px)": {
        gap: "10px",
      },
    },
    content_name_input: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      "@media (max-width: 1600px)": {
        gap: "10px",
      },
      "@media (max-width: 600px)": {
        gap: "8px",
      },
    },
    name: {
      fontSize: "20px",
      fontWeight: "500",
      color: colorVal.dark,
      lineHeight: "24px",
      "@media (max-width: 1600px)": {
        fontSize: "16px",
        lineHeight: "18px",
      },
    },
    content_input: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    input_label: {
      fontSize: "14px",
      fontWeight: "500",
      color: colorVal.dark,
      lineHeight: "21.7px",
      "@media (max-width: 1600px)": {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      height: "48px",
      border: "1px solid #DFE1E7",
      "& .MuiOutlinedInput-root": {
        padding: "12px",
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
        height: "46px",
      },
      "&:focus-within": {
        border: "1px solid #FD9D68 !important",
      },
    },
    info_wedding: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      "@media (max-width: 1600px)": {
        gap: "10px",
      },
      "@media (max-width: 600px)": {
        gap: "8px",
      },
    },
    btn_submit: {
      width: "100%",
      maxWidth: "325px",
      height: "48px",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24.8px",
      color: "#ffffff",
      backgroundColor: "#2E68B1",
      textTransform: "none",
      borderRadius: "100px",
      "&:hover": {
        backgroundColor: "#0e54ad",
      },
      "@media (max-height: 800px)": {
        height: "46px",
      },
    },
    dialog_content_item_upload: {
      width: "120px",
      height: "100px",
      borderRadius: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#F7F8F9",
      "@media (max-width: 600px)": {
        width: "90px",
        height: "65px",
      },
    },
    cover_image_upload: {
      width: "100%",
      height: "200px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#F7F8F9",
    },
    wanning: {
      fontSize: "16px",
      cursor: "pointer",
    },
    img_upload: {
      cursor: "pointer",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
);
