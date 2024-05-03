import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const Crop = () => {
  const handleSubmit = () => {
    console.log('Form submitted');
    // Add your form submission logic here
  };

  return (
    <div className='min-h-screen bg-kdark h-screen w-full'>
      <Navbar text={"Crop Predictor"} />

      <div className='w-full h-full flex'>
        <div className="leftside min-w-[50%] mt-10 pl-20">
          <input type="text" placeholder='Enter a place' className='bg-klight px-16 mr-3 p-2 rounded-full' />
          <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f]  text-kdark font-bold py-2 px-4 rounded ml-3'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Crop;

