import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import BottomAppBar from '../components/BottomAppBar'
import './LoginScreen.scss'

const LoginScreen: FC = () => {
  return (
    <>
      <Box className='login-main'>
        <Typography variant='h3'>SignIn</Typography>
        <Button variant='contained'>SignIn</Button>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default LoginScreen
