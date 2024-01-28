import React,{memo, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { availableColors,capitalize } from '../redux-store/slices/filters/colors';
import { todoColorChanged, todoDeleted,todoToggled } from '../redux-store/slices/todos/todos';
import { MDBIcon } from 'mdb-react-ui-kit';

const selectTodoById = (state, todoId) => {
    return state.todos.find(todo => todo.id === todoId)
  }

const ToDoitem = memo(({id}) => {

  const todo = useSelector(state => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = useCallback(() => {
    dispatch(todoToggled(todo.id))
  },[dispatch,todo]);

  const handleDeleteToDoitem = useCallback(() => {    
    dispatch(todoDeleted(todo.id))
  },[dispatch,todo]);

  const handleColorChange = useCallback((e) => {
    const color = e.target.value 
    const todoId = todo.id
    dispatch(todoColorChanged({todoId, color}))
  },[dispatch,todo]);

  const colors = ['',...availableColors]

  return (
    <li className='todo-item'>
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" value="" 
          id="flexCheckChecked" 
          checked={completed}
          onChange={handleCompletedChanged}        
        />
      </div>
      <div className="view">{text}</div>
      <select value={color} onChange={handleColorChange} style={{
        backgroundColor:`${color}`,
        borderRadius:'8px',
      }}>
       {colors.map(color => (
        (color === '') ? <option key={0}></option> : 
        <option key={color} value={color} style={{color:`${color}`, backgroundColor:'white'}}>
           {capitalize(color)}
        </option>
       ))}
      </select>
      <MDBIcon far icon="trash-alt" className='delete-icon' onClick={handleDeleteToDoitem}/>
    </li>
  )
})

export default ToDoitem;