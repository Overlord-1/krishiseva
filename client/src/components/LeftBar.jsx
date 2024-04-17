import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "/logos/krishiseva-high-resolution-logo-black.png";
import SiteButton from "./SiteButton";

const LeftBar = () => {
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
    <div className="leftBar items-center bg-white hidden lg:flex lg:w-[290px] lg:flex-col border-r-2 border-solid border-slate-400 ">
      <img src={logo} alt="" className="w-[156px]" />
      <div className="pb-7 border-b-2 border-solid border-slate-500 flex flex-col justify-center items-center">
        <div className="font-semibold text-[20px]">AI tools</div>
        <SiteButton text={"Crop Cycle"} width={257} height={56} />
        <SiteButton text={"Leaf Recong"} width={257} height={56} />
      </div>
      <div className="font-semibold text-[20px] mt-14"> 🔥 Top Questions</div>
      <div className="flex flex-col mt-4">
        {questions.map((question) => (
          
          <Link to={`/posts/${question._id}`} key={question._id} className="text-[#000000] text-[16px] font-semibold bg-[#D9D9D9] px-10 py-2
          m-3 rounded-md">
            {question.string}
          </Link>

        ))}

    </div>
  </div>
  );
};

export default LeftBar;
