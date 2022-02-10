import {
   Box,
   FormControl,
   TextField,
   OutlinedInput,
   FormHelperText,
   MenuItem,
   Autocomplete,
   Button,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useState, useEffect } from 'react'
import '../Style/taskCreation.sass'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import PropTypes from 'prop-types'
import StatusAlertDialog from '../Components/statusAlert'
import { taskStatusSelection } from '../dummyDatas.js'

const TaskCreation = ({
   tasksList,
   setAddTaskCallback,
   statusAlert,
   setStatusAlertCallback,
}) => {
   const [formData, setFormData] = useState([])
   const [addTaskLoading, setAddTaskLoading] = useState(false)
   const [nameError, setNameError] = useState(false)
   const [statusObj, setStatusObj] = useState({})
   const [parentTask, setParentTask] = useState([])

   useEffect(() => {
      setStatusObj({ title: '', content: '', status: '' })
   }, [])

   useEffect(() => {
      setParentTask(parentTaskSelection())
   }, [])

   useEffect(() => {
      setFormData({
         uniqueID: uuidv4(),
         name: '',
         status: 'inProgress',
         parentTaskID: '',
         desc: '',
      })
   }, [])

   const parentTaskSelection = () => {
      let selection = []

      selection = tasksList.map((task) => ({
         label: task.name,
         value: task.uniqueID,
      }))

      selection = _.orderBy(selection, ['label'], ['asc'])
      return selection
   }

   const clearFormData = () => {
      setNameError(false)
      setFormData({
         uniqueID: uuidv4(),
         name: '',
         status: 'inProgress',
         parentTaskID: '',
         desc: '',
      })
      setAddTaskLoading(false)
   }

   const handleInputChange = (prop) => (event) => {
      setFormData({ ...formData, [prop]: event.target.value })
   }

   const submitForm = async () => {
      setAddTaskLoading(true)
      try {
         if (_.isEmpty(formData.name)) {
            setAddTaskLoading(false)
            return setNameError(true)
         }

         const result = await setAddTaskCallback(formData)
         if (result) {
            setStatusObj({
               title: 'Success!',
               content: `Task ID ${formData.uniqueID} has successfully added.`,
               status: 'success',
            })
         } else {
            setStatusObj({
               title: 'ERROR!',
               content: `Task ID ${formData.uniqueID} was not added. Please try again.`,
               status: 'error',
            })
         }
      } catch (error) {
         console.log(error)
         setStatusObj({
            title: 'ERROR!',
            content: `Task ID ${formData.uniqueID} was not added. Please try again.`,
            status: 'error',
         })
      }
      clearFormData()
      setAddTaskLoading(false)
      setStatusAlertCallback(true)
      setParentTask(parentTaskSelection())
   }

   return (
      <div>
         <Box component="form" className="formBox">
            <div className="flex">
               <span className="labelText">Task Name:</span>
               <FormControl variant="outlined" className="userInput">
                  <OutlinedInput
                     error={nameError}
                     id="outlined-adornment-weight"
                     value={formData.name}
                     onChange={handleInputChange('name')}
                     aria-describedby="outlined-weight-helper-text"
                     inputProps={{
                        'aria-label': 'weight',
                     }}
                  />
                  <FormHelperText
                     id="outlined-weight-helper-text"
                     error={nameError}
                  >
                     {nameError ? '* REQUIRED' : '* Required'}
                  </FormHelperText>
               </FormControl>
            </div>
            <div className="flex">
               <span className="labelText">Description:</span>
               <TextField
                  className="userInput"
                  // id="outlined-multiline-static"
                  value={formData.desc}
                  onChange={handleInputChange('desc')}
                  multiline
                  rows={4}
                  placeholder="Descripe your task."
               />
            </div>
            <div className="flex">
               <span className="labelText">Status:</span>
               <TextField
                  // id="outlined-select-currency"
                  select
                  className="userInput"
                  value={formData.status}
                  onChange={handleInputChange('status')}
                  helperText="Task status will be 'In Progress' by default."
                  defaultValue={'inProgress'}
               >
                  {taskStatusSelection().map((option, i) => (
                     <MenuItem key={i} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>
            </div>
            <div className="flex">
               <span className="labelText">Parent Task:</span>
               <Autocomplete
                  className="userInput"
                  // id="free-solo-demo"
                  options={parentTask}
                  // isOptionEqualToValue={(option, value) => option.value === value}
                  value={formData.parentTaskID}
                  onChange={(event, newValue) => {
                     setFormData({ ...formData, parentTaskID: newValue.value })
                  }}
                  renderInput={(params) => (
                     <TextField
                        {...params}
                        placeholder="Type to search tasks"
                     />
                  )}
               />
            </div>
            <div className="flex">
               <LoadingButton
                  className="button"
                  loading={addTaskLoading}
                  variant="contained"
                  loadingPosition="start"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ ml: '1vw', mr: '1vw' }}
                  onClick={submitForm}
               >
                  Add Task
               </LoadingButton>
               <Button
                  variant="contained"
                  color="error"
                  className="button"
                  sx={{ ml: '1vw', mr: '1vw' }}
                  onClick={clearFormData}
               >
                  Clear Data
               </Button>
            </div>
         </Box>

         <StatusAlertDialog
            object={statusObj}
            open={statusAlert}
            setOpenDialog={setStatusAlertCallback}
         />
      </div>
   )
}

TaskCreation.propTypes = {
   tasksList: PropTypes.array,
   setAddTaskCallback: PropTypes.func,
   statusAlert: PropTypes.bool,
   setStatusAlertCallback: PropTypes.func,
}

export default TaskCreation
