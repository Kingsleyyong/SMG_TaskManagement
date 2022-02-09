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
import React from 'react'
import '../Style/taskCreation.sass'

const TaskCreation = () => {
   const statusSelection = [
      { label: 'In Progress', value: 'inProgress' },
      { label: 'Done', value: 'done' },
      { label: 'Completed', value: 'completed' },
   ]

   return (
      <Box component="form" className="formBox">
         <div className="flex">
            <span className="labelText">Task Name:</span>
            <FormControl variant="outlined" className="userInput">
               <OutlinedInput
                  id="outlined-adornment-weight"
                  // value={values.weight}
                  // onChange={handleChange('weight')}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                     'aria-label': 'weight',
                  }}
               />
               <FormHelperText id="outlined-weight-helper-text">
                  * Required
               </FormHelperText>
            </FormControl>
         </div>
         <div className="flex">
            <span className="labelText">Description:</span>
            <TextField
               className="userInput"
               // id="outlined-multiline-static"
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
               // value={currency}
               // onChange={handleChange}
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
               freeSolo
               options={statusSelection.map((option) => option.label)}
               renderInput={(params) => (
                  <TextField {...params} placeholder="Type to search tasks" />
               )}
            />
         </div>
         <div className="flex">
            <LoadingButton
               className="button"
               // loading={loading}
               variant="contained"
               loadingPosition="start"
               startIcon={<AddCircleOutlineIcon />}
               sx={{ ml: '1vw', mr: '1vw' }}
            >
               Add Task
            </LoadingButton>
            <Button
               variant="contained"
               color="error"
               className="button"
               sx={{ ml: '1vw', mr: '1vw' }}
            >
               Clear Data
            </Button>
         </div>
      </Box>
   )
}

export default TaskCreation
