import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
   Collapse,
   MenuList,
   MenuItem,
   ListItemIcon,
   ListItemText,
} from '@mui/material'
import '../Style/outerLayer.sass'

const SideCard = ({ ShowSidebar, pages, setCurrentPage }) => {
   return (
      <Collapse id="sideCard" orientation="horizontal" in={ShowSidebar}>
         <MenuList className="menuList">
            {pages.map((page, i) => (
               <Link key={i} to={page.link} style={{ textDecoration: 'none' }}>
                  <MenuItem
                     className="sideMenu"
                     onClick={() => setCurrentPage(i)}
                  >
                     <ListItemIcon sx={{ color: 'white' }}>
                        {page.icon}
                     </ListItemIcon>
                     <ListItemText>{page.title}</ListItemText>
                  </MenuItem>
               </Link>
            ))}
         </MenuList>
      </Collapse>
   )
}

SideCard.propTypes = {
   ShowSidebar: PropTypes.bool,
   pages: PropTypes.array,
   setCurrentPage: PropTypes.func,
}

export default SideCard
