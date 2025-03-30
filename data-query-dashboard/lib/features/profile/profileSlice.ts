import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserStats = {
  queries: number
  visualizations: number
  savedReports: number
}

type NotificationPreference = {
  name: string
  description: string
  enabled: boolean
}

type Activity = {
  type: "query" | "visualization"
  description: string
  timestamp: string
}

type User = {
  name: string
  email: string
  avatar: string
  role: string
  location: string
  bio: string
  stats: UserStats
  notificationPreferences: NotificationPreference[]
  recentActivity: Activity[]
}

type ProfileState = {
  user: User
}

const initialState: ProfileState = {
  user: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Data Analyst",
    location: "San Francisco, CA",
    bio: "Data enthusiast with a passion for turning complex information into actionable insights. Specializing in visualization and AI-powered analytics.",
    stats: {
      queries: 128,
      visualizations: 47,
      savedReports: 12,
    },
    notificationPreferences: [
      {
        name: "Email Notifications",
        description: "Receive updates and reports via email",
        enabled: true,
      },
      {
        name: "Query Alerts",
        description: "Get notified when queries complete",
        enabled: true,
      },
      {
        name: "Weekly Reports",
        description: "Receive weekly usage summaries",
        enabled: false,
      },
    ],
    recentActivity: [
      {
        type: "query",
        description: "Analyzed sales data by region",
        timestamp: "Today at 10:23 AM",
      },
      {
        type: "visualization",
        description: "Created bar chart for Q2 performance",
        timestamp: "Yesterday at 3:45 PM",
      },
      {
        type: "query",
        description: "Compared marketing campaign results",
        timestamp: "2 days ago",
      },
      {
        type: "visualization",
        description: "Generated pie chart for user demographics",
        timestamp: "3 days ago",
      },
    ],
  },
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload }
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.user.recentActivity.unshift(action.payload)
      if (state.user.recentActivity.length > 10) {
        state.user.recentActivity = state.user.recentActivity.slice(0, 10)
      }
    },
    updateNotificationPreference: (state, action: PayloadAction<{ name: string; enabled: boolean }>) => {
      const { name, enabled } = action.payload
      const prefIndex = state.user.notificationPreferences.findIndex((pref) => pref.name === name)
      if (prefIndex !== -1) {
        state.user.notificationPreferences[prefIndex].enabled = enabled
      }
    },
  },
})

export const { updateProfile, addActivity, updateNotificationPreference } = profileSlice.actions
export default profileSlice.reducer

