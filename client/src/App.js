import TaskListingPage from './Pages/taskList.js'
import TaskCreationPage from './Pages/taskCreation.js'
import { getPages, getTask } from './dummyDatas.js'

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
import { Menu } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import './Style/outerLayer.sass'
import { Link, Routes, Route } from 'react-router-dom'

import { LicenseInfo } from '@mui/x-data-grid-pro'
import _ from 'lodash'

LicenseInfo.setLicenseKey(
   //update license key here
   'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
)

const App = () => {
   const [ShowSidebar, setShowSidebar] = useState(false)
   const [CurrentPage, setCurrentPage] = useState(0)

   const [tasksList, setTasksList] = useState(getTask())
   const [tableRowData, setTableRowData] = useState()

   const [statusAlert, setStatusAlert] = useState(false)

   const pages = getPages()

   // useEffect(() => {
   //    _.orderBy(tasksList, 'name', 'asc')
   // }, [])

   useEffect(() => {
      // console.log(tasksList)
      setTableRowData(generateTableRowData(tasksList))
   }, [])

   useEffect(() => {
      const setPages = (pathName) => {
         pages.map((page, index) => {
            if (page.link === pathName) currPage = index
         })
         setCurrentPage(currPage)
      }

      let pathName = window.location.pathname,
         currPage = null

      setPages(pathName)

      window.onpopstate = () => {
         pathName = window.location.pathname
         setPages(pathName)
      }
   }, [])

   const generateTableRowData = (data) => {
      let rows = []

      if (!_.isEmpty(data)) {
         let tasks = data,
            nullParentTask = tasks.filter((task) =>
               _.isEmpty(task.parentTaskID),
            ),
            childTask = tasks.filter((task) => !_.isEmpty(task.parentTaskID))

         nullParentTask.forEach((task) => {
            rows.push({
               hierarchy: [task.name],
               desc: task.desc,
               status: task.status,
               id: task.uniqueID,
            })
         })

         while (!_.isEmpty(childTask)) {
            childTask.map((task, i) => {
               rows.some((row) => {
                  if (task.parentTaskID === row.id) {
                     rows.push({
                        hierarchy: row.hierarchy.concat(task.name),
                        desc: task.desc,
                        status: task.status,
                        id: task.uniqueID,
                     })
                     childTask.splice(i, 1)
                  }
               })
            })
         }
      }

      return rows
   }

   const tasksStatusCallback = (status) => {
      try {
         setTableRowData(
            tableRowData.map((row) => {
               // console.log(row, status)
               if (row.id === status.id) {
                  return { ...row, ...status }
               } else return row
            }),
         )

         return true
      } catch (e) {
         // setTask(() => [...tasks])
         setTableRowData(() => [...tableRowData])
         console.log(e)
         return false
      }
   }

   const addTask = (newTask) => {
      try {
         tasksList.push(newTask)
         setTableRowData(generateTableRowData(tasksList))
         return true
      } catch (error) {
         console.log(error)
         return false
      }
   }

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

   return (
      <div className="content">
         {AppTitleBar}

         <div className="appFlex">
            <div>{SideCard}</div>

            <div className="pages">
               <Routes>
                  <Route
                     path="/"
                     element={
                        <TaskListingPage
                           rowData={tableRowData}
                           setTaskStatusCallback={tasksStatusCallback}
                        />
                     }
                  />
                  <Route
                     path="/create-task"
                     element={
                        <TaskCreationPage
                           setAddTaskCallback={addTask}
                           statusAlert={statusAlert}
                           setStatusAlertCallback={() =>
                              setStatusAlert(!statusAlert)
                           }
                        />
                     }
                  />
               </Routes>
            </div>
         </div>
      </div>
   )
}

export default App
