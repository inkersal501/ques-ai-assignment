import React from 'react'

function Button({type="button", style, onClick = null, children}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg cursor-pointer ${style}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button;