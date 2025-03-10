import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    txtarea: {
      width: "-webkit-fill-available",
      fontSize: "14px",
      lineHeight: "20px",
      height: "20px",
      resize: "vertical",
      whiteSpace: "pre-wrap" /* Giúp hiển thị ký tự xuống dòng */,
      // borderRadius: "4px",
      // paddingLeft: "10px",
      // paddingTop:'8px',
      "&:focus": {
        // Thay đổi từ `focus-within` thành `focus`
        border: "1px solid #FD9D68 !important",
        outline: "none",
      },
      "& textarea": {
        "&:focus": {
          outline: "none", // Loại bỏ outline trên textarea
        },
        "&:focus-visible": {
          outline: "none",
        },
      },
    },
  }),
);
