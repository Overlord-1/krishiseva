import LeftBar from "@/components/LeftBar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion'; 
import chat from "../assets/chat.svg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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

  // #TODO implement handleLikeButton
  const handleLikeButton = () => {
    console.log("Like button clicked");
    // const response = axios.post(
    //   "http://localhost:4000/api/forum/likeElement",
    //   {
    //     elementID: postID,
    //   }
    // );
    // console.log(response);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <LeftBar />
        <div className=" w-full overflow-hidden flex-grow">
          <div className="bg-black rounded-sm shadow-xl w-full text-white text-[40px] lg:px-20 py-7 font-bold mx-auto px-3">
            {questions[0]?.string}
          </div>
          <div>
            <div className="-mt-10 lg:text-[30px] text-white text-right">
              <span className="text-[#FFFFFF] lg:mr-4 mr-2">
                {questions[0]?.likes}
              </span>
              people like this
            </div>
          </div>
          <div className="lg:ml-20 mt-10 flex items-center mx-auto px-3">
            <div className="font-bold lg:mr-10 ">
              Like this question ?Add a like to improve its ranking
            </div>
            <motion.button
              className="bg-black rounded-full w-10 h-10 text-lg mr-5"
              onClick={() => handleLikeButton()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              👍
            </motion.button>
            <motion.button
              className="bg-black rounded-full w-10 h-10 text-lg"
              onClick={() => handleLikeButton()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              👎
            </motion.button>
          </div>

          <div className="grid max-w-[826px] gap-2 mx-auto px-3 lg:ml-20 mt-4">
            <Textarea
              placeholder="Add a comment to enter the discussion"
              className="bg-[#D9D9D9] text-black"
            />
            <Button>Post</Button>
          </div>

          <div className="bg-gray-800 w-full overflow-hidden flex flex-col text-white p-4 rounded-lg shadow-lg mb-4 mt-10">
            <div className="text-2xl font-bold mb-2">Sub Questions</div>
            <div className="flex justify-between items-center mb-2">
              <div>Likes: 0</div>
              <div>Dislikes: 0</div>
            </div>
            <div className="bg-gray-700 w-full overflow-hidden p-4 rounded-lg">
              {subQuestions.map((subQuestion, subIndex) => (
                <div key={subIndex} className="text-xl text-white mb-2">
                  {subQuestion.string}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-sm text-white rounded overflow-hidden shadow-lg m-4 transition-all duration-700 ease-in-out bg-black hover:bg-white hover:text-black">
            <img className="w-10 text-white" src={chat} alt="User avatar" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Name</div>
              <p className=" text-base ">Contenet</p>
            </div>
          </div>

          {/* {questions.map((question, index) => (
            <div key={index} className="bg-gray-800 w-full overflow-hidden flex flex-col text-white p-4 rounded-lg shadow-lg mb-4">
              <div className="text-2xl font-bold mb-2"> {question.string}</div>
              <div className="flex justify-between items-center mb-2">
                <div>Likes: {question.likes}</div>
                <div>Dislikes: {question.dislikes}</div>
              </div>
              <div className="bg-gray-700 w-full overflow-hidden p-4 rounded-lg">
                {subQuestions.map((subQuestion, subIndex) => (
                 <div key={subIndex} className="text-xl text-white mb-2">
                     {subQuestion.string}
                 </div>
                ))}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
