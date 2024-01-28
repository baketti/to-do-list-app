import React,{memo} from 'react'
import {availableColors, capitalize} from '../redux-store/slices/filters/colors';

const ColorFilters = memo(({ value: colors, onChange }) => {

  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }
    
    return (
    <div key={color}
      style={{
        display: 'flex',
        direction:'column',
        alignItems:'center',
        padding:'4px',
      }}>
      <div class="form-check">
      <label 
          class="form-check-label" 
          for="flexCheckChecked"
          style={{
            display: 'flex',
            gap:'10px',
          }}
        >
        <input 
          class="form-check-input" 
          type="checkbox" 
          name={color}
          value="" 
          id="flexCheckChecked" 
          checked={checked}
          onChange={handleChange}
        />
          <span
              className="color-block"
              style={{
                width: '20px',
                height: '20px',
                borderRadius:'100%', 
                backgroundColor: color,
                alignSelf:'center',
              }}
            ></span>
          {capitalize(color)}
        </label>
      </div>
    </div>
    )
  })
  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
});

export default ColorFilters;
