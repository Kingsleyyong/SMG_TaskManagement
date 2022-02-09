import React, { useState, useEffect } from 'react'
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import PropTypes from 'prop-types'
import '../Style/taskList.sass'

const StatusComponent = (props) => {
   const [inProgress, setInProgress] = useState(false)
   const [done, setDone] = useState(false)
   const [completed, setCompleted] = useState(false)

   useEffect(() => {
      console.log(props)
      props.row.status === 'inProgress'
         ? setInProgress(true)
         : props.row.status === 'done'
         ? setDone(true)
         : setCompleted(true)
   }, [])

   const handleChange = (event) => {
      switch (event.target.name) {
         case 'inProgress':
            props.row.status = 'inProgress'
            setInProgress(true)
            setDone(false)
            setCompleted(false)
            break
         case 'done':
            props.row.status = 'done'
            setInProgress(false)
            setDone(true)
            setCompleted(false)
            break
      }
      console.log(props)
   }

   const showComplete = () => {
      if (props.row.status === 'completed' && inProgress !== true)
         return (
            <div className="completeStatus">
               <BeenhereIcon color="success" fontSize="large" />
               Completed
            </div>
         )
      else return <div className="completeStatus"></div>
   }

   return (
      <FormGroup className="radioForm">
         <FormControlLabel
            control={
               <Checkbox
                  checked={inProgress}
                  onChange={handleChange}
                  name="inProgress"
               />
            }
            label="In Progress"
         />
         <FormControlLabel
            control={
               <Checkbox checked={done} onChange={handleChange} name="done" />
            }
            label="Done"
         />
         {showComplete()}
      </FormGroup>
   )
   // else
   //    return (
   //       <div className="radioForm">
   //          <div className="radioGroup">
   //             <BeenhereIcon color="success" fontSize="large" />
   //             Completed
   //          </div>
   //       </div>
   //    )
}

StatusComponent.propTypes = {
   row: PropTypes.object,
}

export default StatusComponent
