import TaskListingPage from './Pages/taskList'
import {
   AppBar,
   Toolbar,
   IconButton,
   Collapse,
   MenuList,
   MenuItem,
   ListItemIcon,
   ListItemText,
} from '@mui/material'
import { Menu, ListAlt, Input } from '@mui/icons-material'
// import ListAltIcon from '@mui/icons-material/ListAlt'
import { useState } from 'react'
import './Style/outerLayer.sass'

const App = () => {
   const pages = [
      { title: 'Task Listing Page', icon: <ListAlt /> },
      { title: 'Task Creation Form', icon: <Input /> },
   ]
   const [ShowSidebar, setShowSidebar] = useState(true)
   const [CurrentPage, setCurrentPage] = useState(0)

   const AppTitleBar = (
      <AppBar id="appBar">
         <Toolbar variant="dense">
            <IconButton
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               onClick={() => setShowSidebar(!ShowSidebar)}
            >
               <Menu />
            </IconButton>
            <div className="appTitleBarText">{pages[CurrentPage].title}</div>
         </Toolbar>
      </AppBar>
   )

   const SideCard = (
      <Collapse id="sideCard" orientation="horizontal" in={ShowSidebar}>
         <MenuList className="menuList">
            {pages.map((page, i) => (
               <MenuItem
                  className="sideMenu"
                  key={i}
                  onClick={() => setCurrentPage(i)}
               >
                  <ListItemIcon sx={{ color: 'white' }}>
                     {page.icon}
                  </ListItemIcon>
                  <ListItemText>{page.title}</ListItemText>
               </MenuItem>
            ))}
         </MenuList>
      </Collapse>
   )

   return (
      <div className="content">
         {AppTitleBar}

         <div className="appFlex">
            <div>{SideCard}</div>

            <div className="pages">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
               Reprehenderit libero molestias doloremque laudantium hic nemo
               officia dolorem, voluptatum voluptate cumque cum quae odio qui
               maiores a facilis aliquam, doloribus impedit. Lorem ipsum dolor,
               sit amet consectetur adipisicing elit. Reprehenderit libero
               molestias doloremque laudantium hic nemo officia dolorem,
               voluptatum voluptate cumque cum quae odio qui maiores a facilis
               aliquam, doloribus impedit. Lorem ipsum dolor, sit amet
               consectetur adipisicing elit. Reprehenderit libero molestias
               doloremque laudantium hic nemo officia dolorem, voluptatum
               voluptate cumque cum quae odio qui maiores a facilis aliquam,
               doloribus impedit. Lorem ipsum dolor, sit amet consectetur
               adipisicing elit. Reprehenderit libero molestias doloremque
               laudantium hic nemo officia dolorem, voluptatum voluptate cumque
               cum quae odio qui maiores a facilis aliquam, doloribus impedit.
            </div>
         </div>
      </div>
   )
}

export default App
