import React,{ memo,useMemo } from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import ToDoitem from './ToDoitem';

const selectTodoIds = state => state.todos.map(todo => todo.id)

const TodoList = memo(() => {
  
  const todoIds = useSelector(selectTodoIds,shallowEqual)
  const status = useSelector(state => state.filters.status)
  const colors = useSelector(state => state.filters.colors)
  const todos = useSelector(state => state.todos)

  const renderedListItems =  useMemo(()=>
    todoIds.map(todoId => {
      const todo = todos.find(todo => todo.id === todoId);
      if (status === 'active' && todo.completed) {
        return null;
      }
      if (status === 'completed' && !todo.completed) {
        return null;
      }
      if (colors.length > 0 && !colors.includes(todo.color)) {
        return null;
      }
      return <ToDoitem key={todoId} id={todoId} />;
    }),[todoIds,status,colors,todos]);
  

  return (
    <div className='list-container'>
        <ul className="todo-list">{renderedListItems}</ul>
    </div>
    )
});

export default TodoList;