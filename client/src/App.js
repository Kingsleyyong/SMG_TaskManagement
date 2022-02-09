import TaskListingPage from './Pages/taskList.js'
import TaskCreationPage from './Pages/taskCreation.js'
import AppTitleBar from './Components/appTitleBar.js'
import SideCard from './Components/sideCard.js'
import { getPages, getTask, generateTableRowData } from './dummyDatas.js'

import { useState, useEffect } from 'react'
import './Style/outerLayer.sass'
import { Routes, Route } from 'react-router-dom'

import { LicenseInfo } from '@mui/x-data-grid-pro'

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

   useEffect(() => {
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

   return (
      <div className="content">
         <AppTitleBar
            ShowSidebar={ShowSidebar}
            setShowSidebar={(bool) => {
               setShowSidebar(bool)
            }}
            pages={pages}
            CurrentPage={CurrentPage}
         />

         <div className="appFlex">
            <div>
               {
                  <SideCard
                     ShowSidebar={ShowSidebar}
                     pages={pages}
                     setCurrentPage={(num) => {
                        setCurrentPage(num)
                     }}
                  />
               }
            </div>

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
                           tasksList={tasksList}
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
