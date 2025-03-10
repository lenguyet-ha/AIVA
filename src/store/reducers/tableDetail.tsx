import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableInfo {
  currentId?: string;
  showDetail?: boolean;
}

interface TableDetailState {
  info: TableInfo;
}

const initialState: TableDetailState = {
    info: {},
};

const tableDetailInfo = createSlice({
  name: 'tableDetail',
  initialState,
  reducers: {
    setTableDetailState(state, action: PayloadAction<TableInfo>) {
      state.info = action.payload; // Update the state with the user info
    },
  },
});

export const { setTableDetailState } = tableDetailInfo.actions;
export default tableDetailInfo.reducer;
