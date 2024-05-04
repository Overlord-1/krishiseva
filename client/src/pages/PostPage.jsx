import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Heart from "react-animated-heart";

const PostPage = () => {
  const [text, setText] = useState("");
  const { postID } = useParams();
  const [questions, setQuestions] = useState([]);
  const [subQuestions, setSubQuestions] = useState([]);
  const [liked, setLiked] = useState(false);
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

  const handlePostButton = async (ch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/forum/createElement",
        {
          user: localStorage.getItem("id"),
          string: text,
          parentElement: postID,
        }
      );
      setText("");

      const updatedSubQuestions = [...subQuestions, response.data.element];

      setSubQuestions(updatedSubQuestions);
    } catch (error) {
      console.error("Error occurred while posting the question:", error);
    }
  };

  const handleLikeButton = async (ch) => {
    setLiked(!liked);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/forum/editElement",
        {
          id: postID,
          incOrDec: liked ? "dec" : "inc",
          toPerform: "like",
        }
      );

      const updatedQuestions = questions.map((question) => {
        if (question._id === postID) {
          return { ...question, likes: response.data.element.likes };
        } else {
          return question;
        }
      });

      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    }
  };
  console.log("Sub  = ", subQuestions);
  return (
    <div className="flex flex-col min-h-screen bg-kdark ">
      <div className="flex flex-grow max-w-[1240px] mx-auto">
        <div className=" w-full overflow-hidden flex-grow">
          <div className="bg-kdark shadow-xl w-full text-white text-[40px] lg:px-20 py-7 font-bold mx-auto px-3">
            {questions[0]?.string}
          </div>
          <div className="lg:ml-20 mt-10 flex items-center mx-auto px-3">
            <div className="font-bold lg:mr-10 flex items-center justify-center ">
              <div>Like this question ?Add a like to improve its ranking</div>
              <div className="ml-10 -mr-6">{questions[0]?.likes}</div>
              <Heart isClick={liked} onClick={() => handleLikeButton()} />
            </div>
          </div>

          <div className="grid max-w-[826px] gap-2 mx-auto px-3 lg:ml-20 mt-4">
            <Textarea
              placeholder="Add a comment to enter the discussion"
              className="bg-klight text-kdark"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => handlePostButton()} className="bg-[#14591d]">
              Post
            </Button>
          </div>
          {subQuestions.map((subQuestion, subIndex) => (
            <div className="w-[826px] border-2 border-klight border-opacity-50 rounded-lg p-4 mt-5 mx-auto text-klight">
              {/* <div className="font-bold mb-2">What is the capital of France?</div> */}
              <div>{subQuestion.string}</div>
              {/* <div className="mt-5 rounded-lg p-3 w-[20%] flex h-10 ">
                {subQuestion.likes}
                <Heart
                  styles={{
                    marginTop: "-38px",
                  }}
                  isClick={liked}
                  onClick={() => console.log("clicked")}
                />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
