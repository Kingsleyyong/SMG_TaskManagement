import React, { useState } from 'react'
import '../Style/taskList.sass'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { Snackbar, Alert } from '@mui/material'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TaskList = ({ rowData, setTaskStatusCallback }) => {
   const columns = [
      {
         field: 'desc',
         headerName: 'Description',
         type: 'string',
         width: 150,
      },
      {
         field: 'status',
         headerName: 'Status',
         type: 'string',
         width: 500,
         editable: true,
      },
      {
         field: 'done',
         headerName: 'Done',
         type: 'integer',
         width: 150,
      },
      {
         field: 'completed',
         headerName: 'Completed',
         type: 'integer',
         width: 150,
      },
   ]

   const getTreeDataPath = (row) => row.hierarchy

   const [pageSize, setPageSize] = useState(25)

   const groupingColDef = {
      headerName: 'Task Name',
      sortable: 'true',
      disableColumnMenu: 'false',
   }

   const [snackbar, setSnackbar] = useState(null)

   const handleCellEditCommit = async (params) => {
      const response = {
         id: params.id,
         [params.field]: params.value,
      }

      const result = await setTaskStatusCallback(response)

      if (result)
         setSnackbar({
            children: 'Data successfully saved',
            severity: 'success',
         })
      else
         setSnackbar({
            children: 'Error while saving user',
            severity: 'error',
         })
   }

   return !_.isEmpty(rowData) ? (
      <div id="myGrid">
         <DataGridPro
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            pagination
            treeData
            rows={rowData}
            columns={columns}
            disableChildrenSorting={false}
            getTreeDataPath={getTreeDataPath}
            groupingColDef={groupingColDef}
            onCellEditCommit={handleCellEditCommit}
         />
         {!!snackbar && (
            <Snackbar
               open
               onClose={() => setSnackbar(null)}
               autoHideDuration={6000}
            >
               <Alert {...snackbar} onClose={() => setSnackbar(null)} />
            </Snackbar>
         )}
      </div>
   ) : (
      <div> is empty</div>
   )
}

TaskList.propTypes = {
   rowData: PropTypes.array,
   setTaskStatusCallback: PropTypes.func,
}

export default TaskList
