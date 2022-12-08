import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BottomAppBar from '../components/BottomAppBar'
import { getTaskLists, selectTask, Task, TaskList, updateTask } from '../features/taskSlice'
import './TaskScreen.scss'

const TaskScreen: FC = () => {
  const { taskLists } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()

  const [tab, setTab] = useState<string>()

  const handleChangeTab = (e: SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const handleChangeCheck = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...task, is_complete: e.target.checked }
    dispatch(updateTask(data))
  }

  useEffect(() => {
    // タスク一覧の取得
    dispatch(getTaskLists())
  }, [dispatch])

  useEffect(() => {
    if (taskLists.length) {
      setTab(taskLists[0].id)
    }
  }, [taskLists])

  const dispTaskListTabs = taskLists.map((taskList: TaskList, index: number) => {
    return (
      <Tab
        label={taskList.name}
        value={taskList.id}
        key={index}
        id={`tab-${index}`}
        aria-controls={`tabpanel-${index}`}
      />
    )
  })

  const dispTasks = (tasks: Task[]) =>
    tasks
      .filter((x) => !x.is_complete)
      .map((task: Task, index: number, array: Task[]) => {
        const dispDeadLine = task.dead_line ? task.dead_line.toString() : ''
        return (
          <ListItem divider={array.length - 1 !== index} disablePadding key={index}>
            <ListItemButton dense>
              <ListItemIcon>
                <Checkbox checked={task.is_complete} disableRipple onChange={handleChangeCheck(task)} />
              </ListItemIcon>
              <ListItemText primary={task.title} secondary={dispDeadLine} />
            </ListItemButton>
          </ListItem>
        )
      })

  const dispCompletedTasks = (tasks: Task[]) =>
    tasks
      .filter((x) => x.is_complete)
      .map((task: Task, index, array) => {
        const dispDeadLine = task.dead_line ? task.dead_line.toString() : ''
        return (
          <ListItem divider={array.length - 1 !== index} disablePadding key={task.id}>
            <ListItemButton dense>
              <ListItemIcon>
                <Checkbox checked={task.is_complete} disableRipple onChange={handleChangeCheck(task)} />
              </ListItemIcon>
              <ListItemText primary={task.title} secondary={dispDeadLine} sx={{ textDecoration: 'line-through' }} />
            </ListItemButton>
          </ListItem>
        )
      })

  const dispTabPanels = taskLists.map((taskList: TaskList, index: number) => {
    return (
      <div
        role='tabpanel'
        hidden={tab !== taskList.id}
        key={index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {tab === taskList.id && (
          <Box>
            <Paper variant='outlined'>
              <List>{dispTasks(taskList.tasks)}</List>
            </Paper>
            <Accordion variant='outlined'>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Completed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>{dispCompletedTasks(taskList.tasks)}</List>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </div>
    )
  })

  return (
    <>
      <Box className='task-main'>
        <Stack>
          <Typography variant='h4'>tasks</Typography>
          <Tabs value={tab} variant='scrollable' onChange={handleChangeTab}>
            {dispTaskListTabs}
          </Tabs>
          {dispTabPanels}
        </Stack>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default TaskScreen
