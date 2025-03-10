import React from "react";
import { useStyles } from "./BaseConfirm.styles";
import useTranslation from "next-translate/useTranslation";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import BaseButton from "@/src/components/BaseButton/BaseButton";

interface BaseConfirmProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onSubmit?: () => void;
  textCancel?: string;
  textConfirm?: string;
}

const BaseConfirm = React.memo((props: BaseConfirmProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {open, title, content, onClose, onSubmit, textCancel, textConfirm} = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" className={classes.container}>
      <DialogContent className={classes.content}>
        <Box className={classes.content_header}>
          <Typography className={classes.title}>{title}</Typography>
          <img
            src={"/images/svg/icon_close.svg"}
            alt="icon_close"
            onClick={onClose}
            className={classes.close}
          />
        </Box>
        <Typography className={classes.content_text}>{content}</Typography>
        <Box className={classes.content_btn}>
          <BaseButton
            className={classes.btn_cancel}
            onClick={onClose}
            text={textCancel ? textCancel : "Hủy"}
          />
          <BaseButton
            className={classes.btn_cfm}
            onClick={onSubmit}
            text={textCancel ? textCancel : "Xác nhận"}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export { BaseConfirm };