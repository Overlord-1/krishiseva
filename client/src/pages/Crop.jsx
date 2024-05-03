import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios'; // Ensure axios is imported
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const Crop = (props) => {
  const [inputValue, setInputValue] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    try {
      // console.log(e)
      console.log(inputValue)
      // const url = `http://localhost:4000/api/ai/predict/${encodeURIComponent(inputValue)}`;
      const response = await axios.get(`http://localhost:4000/api/ai/predict/${inputValue}`);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the state with the input value
  };

  return (
    <div className='min-h-screen bg-kdark h-screen w-full'>
      <Navbar text={"Crop Predictor"} />

      <div className='w-full flex'>
        <div className="leftside min-w-[50%] mt-10 pl-20">
          <input type="text" placeholder='Enter a place' className='bg-klight text-kdark px-16 mr-3 p-2 rounded-full' onChange={handleInputChange} />
          <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f]  text-kdark font-bold py-2 px-4 rounded ml-3'>Submit</button>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton className='h-10' />
            </p>
          </SkeletonTheme>
        </div>


      </div>


    </div>
  );
};

export default Crop;
