import React from 'react'

const ToggleButton = ({setOpen}) => {
  return (
    <button onClick={()=>setOpen((prev)=>!prev)}>ToggleButton</button>
  )
}

export default ToggleButton