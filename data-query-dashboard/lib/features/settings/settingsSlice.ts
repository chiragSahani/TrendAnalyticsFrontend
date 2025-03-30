import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type SettingsState = {
  settings: {
    theme: string
    colorScheme: string
    enableAnimations: boolean
    reducedMotion: boolean
    enableSoundEffects: boolean
    enableAutoSuggestions: boolean
    saveQueries: boolean
    defaultChartType: string
  }
}

const initialState: SettingsState = {
  settings: {
    theme: "system",
    colorScheme: "purple",
    enableAnimations: true,
    reducedMotion: false,
    enableSoundEffects: true,
    enableAutoSuggestions: true,
    saveQueries: true,
    defaultChartType: "bar",
  },
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState["settings"]>>) => {
      state.settings = { ...state.settings, ...action.payload }
    },
    resetSettings: (state) => {
      state.settings = initialState.settings
    },
  },
})

export const { updateSettings, resetSettings } = settingsSlice.actions
export default settingsSlice.reducer

