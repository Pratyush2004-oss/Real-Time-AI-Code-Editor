import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user.slice";
export const authStore = configureStore({
    reducer: {
        user: UserReducer
    }
})

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch
