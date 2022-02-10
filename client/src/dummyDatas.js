import { ListAlt, Input, Search } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { element, object } from 'prop-types'

const getPages = () => [
   { title: 'Task Listing Page', icon: <ListAlt />, link: '/' },
   { title: 'Task Creation Form', icon: <Input />, link: '/create-task' },
]

const getTask = () => {
   let firstID = uuidv4(),
      secondID = uuidv4(),
      thirdID = uuidv4(),
      forthID = uuidv4(),
      fifthID = uuidv4(),
      sixthID = uuidv4(),
      seventhID = uuidv4(),
      eighthID = uuidv4(),
      ninethID = uuidv4(),
      tenthID = uuidv4(),
      eleventhID = uuidv4(),
      twiththID = uuidv4()

   return [
      {
         uniqueID: eleventhID,
         name: 'Task Example 11',
         status: 'done',
         parentTaskID: tenthID,
         desc: `1st Child Task of ${tenthID}`,
      },
      {
         uniqueID: twiththID,
         name: 'Task Example 12',
         status: 'inProgress',
         parentTaskID: sixthID,
         desc: `3rd Child Task of ${sixthID}`,
      },
      {
         uniqueID: thirdID,
         name: 'Task Example 3',
         status: 'done',
         parentTaskID: secondID,
         desc: `1st Child Task of ${secondID}`,
      },
      {
         uniqueID: forthID,
         name: 'Task Example 4',
         status: 'inProgress',
         parentTaskID: secondID,
         desc: `2nd Child Task of ${secondID}`,
      },
      {
         uniqueID: fifthID,
         name: 'Task Example 5',
         status: 'done',
         parentTaskID: forthID,
         desc: `Child Task of ${forthID}`,
      },
      {
         uniqueID: firstID,
         name: 'Task Example 1',
         status: 'done',
         parentTaskID: null,
         desc: 'Task With No Child',
      },
      {
         uniqueID: eighthID,
         name: 'Task Example 8',
         status: 'inProgress',
         parentTaskID: seventhID,
         desc: `1st Child Task of ${seventhID}`,
      },
      {
         uniqueID: ninethID,
         name: 'Task Example 9',
         status: 'done',
         parentTaskID: seventhID,
         desc: `2nd Child Task of ${seventhID}`,
      },
      {
         uniqueID: secondID,
         name: 'Task Example 2',
         status: 'inProgress',
         parentTaskID: null,
         desc: 'Task With Child',
      },
      {
         uniqueID: sixthID,
         name: 'Task Example 6',
         status: 'inProgress',
         parentTaskID: null,
         desc: `Task with child`,
      },
      {
         uniqueID: seventhID,
         name: 'Task Example 7',
         status: 'inProgress',
         parentTaskID: sixthID,
         desc: `1st Child Task with child of ${sixthID}`,
      },
      {
         uniqueID: tenthID,
         name: 'Task Example 10',
         status: 'inProgress',
         parentTaskID: sixthID,
         desc: `2nd Child Task with child of ${sixthID}`,
      },
   ]
}

// const recursionChildArrange = (childObjectList) => {

// }

const generateTableRowData = (data) => {
   let rows = [],
      childObjectList = []

   if (!_.isEmpty(data)) {
      let tasks = data,
         nullParentTask = tasks.filter((task) => _.isEmpty(task.parentTaskID)),
         childTask = tasks.filter((task) => !_.isEmpty(task.parentTaskID))

      nullParentTask.forEach((task) => {
         rows.push({
            hierarchy: [task.name],
            // children: [task.uniqueID],
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
                     // children: row.children.concat(task.uniqueID),
                     desc: task.desc,
                     status: task.status,
                     id: task.uniqueID,
                  })
                  childTask.splice(i, 1)
               }
            })
         })
      }

      // tasks.forEach((task) => {
      //    let taskID = '',
      //       taskName = ''
      //    taskID = task.parentTaskID
      //    tasks.some((obj) => {
      //       if (obj.uniqueID === taskID) {
      //          taskName = obj.name

      //          if (!_.isEmpty(obj)) {
      //             return childObjectList.push({
      //                taskID: taskID,
      //                taskName: taskName,
      //                dependencies: [],
      //             })
      //          }
      //       }
      //    })
      // })
      // childObjectList = _.uniqBy(childObjectList, 'taskID')
      // tasks.forEach((task) => {
      //    let index = childObjectList.findIndex(
      //       (x) => x.taskID === task.parentTaskID,
      //    )
      //    if (index >= 0) childObjectList[index].dependencies.push(task)
      // })

      // console.log(childObjectList)
   }

   // console.log(rows)
   // recursionChildArrange(childObjectList)

   return rows
}

const taskStatusSelection = () => [
   { label: 'In Progress', value: 'inProgress' },
   { label: 'Done', value: 'done' },
   { label: 'Completed', value: 'completed' },
]

export { getPages, getTask, generateTableRowData, taskStatusSelection }
