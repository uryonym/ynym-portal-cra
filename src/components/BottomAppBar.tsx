import { Add, Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { FC, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../features/authUserSlice'
import SpaceBox from './SpaceBox'
import './BottomAppBar.scss'

const MenuButton: FC = () => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const handleClickSignOut = () => {
    dispatch(logout())
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => setIsOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)}>
        <Box>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary='Task' />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary='Authenticate' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={handleClickSignOut}>
                <ListItemText primary='LogOut' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

const AddFab: FC = () => {
  return (
    <Fab className='add-fab' color='secondary'>
      <Add />
    </Fab>
  )
}

const BottomAppBar: FC = () => {
  return (
    <AppBar className='bottom-app-bar' position='fixed'>
      <Toolbar>
        <MenuButton />
        <AddFab />
        <SpaceBox />
      </Toolbar>
    </AppBar>
  )
}

export default BottomAppBar
