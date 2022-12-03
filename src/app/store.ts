import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authUserReducer from '../features/authUserSlice'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
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
