import React from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import PropTypes from 'prop-types'
import '../Style/outerLayer.sass'

const AppTitleBar = ({ ShowSidebar, setShowSidebar, pages, CurrentPage }) => {
   return (
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
}

AppTitleBar.propTypes = {
   ShowSidebar: PropTypes.bool,
   setShowSidebar: PropTypes.func,
   pages: PropTypes.array,
   CurrentPage: PropTypes.number,
}

export default AppTitleBar
