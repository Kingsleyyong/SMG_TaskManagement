import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Slide,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />
})

const StatusAlertDialog = ({ object, open, setOpenDialog }) => {
   const handleClose = () => {
      setOpenDialog()
   }

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleClose}
         aria-describedby="alert-dialog-slide-description"
         sx={{ textAlign: 'center' }}
      >
         <DialogContent sx={{ pt: '1vw', pb: '1vw' }}>
            {object.status === 'success' ? (
               <CheckCircleIcon sx={{ fontSize: 80 }} color={'success'} />
            ) : (
               <ErrorIcon sx={{ fontSize: 80 }} color="error"></ErrorIcon>
            )}
         </DialogContent>

         <DialogTitle sx={{ p: 0 }}>{object.title}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               {object.content}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>OK</Button>
         </DialogActions>
      </Dialog>
   )
}

StatusAlertDialog.propTypes = {
   object: PropTypes.object,
   open: PropTypes.bool,
   setOpenDialog: PropTypes.func,
}

export default StatusAlertDialog
