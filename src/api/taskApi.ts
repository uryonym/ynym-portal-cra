import axios, { AxiosResponse } from 'axios'
import { firebaseAuth } from '../app/firebase'
import { Task, TaskList } from '../features/taskSlice'

const apiUrl =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PRO : process.env.REACT_APP_API_URL_DEV

const getIdToken = () =>
  firebaseAuth.currentUser?.getIdToken(true).then((idToken) => {
    return idToken
  })

export const getTaskListsApi = async () => {
  const idToken = await getIdToken()
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }
  return axios.get(`${apiUrl}/task_lists`, config).then((response: AxiosResponse<TaskList[]>) => response.data)
}

export const updateTaskApi = async (postData: Task) => {
  const idToken = await getIdToken()
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }
  const data = {
    task: postData,
  }
  return axios
    .patch(`${apiUrl}/tasks/${postData.id}`, data, config)
    .then((response: AxiosResponse<Task>) => response.data)
}
