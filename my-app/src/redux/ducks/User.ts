import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRdxUser } from "./User.types";

// INITIAL STATE
const INITIAL_STATE: IRdxUser = {
	preferences: {
		theme: "light",
	},
	user: {},
};

// CREATE SLICE
const userSlice = createSlice({
	name: "localdata",
	initialState: INITIAL_STATE,
	reducers: {
		rdxChangePreferenceTheme(state: IRdxUser, action: PayloadAction<IRdxUser["preferences"]["theme"]>) {
			state.preferences.theme = action.payload;
		},
		rdxChangeUserData(state: IRdxUser, action: PayloadAction<IRdxUser["user"]>) {
			state.user.name = action.payload.name;
			state.user.email = action.payload.email;
		},
	},
});

// EXPORT ACTIONS
export const { rdxChangePreferenceTheme, rdxChangeUserData } = userSlice.actions;

// EXPORT REDUCER
export default userSlice.reducer;
