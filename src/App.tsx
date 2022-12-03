import { onAuthStateChanged, User } from 'firebase/auth'
import { FC, useCallback, useEffect } from 'react'
import { firebaseAuth } from './app/firebase'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { login, logout, selectAuthUser } from './features/authUserSlice'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import './App.css'

const App: FC = () => {
  const { isInitialized, isAuthenticated } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const refresh = useCallback(
    async (user: User) => {
      return dispatch(login(user))
    },
    [dispatch]
  )

  useEffect(() => {
    const f = async () => {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user && !isAuthenticated) {
          return await refresh(user)
        }
        if (!user && !isAuthenticated) {
          dispatch(logout())
        }
      })
    }
    f()
  }, [])

  console.log(`isInitialized: ${isInitialized}`)
  console.log(`isAuthenticated: ${isAuthenticated}`)

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <HomeScreen />
}

export default App
