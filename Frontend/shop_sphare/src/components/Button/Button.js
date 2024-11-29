import React from 'react'
import './Style/Button.css'

const Button = ({className, onClick, btnName}) => {
  return (
    <div>
      <button className={className} onClick={onClick} type="submit">{btnName}</button>
    </div>
  )
}

export default Button
