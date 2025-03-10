// material-ui
import { AlertProps, SnackbarOrigin } from '@mui/material';

// ==============================|| SNACKBAR TYPES  ||============================== //

export type SnackbarActionProps = {
  payload?: SnackbarProps;
};

export interface SnackbarProps {
  action: boolean;
  src: string;
  title: string;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alert: AlertProps;
  transition: string;
  close: boolean;
  actionButton: boolean;
  dense: boolean;
  maxStack: number;
  iconVariant: string;
}
