import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth'
import { firebaseAuth } from '../app/firebase'

export interface AuthUserState {
  user: User | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthUserState = {
  user: null,
  status: 'idle',
}

const provider = new GoogleAuthProvider()

export const signIn = createAsyncThunk('authUser/signIn', async (user: User, thunkAPI) => {
  try {
    if (user === null) {
      await signInWithRedirect(firebaseAuth, provider)
      const result = await getRedirectResult(firebaseAuth)
      if (result) {
        return result.user
      }
      return null
    } else {
      return user
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
})
