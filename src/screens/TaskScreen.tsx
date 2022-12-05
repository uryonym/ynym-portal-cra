import { Box, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import BottomAppBar from '../components/BottomAppBar'
import { getTasks, selectTask } from '../features/taskSlice'
import './TaskScreen.scss'

const TaskScreen: FC = () => {
  const { tasks } = useAppSelector(selectTask)

  useEffect(() => {
    // タスク一覧の取得
    getTasks()
  })

  return (
    <>
      <Box className='task-main'>
        <Typography variant='h2'>task page</Typography>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default TaskScreen
