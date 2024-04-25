import Navbar from '@/components/Navbar/Navbar'
import React from 'react'


const Crop = () => {
  return (
    <div className='min-h-screen bg-kdark h-screen w-full'>
      <Navbar text={"Crop Predictor"} />

      <div className='w-full h-full flex'>

        <div className="leftside min-w-[50%] bg-black h-full ">
          <input type="text" placeholder='Enter a place' className='bg-klight px-5 p-2 rounded-full ' />

        </div>
        <div className="rightside min-w-[50%] bg-red-500 h-full ">
          <input type="text" placeholder='Enter a place' className='bg-klight px-5 p-2 rounded-full ' />

        </div>


      </div>






    </div>
  )
}

export default Crop