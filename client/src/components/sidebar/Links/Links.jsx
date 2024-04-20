import React from 'react'
import { Link } from 'react-router-dom'

const Links = () => {

  return (
    <div className='links'>
      <Link to={"/crop"}><a>Crop Predictor</a></Link>
      <Link to={"/crop"}><a>Leaf Detector</a></Link>
      <Link to={"/crop"}><a>Community Section</a></Link>
    </div>
  )
}

export default Links