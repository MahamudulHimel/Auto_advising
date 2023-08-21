import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomePage from './HomePage';
import { Route, Routes } from 'react-router-dom';
import AutoAdvising from './AutoAdvising'
import Time_Set from "./Time_Set"
import SelectedCourses from './SelectedCourse';
import CourseSelect from './CourseSelect';
import basestyle from "./Base.module.css";

const drawerWidth = 240;

export default function SidebarPage({ setUserState, user }) {
  
  function render_page(button){
    if (button == "Home"){
      console.log(user.id)
      return(<HomePage userId = {user.id} />)
    }else if (button == "Time Set"){
      return(<Time_Set userId = {user.id} />)
    }else{
      return(<CourseSelect userId = {user.id}/>)
    }
  }
  const [button, setButton] = React.useState("Home")

  React.useEffect(()=>{

  },[button])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Auto Advising
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "-moz-hidden-unscrollable" }}>
          <List>
          <ListItem>
            <ListItemButton href = {`/login`}
              className={basestyle.button_common}
              onClick={() => setUserState({})}
            >
              Logout
            </ListItemButton>
            </ListItem>
            <ListItem>{user.name}</ListItem>
            
            {['Home', 'Time Set', 'Course Selection'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => {setButton(text);}} >
                  <ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {render_page(button)}
      </Box>
    </Box>
  );
}
