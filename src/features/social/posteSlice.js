import { createSlice } from "@reduxjs/toolkit";

const posteSlice = createSlice({
	name: "poste",
	initialState: [],
	reducers: {
		addPoste: {
			reducer(state, action) {
				return [action.payload, ...state];
			},
			prepare(
				idUser,
				firstName,
				lastName,
				img_url,
				date,
				date_event,
				description,
			) {
				return {
					payload: {
						user: { idUser, firstName, lastName },
						img_url,
						date,
						date_event,
						description,
					},
				};
			},
		},
		statueChange(state, action) {
			state.statue = action.payload;
		},
	},
});
export const { addPoste, statueChange } = posteSlice.actions;
export default posteSlice.reducer;
