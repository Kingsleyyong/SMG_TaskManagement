import { ListAlt, Input } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const getPages = () => [
   { title: 'Task Listing Page', icon: <ListAlt />, link: '/' },
   { title: 'Task Creation Form', icon: <Input />, link: '/create-task' },
]

const getTask = () => {
   let firstID = uuidv4(),
      secondID = uuidv4(),
      thirdID = uuidv4(),
      forthID = uuidv4(),
      fifthID = uuidv4()

   return [
      {
         uniqueID: uuidv4(),
         name: 'Task Example 11',
         status: 'done',
         parentTaskID: fifthID,
         desc: `1st Child Task of ${fifthID}`,
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 12',
         status: 'inProgress',
         parentTaskID: thirdID,
         desc: `3rd Child Task of ${thirdID}`,
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 3',
         status: 'done',
         parentTaskID: firstID,
         desc: `1st Child Task of ${firstID}`,
      },
      {
         uniqueID: secondID,
         name: 'Task Example 4',
         status: 'inProgress',
         parentTaskID: firstID,
         desc: `2nd Child Task of ${firstID}`,
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 5',
         status: 'done',
         parentTaskID: secondID,
         desc: `Child Task of ${secondID}`,
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 1',
         status: 'done',
         parentTaskID: null,
         desc: 'Task With No Child',
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 8',
         status: 'inProgress',
         parentTaskID: forthID,
         desc: `1st Child Task of ${forthID}`,
      },
      {
         uniqueID: uuidv4(),
         name: 'Task Example 9',
         status: 'done',
         parentTaskID: forthID,
         desc: `2nd Child Task of ${forthID}`,
      },
      {
         uniqueID: firstID,
         name: 'Task Example 2',
         status: 'inProgress',
         parentTaskID: null,
         desc: 'Task With Child',
      },
      {
         uniqueID: thirdID,
         name: 'Task Example 6',
         status: 'inProgress',
         parentTaskID: null,
         desc: `Task with child`,
      },
      {
         uniqueID: forthID,
         name: 'Task Example 7',
         status: 'inProgress',
         parentTaskID: thirdID,
         desc: `1st Child Task with child of ${thirdID}`,
      },
      {
         uniqueID: fifthID,
         name: 'Task Example 10',
         status: 'inProgress',
         parentTaskID: thirdID,
         desc: `2nd Child Task with child of ${thirdID}`,
      },
   ]
}

const generateTableRowData = (data) => {
   let rows = []

   if (!_.isEmpty(data)) {
      let tasks = data,
         nullParentTask = tasks.filter((task) => _.isEmpty(task.parentTaskID)),
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

const taskStatusSelection = () => [
   { label: 'In Progress', value: 'inProgress' },
   { label: 'Done', value: 'done' },
   { label: 'Completed', value: 'completed' },
]

export { getPages, getTask, generateTableRowData, taskStatusSelection }
