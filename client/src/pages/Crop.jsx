import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios'; // Ensure axios is imported
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import QAComp from '@/components/QAComp';
import { Link } from 'react-router-dom';

const Crop = (props) => {
  const [inputValue, setInputValue] = useState();
  const [pvalue, setPvalue] = useState();
  const [nvalue, setNvalue] = useState();
  const [kvalue, setKvalue] = useState();
  const [phvalue, setPhvalue] = useState();
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [predictedOutput, setPredictedOutput] = useState();
  const [ans1, setAns1] = useState();
  const [ans2, setAns2] = useState();

  const handleSubmit = async (e) => {
    setLoading(true);
    setStarted(true);
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/ai/predict/${nvalue}/${pvalue}/${kvalue}/${phvalue}/${inputValue}`);
      console.log(response.data[0].predicted_crop[0]);
      setPredictedOutput(response.data[0].predicted_crop[0]);
      setAns1(response.data[1]);
      setAns2(response.data[2]);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the state with the input value
  };

  return (
    <div className='min-h-screen bg-kdark h-screen w-full overflow-hidden'>
      <Navbar text={"Crop Predictor"} />

      <div className='w-full flex'>
        <div className="leftside min-w-[50%] max-w-[50%] mt-10 pl-20">

          <div className='flex flex-col gap-10'>
            <span className='text-klight'>Enter the name of the place your looking</span>
            <div>
              <input type="text" placeholder='Enter a place' className='bg-klight text-black px-16 mr-3 p-2 rounded-full' onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <span className='text-klight'>Enter the N P K and Ph values of the location</span>
            <div className='flex flex-col max-w-[300px] gap-10'>
              <input type="text" placeholder='Enter N value' className='bg-klight text-kdark mr-3 p-3 rounded-full' onChange={(e) => setNvalue(e.target.value)} />
              <input type="text" placeholder='Enter P value' className='bg-klight text-kdark mr-3 p-3 rounded-full' onChange={(e) => setPvalue(e.target.value)} />
              <input type="text" placeholder='Enter K value' className='bg-klight text-kdark mr-3 p-3 rounded-full' onChange={(e) => setKvalue(e.target.value)} />
              <input type="text" placeholder='Enter Ph value' className='bg-klight text-kdark mr-3 p-3 rounded-full' onChange={(e) => setPhvalue(e.target.value)} />
            </div>

            <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f] max-w-[400px] text-kdark font-bold py-2 px-4 rounded-lg ml-3'>Search</button>
            <div>

            </div>

            {/* <input type="text" placeholder='Enter a place' className='bg-klight text-black px-16 mr-3 p-2 rounded-full' onChange={handleInputChange} />
            <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f]  text-kdark font-bold py-2 px-4 rounded-lg ml-3'>Search</button>

            <input type="text" placeholder='Enter a place' className='bg-klight text-black px-16 mr-3 p-2 rounded-full' onChange={handleInputChange} />
            <button onClick={handleSubmit} className='bg-klight hover:text-[#0a210f]  text-kdark font-bold py-2 px-4 rounded-lg ml-3'>Search</button> */}


          </div>




        </div>

        <div className="right-side w-full lg:h-full flex flex-col justify-center items-center">
          <div className="text-2xl font-bold text-left">Results</div>
          <div className='flex flex-col items-center mt-5  max-w-[90%]'>
            {
              loading ?
                <div>
                  <SkeletonTheme baseColor="#0a210f" highlightColor="#e1e28945">
                    <Skeleton width={900} height={300} />
                  </SkeletonTheme>
                </div>
                :
                started
                  ?
                  <div className='flex gap-10 items-center mb-10'>
                    <img className=' rounded-lg' src={`../crop_pics/${predictedOutput}.jpeg`} />
                    <span className='text-3xl text-center font-bold text-klight'>Best suited crop is {predictedOutput}</span>
                  </div>
                  :
                  null
            }
            {
              loading
                ?
                <>
                  <QAComp text={"fkdjfkdjkf"} rank={1} disease={true} loading={true} />
                  <QAComp text={"fkdjfkdjkf"} rank={1} disease={true} loading={true} />
                </>
                :
                started
                  ?
                  <>

                    <QAComp text={ans1} rank={0} disease={"crop"} loading={false} />
                    <QAComp text={ans2} rank={1} disease={"crop"} loading={false} />
                  </>
                  :
                  null
            }
          </div> {/* Add this div wrapper */}
        </div>
      </div>

      <span className='text-center ml-9 '> *Not sure about these values click
        <Link className='mx-2 text-klight' to="https://matihaat.com/product/soil-test-npk-ph-ec/?srsltid=AfmBOoqlFinxBcKBWP04j03T8io4Po8WlVK1WWI7hclBU9c1y9AO8i9TKZQ" target="_blank" rel="noopener noreferrer">here</Link>
        to know more</span>
    </div>
  );
};

export default Crop;
