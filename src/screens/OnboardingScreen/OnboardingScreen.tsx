import React, { useEffect, useState } from "react";
import { useStyles } from "./OnboardingScreen.styles";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import BaseButton from "@/src/components/BaseButton/BaseButton";
import axios from "@/src/helpers/axios";
import { useRouter } from "next/router";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import { dispatch, RootState } from "@/src/store";
import { getListBase } from "@/src/helpers/call-api/getListBase";
import { getUserProfile } from "@/src/helpers/call-api/getUserProfile";
import { Warning } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { setOnboardingState } from "@/src/store/reducers/onboarding";
const { publicRuntimeConfig } = getConfig();

interface OnboardingProps {
  onClose: () => void;
}

const OnboardingScreen = React.memo((props: OnboardingProps) => {
  return <></>;
});

export { OnboardingScreen };
