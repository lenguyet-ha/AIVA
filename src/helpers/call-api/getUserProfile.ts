import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
import { getListBase } from "./getListBase";
import { setUserState } from "@/src/store/reducers/userState";

export const getUserProfile = async () => {
  try {
    const response = await getListBase("accounts/user-profile");

    if (response) {
      // dispatch(
      //   setUserState({
      //     userName: response?.userName,
      //     email: response?.email,
      //     avatar: response?.avatar,
      //     fullname: response?.fullname,
      //     isFirstWeddingCreate: response?.isFirstWeddingCreate,
      //   }),
      // );
      return response || null;
    } else {
      // localStorage.clear();
      window.location.href = "/login"; // Chuyển hướng đến login khi lỗi gọi user profile
      dispatch(showErrorSnackBar(response?.data?.message));
      return response?.data?.data || null;
    }
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    dispatch(showErrorSnackBar("An error occurred while fetching data."));
  }
};
