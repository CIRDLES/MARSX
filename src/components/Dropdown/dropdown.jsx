
import React from 'react'

import './dropdown.css'

const Dropdown = ({options, value, onChange}) => (
  <div styleName='dropdown'>
    <select value={value || 'test'} onChange={onChange}>
      <option value='test' styleName='defaultValue' disabled> -- select a format -- </option>
      {options.map((option) => {
        return <option key={option.name} value={option.value}>{option.name}</option>
      })}
    </select>
  </div>
)

export default Dropdown
