import React,{memo,useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ColorFilters from './ColorFilters'
import StatusFilter from './StatusFilter'
import Todos from './Todos'
import { colorFilterChanged, statusFilterChanged } from '../redux-store/slices/filters/status'

const Filters = memo(() => {

  const dispatch = useDispatch()

  const todos = useSelector((state) => state.todos)

  const { status, colors } = useSelector((state) => state.filters)

  const filteredTodos = status === 'active' ? todos.filter((t) => !t.completed) :
                        status === 'completed' ? todos.filter((t) => t.completed) :
                        todos;

  const onColorChange = useCallback ((color, changeType) =>{
    dispatch(colorFilterChanged(color, changeType))
  },[dispatch])

  const onStatusChange = useCallback((status) => {
    dispatch(statusFilterChanged(status))
  },[dispatch])

  return (
    <section className="fixed-filters">
      <div className='fixed-content'>
        <Todos count={filteredTodos.length} status={status} />
        <div className='filters-container'>
          <StatusFilter value={status} onChange={onStatusChange} />
          <ColorFilters value={colors} onChange={onColorChange} />
        </div>
      </div>
    </section>
  )
})

export default Filters;