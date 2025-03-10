import { createSlice } from "@reduxjs/toolkit";

// types
import { SnackbarProps } from "@app/types/snackbar";

const initialState: SnackbarProps = {
  action: false,
  src: "",
  title: "",
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alert: {
    color: "primary",
    variant: "filled",
  },
  transition: "Fade",
  close: true,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: "usedefault",
};

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const {
        src,
        title,
        open,
        message,
        anchorOrigin,
        variant,
        alert,
        transition,
        close,
        actionButton,
      } = action.payload;

      state.action = !state.action;
      state.src = src || initialState.src;
      state.title = title || initialState.title;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant,
      };
      state.transition = transition || initialState.transition;
      state.close = close === false ? close : initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
    },

    closeSnackbar(state) {
      state.open = false;
    },

    handlerIncrease(state, action) {
      const { maxStack } = action.payload;
      state.maxStack = maxStack;
    },
    handlerDense(state, action) {
      const { dense } = action.payload;
      state.dense = dense;
    },
    handlerIconVariants(state, action) {
      const { iconVariant } = action.payload;
      state.iconVariant = iconVariant;
    },
  },
});

export default snackbar.reducer;

export const {
  closeSnackbar,
  openSnackbar,
  handlerIncrease,
  handlerDense,
  handlerIconVariants,
} = snackbar.actions;

export function showSuccessSnackBar(message, title?: string) {
  return async (dispatch, getState) => {
    try {
      dispatch(
        openSnackbar({
          src: "/images/svg/icons/success_icon.svg",
          title: title ? title : "Thành công!",
          open: true,
          message: message,
          variant: "alert",
          alert: {
            color: "primary",
          },
          close: false,
          transition: "SlideRight",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }),
      );
    } catch (err) {
      console.log("Show snackbar fail", `${err}`);
    }
  };
}

export function showErrorSnackBar(message, title?: string) {
  return async (dispatch, getState) => {
    try {
      dispatch(
        openSnackbar({
          src: "/images/svg/icons/warning.svg",
          title: title ? title : "Có lỗi xảy ra!",
          open: true,
          message: message || "",
          variant: "alert",
          alert: {
            color: "error",
          },
          close: false,
          transition: "SlideRight",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }),
      );
    } catch (err) {
      console.log("Show snackbar fail", `${err}`);
    }
  };
}
