import Header from "@/components/Header";
import LeftBar from "@/components/LeftBar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
 const { postID } = useParams();
 const [questions, setQuestions] = useState([]);
 const [subQuestions, setSubQuestions] = useState([]);

 useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/forum/getAllElements",
        {}
      );
      setQuestions(
        response.data.element.filter((element) => element._id === postID)
      );
    };
    const getSubQuestions = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/forum/getAllElements",
        {
          parentElement: postID,
        }
      );
      setSubQuestions(response.data.element);
    };
    getQuestions();
    getSubQuestions();
 }, [postID]);

 return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <LeftBar />
        <div className="bg-black w-full overflow-hidden flex-grow p-8">
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-800 w-full overflow-hidden flex flex-col text-white p-4 rounded-lg shadow-lg mb-4">
              <div className="text-2xl font-bold mb-2"># {question.string}</div>
              <div className="flex justify-between items-center mb-2">
                <div>Likes: {question.likes}</div>
                <div>Dislikes: {question.dislikes}</div>
              </div>
              <div className="bg-gray-700 w-full overflow-hidden p-4 rounded-lg">
                {subQuestions.map((subQuestion, subIndex) => (
                 <div key={subIndex} className="text-xl text-white mb-2">
                    # {subQuestion.string}
                 </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
 );
};

export default PostPage;
