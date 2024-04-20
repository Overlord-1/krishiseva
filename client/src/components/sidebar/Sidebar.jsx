import React, { useState } from 'react'
import Links from './Links/Links'
import ToggleButton from './ToggleButton/ToggleButton'
import './sidebar.scss'
import {motion} from 'framer-motion'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const variants = {
    open: { 
      clipPath: 'circle(1200px at 50px 50px)',
      transition:{
        type:'spring',
        stiffness:80,
        restDelta:2
      }
    },
    closed: { 
      clipPath: 'circle(20px at 30px 30px)',
      transition:{
        type:'spring',
        stiffness:1400,
        damping:40
      }
     }
  }
  return (
    <motion.div className='sidebar' animate ={open ?"open":"closed"}>
      <motion.div className="bg" variants={variants}>
        <Links/>
      </motion.div>
      <ToggleButton setOpen ={setOpen} />

    </motion.div>
  )
}

export default Sidebar