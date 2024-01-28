import { createSlice } from '@reduxjs/toolkit'

const initialState = []
  
function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

const todosSlice = createSlice({  
  name:"todos", 
  initialState,
  reducers: {
    todoAdded(state, action) {
      const  text = action.payload
      const id = nextTodoId(state)
      state.push({ id:id, text, completed: false, color:undefined })
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    todoColorChanged(state, action) {
      const { color, todoId } = action.payload
      const todo = state.find(todo => todo.id === todoId)
      if (todo) {
        todo.color = color
      }
    },
    todoDeleted(state, action) {
      return state.filter(todo => todo.id !== action.payload)
    },
    allTodosCompleted(state, action) {
      state.forEach(todo => todo.completed = true)
    },
    allTodosUncompleted(state, action) {
      state.forEach(todo => todo.completed = false)
    },
    clearAllTodosCompleted(state, action) {
      return state.filter(todo => !todo.completed)
    }
  }
})

export const { 
  todoAdded, 
  todoToggled, 
  todoColorChanged, 
  todoDeleted, 
  allTodosCompleted, 
  allTodosUncompleted,
  clearAllTodosCompleted 
} = todosSlice.actions

export default todosSlice.reducer