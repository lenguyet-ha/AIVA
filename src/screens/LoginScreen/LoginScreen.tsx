import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./LoginScreen.styles";
import useTranslation from "next-translate/useTranslation";
import {
  Box,
  Checkbox,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import axios from "@/src/helpers/axios";
import getConfig from "next/config";
import { dispatch } from "@/src/store";
const { publicRuntimeConfig } = getConfig();
import { useRouter } from "next/router";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import BaseButton from "@/src/components/BaseButton/BaseButton";
import { setUserState } from "@/src/store/reducers/userState";
import { lang } from "@/src/constants/lang";

const LoginScreen = React.memo(() => {
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCfError, setPasswordCfError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCf, setShowPasswordCf] = useState(false);
  const [focusState, setFocusState] = useState({
    email: false,
    password: false,
    passwordCf: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
    setFocusState(prev => ({ ...prev, email: false }));
    return !emailRegex.test(email);
  };

  const handleEmailFocus = () => {
    setFocusState(prev => ({ ...prev, email: true }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handlePasswordBlur = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setPasswordError(!passwordRegex.test(password));
    setFocusState(prev => ({ ...prev, password: false }));
    return !passwordRegex.test(password);
  };

  const handlePasswordFocus = () => {
    setFocusState(prev => ({ ...prev, password: true }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handlePasswordCfChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setPasswordCf(value);
  };

  const handlePasswordCfBlur = () => {
    setPasswordCfError(passwordCf !== password);
    setFocusState(prev => ({ ...prev, passwordCf: false }));
    return passwordCf !== password;
  };

  const handlePasswordCfFocus = () => {
    setFocusState(prev => ({ ...prev, passwordCf: true }));
  };

  const handleClickShowPasswordCf = () => {
    setShowPasswordCf(prev => !prev);
  };

  //Ghi nhớ đăng nhập
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async () => {
    setLoadingBtn(true);

    const dataSubmit = {
      userName: email.trim(),
      password: password.trim(),
    };
    const urlSubmit = `${process.env.ORIGIN_API}/signIn`;
    try {
      const response = await axios.post(urlSubmit, dataSubmit);
      if (response.data.success) {
        localStorage.setItem("token", response.data?.token);
        dispatch(
          setUserState({
            avatar: response?.data?.data?.avatar,
            email: response?.data?.data?.email,
            token: response?.data?.token,
            firstName: response?.data?.data?.info?.firstName,
            lastName: response?.data?.data?.info?.lastName,
          }),
        );
        if (response.data.data?.isFirstWeddingCreate) {
          router.push("/onboarding");
        } else {
          dispatch(showSuccessSnackBar(response?.data?.message));
          router.push("/survey-customer");
        }
        return response.data;
        // }
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
      // router.push("/customer-overview");
    } catch (error) {
      dispatch(showErrorSnackBar(lang.errorDetected));
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.content_right}>
          <img
            src="/images/AivaLogo.svg"
            className={classes.content_left_logo}
          />

          <Box className={classes.content_right_item}>
            <Box className={classes.content_right_item_content}>
              <Typography className={classes.label_input}>{"Email"}</Typography>
              <TextField
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                onFocus={handleEmailFocus}
                error={emailError}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: emailError ? "10px" : "0" }}
                className={`${classes.input} ${
                  focusState.email ? classes.inputFocused : ""
                }`}
                inputProps={{
                  pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/images/svg/icons/email.svg" />
                    </InputAdornment>
                  ),
                  endAdornment: emailError && (
                    <InputAdornment position="end">
                      <Tooltip title="Email không hợp lệ">
                        <Warning color="error" className={classes.wanning} />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className={classes.content_right_item_content}>
              <Typography className={classes.label_input}>
                {"Mật khẩu"}
              </Typography>
              <TextField
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                // error={passwordError}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                className={`${classes.input} ${
                  focusState.password ? classes.inputFocused : ""
                }`}
                // inputProps={{
                //   pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
                // }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/images/svg/icons/lock.svg" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {/* <>
                        {passwordError && (
                          <InputAdornment position="end">
                            <Tooltip title="Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt">
                              <Warning
                                color="error"
                                className={classes.wanning}
                              />
                            </Tooltip>
                          </InputAdornment>
                        )}
                      </> */}
                      <InputAdornment
                        position="end"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <img
                            src="/images/svg/icons/eye.svg"
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <img
                            src="/images/svg/icons/eye_lock.svg"
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </Box>
            {isRegister && (
              <Box className={classes.content_right_item_content}>
                <Typography className={classes.label_input}>
                  {"Nhập lại mật khẩu"}
                </Typography>
                <TextField
                  value={passwordCf}
                  onChange={handlePasswordCfChange}
                  onBlur={handlePasswordCfBlur}
                  onFocus={handlePasswordCfFocus}
                  error={passwordCfError}
                  variant="outlined"
                  type={showPasswordCf ? "text" : "password"}
                  className={`${classes.input} ${
                    focusState.passwordCf ? classes.inputFocused : ""
                  }`}
                  inputProps={{
                    pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src="/images/svg/icons/lock.svg" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {passwordCfError && (
                          <InputAdornment position="end">
                            <Tooltip title="Mật khẩu không khớp">
                              <Warning
                                color="error"
                                className={classes.wanning}
                              />
                            </Tooltip>
                          </InputAdornment>
                        )}
                        <InputAdornment
                          position="end"
                          onClick={handleClickShowPasswordCf}
                        >
                          {showPasswordCf ? (
                            <img
                              src="/images/svg/icons/eye.svg"
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <img
                              src="/images/svg/icons/eye_lock.svg"
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              </Box>
            )}
          </Box>
          <Box className={classes.content_right_item}>
            {!isRegister && (
              <Box className={classes.login_sp}>
                <Box className={classes.login_checkbox}>
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    color="primary"
                  />
                  <Typography className={classes.note_login}>
                    {"Ghi nhớ đăng nhập"}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box className={classes.content_right_item_content}>
              <BaseButton
                className={classes.btn_login}
                onClick={handleSubmit}
                text={isRegister ? "Đăng ký" : "Đăng nhập"}
                loading={loadingBtn}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export { LoginScreen };
