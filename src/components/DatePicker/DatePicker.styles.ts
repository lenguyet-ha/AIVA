import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { colorVal } from "@/src/constants/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    txtarea: {
      width: "100%",
      minHeight: "120px",
      border: "none",
      padding: "12px",
      borderRadius: "4px",
      fontSize: "14px",
      lineHeight: "20px",
      resize: "vertical",
    },
    container: {
      width: "100%",
    },
    subContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "16px",
      paddingLeft: "16px",
      cursor: "pointer",
      gap: "8px",
    },
    txtchoose: {
      fontSize: "14px", // Điều chỉnh kích thước font
      textAlign: "center", // Căn giữa text trong span
      padding: "8px", // Thêm padding
      cursor: "pointer", // Thêm hiệu ứng con trỏ khi hover
      display: "inline-block", // Làm cho span có chiều rộng phù hợp
      borderRadius: "4px", // Bo góc cho span
      fontWeight: 400,
      lineHeight: "20px",
      color: colorVal.dark,
    },
    icon: {
      width: "12px",
      height: "12px",
      filter: "invert(50%) brightness(50%)",
      "&:hover": {
        filter: "unset",
      },
    },
  }),
);
