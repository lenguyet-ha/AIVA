import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { colorVal } from "@/src/constants/colors";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav_container: {
      backgroundColor: "#ffffff",
      width: "fit-content",
      height: "100%",
    },
    nav_content: {
      width: "264px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minWidth: "264px",
    },
    nav_content_close: {
      width: "47px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    nav_content_body: {
      position: "relative",
    },
    nav_open: {
      position: "absolute",
      top: "12px",
      right: "-20px",
      cursor: "pointer",
    },
    nav_menu: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "calc(100vh - 266px)",
      overflowY: "scroll",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    nav_menu_item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Để icon mũi tên nằm cuối
      gap: "12px",
      cursor: "pointer",
      height: "40px",
      borderRadius: "3px",
      paddingLeft: "16px",
      "&:hover": {
        backgroundColor: "#E3ECF8",
      },
    },
    nav_menu_active: {
      width: "4px",
      height: "16px",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      backgroundColor: "#2E68B1",
    },
    nav_menu_item_left: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    nav_menu_name: {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "18px",
    },
    nav_menu_icon: {
      width: "20px",
      height: "20px",
    },
    nav_arrow_icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      cursor: "pointer",
    },
    sub_menu: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "32px",
      borderLeft: "2px solid #E3ECF8",
    },
    nav_sub_menu_item: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: "6px 0",
      paddingLeft: "6px",
      "&:hover": {
        backgroundColor: "#E3ECF8",
      },
    },
    nav_menu_bullet: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#2E68B1",
      marginLeft: "8px",
    },
    nav_menu_top: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      borderBottom: "1px solid #DDE0E5",
      padding: "8px",
      marginBottom: "8px",
    },
    nav_menu_top_item: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    nav_menu_top_item_img: {
      width: "40px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    nav_menu_top_item_info: {
      width: "100%",
    },
    nav_menu_top_item_info_title: {
      height: "16px",
      width: "100%",
      color: "#626F86",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "14px",
    },
    nav_menu_top_item_info_name: {
      height: "auto",
      width: "100%",
      color: colorVal.dark,
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "18px",
    },
    nav_menu_time: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    nav_menu_time_item: {
      width: "46px",
      height: "50px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "2px",
      backgroundColor: "#FFEFE6",
    },
    nav_menu_time_item_label: {
      color: "#FD9D68",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "16px",
    },
    nav_menu_time_item_count: {
      color: "#FD9D68",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "16px",
    },
    back_nav: {
      width: "fit-content",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "4px",
    },
    back_nav_name: {
      color: "#2E68B1",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
    },
    knowledge_title: {
      color: colorVal.dark,
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "40px",
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: "100px",
      height: "44px",
      border: "1px solid #DDE0E5",
      "& .MuiOutlinedInput-root": {
        padding: "10px 8px",
        "& input": {
          padding: "0 0 0 4px",
          "&::placeholder": {
            fontSize: "14px",
            color: "#D9DFE9",
            opacity: 1,
          },
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
      "&:focus-within": {
        border: "1px solid #FD9D68 !important",
      },
    },
    txtHeaderMenu: {
      color: "gray",
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "26px",
      paddingTop: "10px",
      paddingBottom: "50px",
      textAlign: "center",
    },
  }),
);
