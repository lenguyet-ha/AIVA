import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./Header.styles";
import useTranslation from "next-translate/useTranslation";
import { Box, useMediaQuery } from "@mui/system";
import {
  Dialog,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import BaseButton from "../BaseButton/BaseButton";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "@/src/store";
import { setNavigationState } from "@/src/store/reducers/navigation";
import { getUserProfile } from "@/src/helpers/call-api/getUserProfile";
import { getListBase } from "@/src/helpers/call-api/getListBase";
import getConfig from "next/config";
import axios from "@/src/helpers/axios";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import { useRouter } from "next/router";
import { Warning } from "@mui/icons-material";
import { OnboardingScreen } from "@/src/screens/OnboardingScreen";
import { setUserState } from "@/src/store/reducers/userState";
const { publicRuntimeConfig } = getConfig();

const Header = React.memo(() => {
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 820px)");
  const [countNoti, setCountNoti] = useState(9); //thêm theo data noti sau
  const [openAccount, setOpenAccount] = useState(false);
  const [openAccountSetting, setOpenAccountSetting] = useState(false);
  const [dataSetting, setDataSetting] = useState({});

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState<string | File | null>(null);

  const [passwordOld, setPasswordOld] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");
  const [passwordOldError, setPasswordOldError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCfError, setPasswordCfError] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCf, setShowPasswordCf] = useState(false);

  const [showOnboarding, setShowOnboarding] = useState(false);

  const openAccountRef = useRef<HTMLDivElement | null>(null);
  const userIconRef = useRef<HTMLImageElement | null>(null);

  const navigation = useSelector((state: RootState) => state.navigation?.info);
  const userProfile = useSelector((state: RootState) => state.userState?.info);

  const handleAccount = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setOpenAccount(!openAccount);
  };

  const handleChangeNavigationMobile = () => {
    dispatch(
      setNavigationState({
        ...navigation,
        openMobileIcon: !navigation.openMobileIcon,
      }),
    );
  };

  const handleOpenAccountSetting = async () => {
    setOpenAccountSetting(true);
    setOpenAccount(false);
    const resActiveProject = await getListBase(
      "project-couple-info/get-active-project",
    );
    setDataSetting(resActiveProject || {});
  };

  const handleOpenOnboarding = () => {
    setOpenAccount(false);
    localStorage.setItem("onboarding", "1"); //Nếu là 1 thì cho phép tắt được form Onboarding
    // router.push("/onboarding");
    setShowOnboarding(true);
  };

  const handleLogout = async () => {
    dispatch(setUserState({}));
    localStorage.clear();
    router.push("/login");
    // const urlSubmit = `${publicRuntimeConfig.ORIGIN_API}/accounts/logout`;
    // try {
    //   const response = await axios.post(urlSubmit);
    //   if (response.data.success) {
    //     dispatch(showSuccessSnackBar(response.data.message));
    //     localStorage.clear();
    //     router.push("/login");
    //     return response.data;
    //   } else {
    //     dispatch(showErrorSnackBar(response.data.message));
    //     return response.data;
    //   }
    // } catch (error) {
    //   console.log("error: ", error);
    // }
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFullName(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file); // Đặt File vào avatar
    }
  };

  const handleSubmit = async () => {
    setLoadingBtn(true);
    try {
      if (changePassword) {
        const dataSubmit = {
          oldPassword: passwordOld.trim(),
          password: password.trim(),
          rePassword: passwordCf.trim(),
        };
        const urlSubmit = `${process.env.ORIGIN_API}/accounts/change-password`;
        const res = await axios.post(urlSubmit, dataSubmit);
        if (res.data.success) {
          localStorage.clear();
          router.push("/login");
          dispatch(showSuccessSnackBar(res?.data?.message));
          return res.data;
        } else {
          dispatch(showErrorSnackBar(res?.data?.message));
          return res.data;
        }
      }
      const formDataRequest = new FormData();
      formDataRequest.append("FullName", fullName.trim());
      // Kiểm tra nếu avatar là File thì thêm vào FormData
      if (avatar instanceof File) {
        formDataRequest.append("Avatar", avatar);
      }
      const response = await axios.post(
        `${process.env.ORIGIN_API}/accounts/change-profile`,
        formDataRequest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        setOpenAccountSetting(false);
        getUserProfile();
        dispatch(showSuccessSnackBar(response?.data?.message));
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handlePasswordOldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setPasswordOld(value);
  };

  const handlePasswordOldBlur = () => {
    const passwordOldRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setPasswordOldError(!passwordOldRegex.test(passwordOld));
    return !passwordOldRegex.test(passwordOld);
  };

  const handleClickShowPasswordOld = () => {
    setShowPasswordOld(prev => !prev);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handlePasswordBlur = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    setPasswordError(!passwordRegex.test(password));
    return !passwordRegex.test(password);
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
    return passwordCf !== password;
  };

  const handleClickShowPasswordCf = () => {
    setShowPasswordCf(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openAccountRef.current &&
        !openAccountRef.current.contains(event.target as Node) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target as Node)
      ) {
        setOpenAccount(false);
      }
    }

    if (openAccount) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAccount]);

  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  useEffect(() => {
    if (userProfile) {
      setAvatar(userProfile.avatar || null); // Đặt URL vào avatar
      setFullName(userProfile.fullname || "");
    }
  }, [userProfile]);

  return (
    <Box className={classes.header}>
      <Box
        className={classes.header_right_item}
        sx={{ gap: "12px !important" }}
      >
        {matches && (
          <img
            style={{ cursor: "pointer" }}
            onClick={handleChangeNavigationMobile}
            src={
              navigation.openMobileIcon
                ? "/images/svg/icon_close.svg"
                : "/images/svg/icons/app_switcher.svg"
            }
            alt="logo"
          />
        )}
        <img
          style={{ cursor: "pointer" }}
          src={"/images/AivaLogo.svg"}
          alt="logo"
          onClick={() => router.push("/survey-customer")}
        />
      </Box>
      <Box className={classes.header_right}>
        {/* <Box className={classes.header_right_item}>
          {countNoti == 0 || countNoti == null ? (
            <img
              src={"/images/svg/icons/noti.svg"}
              alt="noti"
              className={classes.header_right_item_img}
            />
          ) : (
            <Box className={classes.header_right_item_noti}>
              <img
                src={"/images/svg/icons/noti2.svg"}
                alt="noti"
                className={classes.header_right_item_img}
              />
              <Typography
                className={classes.header_right_item_noti_count}
              >{`${countNoti}+`}</Typography>
            </Box>
          )}
          <img
            src={"/images/svg/icons/flag.svg"}
            alt="flag"
            className={classes.header_right_item_img}
          />
        </Box> */}
        <Box
          className={classes.header_right_item}
          onClick={handleAccount}
          ref={userIconRef}
        >
          <img
            src={
              userProfile.avatar
                ? userProfile.avatar
                : "/images/svg/icons/user.svg"
            }
            alt="user"
            className={`${classes.header_right_item_img} ${classes.account_setting_img_border}`}
          />
        </Box>
        {openAccount && (
          <Box
            className={classes.account_setting}
            ref={openAccountRef}
            onClick={e => e.stopPropagation()}
          >
            <Box className={classes.account_setting_info}>
              <Box className={classes.account_setting_info_item1}>
                <img
                  src={
                    userProfile.avatar
                      ? userProfile.avatar
                      : "/images/svg/icons/user.svg"
                  }
                  alt="user"
                  className={classes.account_setting_img_border}
                />
                <Typography className={classes.account_setting_info_item_name}>
                  {userProfile.email}
                </Typography>
              </Box>
              {/* <Box
                className={classes.account_setting_info_item}
                onClick={handleOpenOnboarding}
              >
                <img
                  src={
                    "/images/svg/icons/navigation/wedding-rings-svgrepo-com.svg"
                  }
                  alt="my wedding"
                  className={classes.account_setting_img}
                />
                <Typography className={classes.account_setting_info_item_name}>
                  {"Đám cưới của tôi"}
                </Typography>
              </Box> */}
              {/* <Box
                className={classes.account_setting_info_item}
                onClick={handleOpenAccountSetting}
              >
                <img
                  src={"/images/svg/icons/setting.svg"}
                  alt="setting"
                  className={classes.account_setting_img}
                />
                <Typography className={classes.account_setting_info_item_name}>
                  {"Cài đặt tài khoản"}
                </Typography>
              </Box> */}
            </Box>
            <Box className={classes.line}></Box>
            <Box
              className={classes.account_setting_info_item}
              onClick={handleLogout}
            >
              <img
                src={"/images/svg/icons/logout.svg"}
                alt="logout"
                className={classes.account_setting_img}
              />
              <Typography className={classes.account_setting_logout_name}>
                {"Đăng xuất"}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Dialog
        open={openAccountSetting}
        onClose={() => setOpenAccountSetting(false)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "unset",
          },
        }}
        maxWidth="sm"
      >
        <Box className={classes.dialog}>
          <Box className={classes.dialog_header}>
            <Typography className={classes.dialog_title}>
              {"Cài đặt tài khoản"}
            </Typography>
            <img
              src={"/images/svg/icon_close.svg"}
              alt="icon close"
              className={classes.header_right_item_img}
              onClick={() => setOpenAccountSetting(false)}
            />
          </Box>
          <Box className={classes.content}>
            {!changePassword && (
              <Box className={classes.dialog_content}>
                <Box className={classes.dialog_content_item}>
                  <Box className={classes.dialog_content_item_info}>
                    <Typography
                      className={classes.dialog_content_item_info_name}
                    >
                      {"Tên tài khoản"}
                    </Typography>
                    <TextField
                      value={fullName}
                      onChange={handleFullNameChange}
                      fullWidth
                      variant="outlined"
                      className={classes.input}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {!changePassword && (
              <Box className={classes.dialog_content}>
                <Box className={classes.dialog_content_item}>
                  <Typography className={classes.dialog_content_item_info_name}>
                    {"Ảnh đại diện"}
                  </Typography>
                  <Box className={classes.dialog_content_item_upload}>
                    <Tooltip title="Thêm ảnh đại diện">
                      <label
                        htmlFor="groomImageUrlUpload"
                        className={classes.img_upload}
                      >
                        <img
                          src={
                            avatar
                              ? typeof avatar === "object"
                                ? URL.createObjectURL(avatar as File)
                                : avatar
                              : "/images/svg/icons/camera.svg"
                          }
                          alt="upload img"
                          style={{
                            width: avatar ? "100%" : "unset",
                            height: avatar ? "100%" : "unset",
                            objectFit: avatar ? "cover" : "unset",
                            borderRadius: avatar ? "100px" : "unset",
                          }}
                        />
                      </label>
                    </Tooltip>
                    <input
                      id="groomImageUrlUpload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => handleImageChange(e)}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {changePassword && (
              <Box className={classes.dialog_content}>
                <Box className={classes.dialog_content_item_info}>
                  <Typography className={classes.dialog_content_item_info_name}>
                    {"Mật khẩu hiện tại"}
                  </Typography>
                  <TextField
                    value={passwordOld}
                    onChange={handlePasswordOldChange}
                    onBlur={handlePasswordOldBlur}
                    error={passwordOldError}
                    variant="outlined"
                    type={showPasswordOld ? "text" : "password"}
                    className={classes.input}
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
                          {passwordOldError && (
                            <InputAdornment position="end">
                              <Tooltip title="Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt">
                                <Warning
                                  color="error"
                                  className={classes.wanning}
                                />
                              </Tooltip>
                            </InputAdornment>
                          )}
                          <InputAdornment
                            position="end"
                            onClick={handleClickShowPasswordOld}
                          >
                            {showPasswordOld ? (
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
              </Box>
            )}
            {changePassword && (
              <Box className={classes.dialog_content}>
                <Box className={classes.dialog_content_item_info}>
                  <Typography className={classes.dialog_content_item_info_name}>
                    {"Mật khẩu mới"}
                  </Typography>
                  <TextField
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    error={passwordError}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    className={classes.input}
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
              </Box>
            )}
            {changePassword && (
              <Box className={classes.dialog_content}>
                <Box className={classes.dialog_content_item_info}>
                  <Typography className={classes.dialog_content_item_info_name}>
                    {"Nhập lại mật khẩu mới"}
                  </Typography>
                  <TextField
                    value={passwordCf}
                    onChange={handlePasswordCfChange}
                    onBlur={handlePasswordCfBlur}
                    error={passwordCfError}
                    variant="outlined"
                    type={showPasswordCf ? "text" : "password"}
                    className={classes.input}
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
                              <Tooltip title="Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt">
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
              </Box>
            )}
            <Box className={classes.dialog_content}>
              <Box
                className={classes.account_setting_info}
                sx={{ gap: "12px !important" }}
              >
                {!changePassword && (
                  <BaseButton
                    className={classes.btn_delete_account}
                    onClick={() => {}} //để sau
                    text={"Xoá tài khoản"}
                  />
                )}
                <Box className={classes.dialog_content_item}>
                  <BaseButton
                    className={classes.btn_cancel}
                    onClick={() => {
                      setChangePassword(!changePassword);
                    }}
                    text={changePassword ? "Quay lại" : "Đổi mật khẩu"}
                  />
                  <BaseButton
                    className={classes.btn_save}
                    onClick={handleSubmit}
                    text={"Lưu"}
                    loading={loadingBtn}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      {showOnboarding && (
        <OnboardingScreen
          onClose={() => {
            setShowOnboarding(false);
            localStorage.setItem("onboarding", "0");
          }}
        />
      )}
    </Box>
  );
});

export { Header };
