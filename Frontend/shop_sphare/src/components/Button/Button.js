import React from 'react'
import './Style/Button.css'

const Button = (props) => {
  return (
    <div>
      <button class="btn btn-success" type="submit">{props.btnName}</button>
    </div>
  )
}

export default Button
