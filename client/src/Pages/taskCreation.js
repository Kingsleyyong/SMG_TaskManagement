import { Box } from '@mui/material'
import React from 'react'

const TaskCreation = () => {
   return (
      <Box component="form">
         <div>
            <span>Task Name:</span>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
               <Input
                  id="standard-adornment-weight"
                  value={values.weight}
                  onChange={handleChange('weight')}
                  endAdornment={
                     <InputAdornment position="end">kg</InputAdornment>
                  }
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                     'aria-label': 'weight',
                  }}
               />
               <FormHelperText id="standard-weight-helper-text">
                  Weight
               </FormHelperText>
            </FormControl>
         </div>
      </Box>
   )
}

export default TaskCreation
