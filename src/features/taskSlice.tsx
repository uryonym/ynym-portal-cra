import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTaskListsApi, updateTaskApi } from '../api/taskApi'
import { RootState } from '../app/store'

export interface Task {
  id: string
  title: string
  description: string
  dead_line: Date
  is_complete: boolean
  uid: string
  task_list_id: string
  created_at: Date
  updated_at: Date
}

export interface TaskList {
  id: string
  name: string
  uid: string
  share_uid: string
  tasks: Task[]
  created_at: Date
  updated_at: Date
}

export interface TaskState {
  taskLists: TaskList[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TaskState = {
  taskLists: [],
  status: 'idle',
}

export const getTaskLists = createAsyncThunk<TaskList[], undefined, { rejectValue: string }>(
  'task/getTaskLists',
  async (_, { rejectWithValue }) => {
    try {
      return await getTaskListsApi()
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return []
    }
  }
)

export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  'task/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      return await updateTaskApi(task)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return task
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskLists.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getTaskLists.fulfilled, (state, action) => {
      state.taskLists = action.payload
      state.status = 'idle'
    })
    builder.addCase(getTaskLists.rejected, (state, action) => {
      state.taskLists = []
      state.status = 'failed'
      console.log(action.error)
    })
    builder.addCase(updateTask.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updateTaskLists = state.taskLists.slice(0, state.taskLists.length)
      const taskListIndex = updateTaskLists.findIndex((x) => x.id === action.payload.task_list_id)
      const tasks = updateTaskLists[taskListIndex].tasks.map((x) => (x.id === action.payload.id ? action.payload : x))
      if (tasks) {
        updateTaskLists[taskListIndex].tasks = tasks
        state.taskLists = updateTaskLists
      }
      state.status = 'idle'
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const selectTask = (state: RootState) => state.task

export default taskSlice.reducer
