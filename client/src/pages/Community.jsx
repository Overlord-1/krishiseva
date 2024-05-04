import LeftBar from '@/components/LeftBar'
import Navbar from '@/components/Navbar/Navbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Community = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/forum/getAllElements",
        {}
      );
      console.log(response.data.element[0]);
      setQuestions(response.data.element);
    };
    getQuestions();
  }, []);
  return (
    <div className="bg-[#0a210f] h-screen">
  <Navbar text={"Welcome to the Community"} />

  <div className="lg:w-[500px] border-2 border-klight rounded-lg p-4 mx-auto text-klight">
    {questions.map((question) => (
      <div key={question._id} className="mb-4">
        <Link to={`/posts/${question._id}`} className="text-blue-500 hover:text-blue-700">
          <h3 className="font-bold text-white">{question.string}</h3>
        </Link>
        <p className="text-gray-300">{question.description}</p>
      </div>
    ))}
  </div>
</div>
  )
}

export default Community