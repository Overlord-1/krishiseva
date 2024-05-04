import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios'; // Ensure axios is imported
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import QAComp from '@/components/QAComp';



const Crop = (props) => {
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setStarted(true);
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/ai/predict/${inputValue}`);
      console.log(response.data);
      setLoading(false);
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
          <input type="text" placeholder='Enter a place' className='bg-klight text-black px-16 mr-3 p-2 rounded-full' onChange={handleInputChange} />
          <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f]  text-kdark font-bold py-2 px-4 rounded-lg ml-3'>Search</button>


          {
            loading ? <SkeletonTheme baseColor="#0a210f" highlightColor="#e1e28945">
              <p>
                <Skeleton className='md:w-[500px] h-[300px] mt-10' />
              </p>
              <Skeleton className=' h-3 mt-10' />
            </SkeletonTheme> : null
          }
        </div>

        <div className="right-side w-full lg:w-1/2 lg:h-full flex flex-col items-center">
          <div className="text-2xl font-bold text-left">Results</div>

          {
            loading 
            ? 
            <QAComp text={"fkdjfkdjkf"} rank={1} disease={true} loading={true}/>
            :
            started 
            ?
            <QAComp text={"fkdjfkdjkf"} rank={1} disease={true} loading={false} />  
            :
            null
          }


        </div>
      </div>


    </div>
  );
};

export default Crop;
