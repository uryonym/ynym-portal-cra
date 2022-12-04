import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTasksApi } from '../api/taskApi'
import { RootState } from '../app/store'

export interface Task {
  title: string
}

export interface TaskState {
  tasks: Task[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
}

export const getTasks = createAsyncThunk<Task[], undefined, { rejectValue: string }>(
  'task/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await getTasksApi()
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return []
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
      state.status = 'idle'
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.tasks = []
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const selectTask = (state: RootState) => state.task

export default taskSlice.reducer
