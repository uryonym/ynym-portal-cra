import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authUserReducer from '../features/authUserSlice'
import taskReducer from '../features/taskSlice'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
