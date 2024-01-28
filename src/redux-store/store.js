import { configureStore } from '@reduxjs/toolkit'
import todosSlice  from './slices/todos/todos'
import filtersSlice from './slices/filters/status'

const store = configureStore({
  reducer: {
    todos: todosSlice,
    filters: filtersSlice
  }
})

export default store;