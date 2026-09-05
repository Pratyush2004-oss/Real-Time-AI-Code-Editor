import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "../features/projects/store/project.slice";
import UserReducer from "../features/auth/store/user.slice";
export const store = configureStore({
    reducer: {
        user: UserReducer,
        project: ProjectReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;