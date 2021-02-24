import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/social/userSlice";
import posteReducer from "../features/social/posteSlice";
export default configureStore({
	reducer: {
		user: userReducer,
		poste: posteReducer,
	},
});
