import React from 'react'
import { Link } from 'react-router-dom'

const Links = () => {

  return (
    <div className='links'>
      <Link to={"/crop"}><a>Crop Predictor</a></Link>
      <Link to={"/leaf"}><a>Leaf Detector</a></Link>
      <Link to={"/community"}><a>Community Section</a></Link>
    </div>
  )
}

export default Links