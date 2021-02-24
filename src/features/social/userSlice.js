import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		connectionState: false,
		idUser: null,
		firstName: null,
		lastName: null,
	},
	reducers: {
		userLogin(state, action) {
			state.connectionState = action.payload.connectionState;
			state.idUser = action.payload.idUser;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
		},
	},
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
