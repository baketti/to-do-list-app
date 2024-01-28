import React,{ useState,memo,useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { todoAdded } from '../redux-store/slices/todos/todos';
import { useDispatch, useSelector } from 'react-redux'
import { 
  allTodosCompleted, 
  allTodosUncompleted, 
  clearAllTodosCompleted } from '../redux-store/slices/todos/todos';


const Header = memo(() => {
  const dispatch = useDispatch()

  const [text, setText] = useState('');
  const [btnContent, setBtnContent] = useState('Mark all completed');

  const handleChange = useCallback((e)=>{
    setText(e.target.value)
  },[setText])

  const handleKeyDown = useCallback((e)=> {
    const trimmedText = e.target.value.trim()
    if (e.key === 'Enter' && trimmedText) {
      dispatch(todoAdded(trimmedText))
      console.log(trimmedText);
      setText('')
    }
  },[dispatch,setText])

  const onMarkCompletedClicked = useCallback(() => {
      setBtnContent(btnContent === 'Mark all completed' ? 'Unmark all' : 'Mark all completed')
      if (btnContent === 'Mark all completed') {
        dispatch(allTodosCompleted())
      } else {
          dispatch(allTodosUncompleted())
      }
    },[dispatch,btnContent])

    const todos = useSelector(state => state.todos);
    const markAllBtnDisabled = useCallback(() => {
      const completedTodos = todos.filter(todo => todo.completed)
      return (completedTodos.length === todos.length && btnContent === 'Mark all completed') ? true : false
    },[todos,btnContent]);

  const onClearCompletedClicked = useCallback(() =>{
    setBtnContent('Mark all completed');
    dispatch(clearAllTodosCompleted());
  },[dispatch])
  
  return (
    <div className='header'>
      <nav className='navbar'>
        <section className=''>
          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <section className='title'>
        <h1>To Do List</h1>
      </section>
      <section className='text-field'>
        <Form.Control 
            placeholder="What do you need to do?"
            size="lg"
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
      </section>
      <div className="buttons">
        <button type="button" class="btn btn-primary button"
            onClick={onMarkCompletedClicked}
            data-mdb-ripple-init
            disabled = {markAllBtnDisabled()}
            >
            {btnContent}
        </button>
        <button type="button" class="btn btn-primary button" onClick={onClearCompletedClicked} data-mdb-ripple-init>
            Clear completed
        </button>
      </div>
    </div>
  );
});

export default Header;