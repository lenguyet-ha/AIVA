import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  // Define the shape of the user info
  avatar?: string;
  email?: string;
  token?: string;
  firstName?: string;
  lastName?: string;
  isFirstWeddingCreate?: boolean; //check xem có phải lần đầu vào app ko để mở onboarding
  // Add other user-related properties as needed
}

interface UserState {
  info: UserInfo;
}

const initialState: UserState = {
  info: {},
};

const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<UserInfo>) {
      state.info = action.payload; // Update the state with the user info
    },
  },
});

export const { setUserState } = userInfo.actions;
export default userInfo.reducer;
