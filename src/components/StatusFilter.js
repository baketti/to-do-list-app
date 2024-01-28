import React,{memo} from 'react'
import {StatusFilters} from '../redux-store/slices/filters/status'

const StatusFilter = memo(({ value: status, onChange }) => {
  //componente interno
  const RenderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={`status-button ${className}`} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul className='filters'>{RenderedFilters}</ul>
    </div>
  )
});

export default StatusFilter;