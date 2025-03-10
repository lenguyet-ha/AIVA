import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  numberUpdate: number;
}

const initialState: OnboardingState = {
  numberUpdate: 0,
};

const onboardingInfo = createSlice({
  name: "taskAdd",
  initialState,
  reducers: {
    setOnboardingState(state, action: PayloadAction<number>) {
      state.numberUpdate = action.payload;
    },
  },
});

export const { setOnboardingState } = onboardingInfo.actions;
export default onboardingInfo.reducer;
