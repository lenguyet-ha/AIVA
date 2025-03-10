import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskAddState {
  parentId: string;
}

const initialState: TaskAddState = {
  parentId: "",
};

const taskAddInfo = createSlice({
  name: "taskAdd",
  initialState,
  reducers: {
    setTaskAddState(state, action: PayloadAction<string>) {
      state.parentId = action.payload;
    },
  },
});

export const { setTaskAddState } = taskAddInfo.actions;
export default taskAddInfo.reducer;
