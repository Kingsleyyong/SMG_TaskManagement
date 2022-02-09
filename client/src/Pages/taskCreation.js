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

const TaskCreation = ({
   setAddTaskCallback,
   statusAlert,
   setStatusAlertCallback,
}) => {
   const [formData, setFormData] = useState([])
   const [addTaskLoading, setAddTaskLoading] = useState(false)
   const [nameError, setNameError] = useState(false)

   const [statusObj, setStatusObj] = useState({})

   useEffect(() => {
      setStatusObj({ title: '', content: '', status: '' })
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

   const statusSelection = [
      { label: 'In Progress', value: 'inProgress' },
      { label: 'Done', value: 'done' },
      { label: 'Completed', value: 'completed' },
   ]
   const parentTaskSelection = [
      { label: 'Task 1', value: '111' },
      { label: 'Task 2', value: '222' },
      { label: 'Task 3', value: '333' },
   ]

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
                  {statusSelection.map((option, i) => (
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
                  options={parentTaskSelection}
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
   setAddTaskCallback: PropTypes.func,
   statusAlert: PropTypes.bool,
   setStatusAlertCallback: PropTypes.func,
}

export default TaskCreation
