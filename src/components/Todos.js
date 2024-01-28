import React,{memo} from 'react'

const Todos = memo(({count,status}) => {
  const suffix = count === 1 ? '' : 'S';
  const selection = status === 'active' ? status :
                    status === 'completed' ? status : 
                    ''
  return (
    <div className='uncompleted'>
        <h4><strong>{count} </strong>TODO{suffix} {selection.toUpperCase()}</h4>
    </div>
  )
});

export default Todos