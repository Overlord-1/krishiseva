import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LeftBar = () => {
    const [questions,setQuestions] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
            const response = await axios.post("http://localhost:4000/api/forum/getAllElements",{});
            console.log(response.data.element[0].string);
            setQuestions(response.data.element);
        }
        getQuestions();
    }, []);


  return (
    <div className="leftBar h-screen bg-white hidden lg:flex lg:w-[300px] lg:flex-col border-r-2 border-solid border-slate-400 ">
    <div className="border-b-2 border-solid border-slate-400 ">
      <button className="bg-black w-[80%] p-5 rounded-xl m-3 text-white hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50">
        ✔ Crop Cycle
      </button>
      <button className="bg-black w-[80%] p-5 rounded-xl m-3 mt-3 text-white hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50">
        🍀 Leaf Recognition
      </button>
    </div>
    <div className="topquestoins h-screen bg-black">
      <div className="text-2xl bg-black p-3 text-white font-bold border-b-2 border-solid border-slate-400 ">
        🔥 Top Questions
      </div>
      <div>
        {questions.map((question,index) => (
          <div key={index} className="p-3 bg-black text-white border-b-2 border-solid border-slate-400 hover:bg-slate-700 hover:cursor-pointer">
            {question.string}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default LeftBar