import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  selectedTab: string;
}

const initialState: HomeState = {
  selectedTab: 'Global Feed',
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeTab: (state, { payload: tab }: PayloadAction<string>) => {
      state.selectedTab = tab;
    },
  },
});

export const { changeTab } = slice.actions;

export default slice.reducer;
