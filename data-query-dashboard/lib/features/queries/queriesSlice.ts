import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock data for different chart types
const mockBarChartData = [
  { name: "Category A", value: 4000 },
  { name: "Category B", value: 3000 },
  { name: "Category C", value: 2000 },
  { name: "Category D", value: 2780 },
  { name: "Category E", value: 1890 },
  { name: "Category F", value: 2390 },
]

const mockLineChartData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 2000 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 3000 },
  { name: "May", value: 2500 },
  { name: "Jun", value: 4000 },
  { name: "Jul", value: 3500 },
]

const mockPieChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 100 },
]

// Types
type QueryHistoryItem = {
  id: string
  text: string
  timestamp: number
}

type ChartType = "bar" | "line" | "pie"

type QueryResult = {
  title: string
  description: string
  data: any[]
  chartType: ChartType
}

type QueriesState = {
  queryHistory: QueryHistoryItem[]
  currentQuery: string | null
  currentResults: QueryResult | null
  loading: boolean
  error: string | null
}

// Initial state
const initialState: QueriesState = {
  queryHistory: [],
  currentQuery: null,
  currentResults: null,
  loading: false,
  error: null,
}

// Mock API call to process query
const processQuery = (query: string): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Determine chart type based on query content
      let chartType: ChartType = "bar"
      let data = mockBarChartData
      let title = "Query Results"
      const description = `Results for: "${query}"`

      if (query.toLowerCase().includes("over time") || query.toLowerCase().includes("trend")) {
        chartType = "line"
        data = mockLineChartData
        title = "Trend Analysis"
      } else if (query.toLowerCase().includes("breakdown") || query.toLowerCase().includes("distribution")) {
        chartType = "pie"
        data = mockPieChartData
        title = "Distribution Analysis"
      }

      // Randomly fail 10% of the time to demonstrate error handling
      if (Math.random() < 0.1) {
        reject(new Error("Failed to process query. Please try again."))
      } else {
        resolve({
          title,
          description,
          data,
          chartType,
        })
      }
    }, 1500) // Simulate 1.5s delay
  })
}

// Async thunk for submitting a query
export const submitQuery = createAsyncThunk("queries/submitQuery", async (query: string, { rejectWithValue }) => {
  try {
    const result = await processQuery(query)
    return { query, result }
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

// Slice
const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.currentResults = null
      state.error = null
    },
    clearHistory: (state) => {
      state.queryHistory = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.currentQuery = action.meta.arg
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        const { query, result } = action.payload
        state.loading = false
        state.currentResults = result

        // Add to query history
        state.queryHistory.unshift({
          id: Date.now().toString(),
          text: query,
          timestamp: Date.now(),
        })

        // Keep only the last 10 queries
        if (state.queryHistory.length > 10) {
          state.queryHistory = state.queryHistory.slice(0, 10)
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearResults, clearHistory } = queriesSlice.actions
export default queriesSlice.reducer

