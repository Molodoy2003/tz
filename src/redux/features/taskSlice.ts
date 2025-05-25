import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface Task {
  id: string
  title: string
  description: string
  time: number
  status: 'pending' | 'in_progress' | 'done'
}

export interface TaskList {
  id: string
  name: string
  tasks: Task[]
}

interface TaskState {
  lists: TaskList[]
  activeListId: string | null
  activeTask: Task | null
}

const initialState: TaskState = {
  lists: [],
  activeListId: null,
  activeTask: null,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<string>) {
      state.lists.push({ id: uuidv4(), name: action.payload, tasks: [] })
    },
    removeList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter(list => list.id !== action.payload)
      if (state.activeListId === action.payload) {
        state.activeListId = null
      }
    },
    setActiveList(state, action: PayloadAction<string>) {
      state.activeListId = action.payload
    },
    addTask(
      state,
      action: PayloadAction<{ listId: string; task: Omit<Task, 'id'> }>
    ) {
      const list = state.lists.find(l => l.id === action.payload.listId)
      if (list) {
        list.tasks.push({ ...action.payload.task, id: uuidv4() })
      }
    },
    updateTask(state, action: PayloadAction<{ listId: string; task: Task }>) {
      const list = state.lists.find(l => l.id === action.payload.listId)
      if (list) {
        const index = list.tasks.findIndex(t => t.id === action.payload.task.id)
        if (index !== -1) {
          list.tasks[index] = action.payload.task
        }
      }
    },
    deleteTask(
      state,
      action: PayloadAction<{ listId: string; taskId: string }>
    ) {
      const list = state.lists.find(l => l.id === action.payload.listId)
      if (list) {
        list.tasks = list.tasks.filter(t => t.id !== action.payload.taskId)
      }
    },
    setActiveTask(state, action: PayloadAction<Task | null>) {
      state.activeTask = action.payload
    },
    updateListName(state, action: PayloadAction<{ id: string; name: string }>) {
      const list = state.lists.find(l => l.id === action.payload.id)
      if (list) {
        list.name = action.payload.name
      }
    },
  },
})

export const {
  addList,
  removeList,
  setActiveList,
  addTask,
  updateTask,
  deleteTask,
  setActiveTask,
  updateListName,
} = taskSlice.actions

export default taskSlice.reducer
