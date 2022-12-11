import { firebaseAuth } from '../app/firebase'

export const apiUrl =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PRO : process.env.REACT_APP_API_URL_DEV

export const getApiConfig = async () => {
  const idToken = await firebaseAuth.currentUser?.getIdToken(true)
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }
}
