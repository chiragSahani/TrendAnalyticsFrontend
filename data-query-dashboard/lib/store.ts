import { configureStore } from "@reduxjs/toolkit"
import queriesReducer from "@/lib/features/queries/queriesSlice"
import profileReducer from "@/lib/features/profile/profileSlice"
import settingsReducer from "@/lib/features/settings/settingsSlice"

export const store = configureStore({
  reducer: {
    queries: queriesReducer,
    profile: profileReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

