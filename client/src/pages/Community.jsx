import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar/Navbar';

const Community = () => {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.post("http://localhost:4000/api/forum/getAllElements", {});
      setQuestions(response.data.element);
    };
    getQuestions();
  }, []);

  const handlePostButton = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/forum/createElement",
        {
          user: localStorage.getItem("id"),
          string: text
        }
      );
      // Update the state with the new question
      setQuestions([...questions, response.data.element]);
      // Clear the textarea
      setText("");
    } catch (error) {
      console.error("Error occurred while posting the question:", error);
    }
  };

  return (
    <div className="bg-[#0a210f] min-h-screen">
      <Navbar text={"Welcome to the Community"} />
      <div className="text-klight text-center text-2xl mb-5">Some top questions of the day!!</div>

      <div className="lg:w-[500px]  rounded-lg p-4 mx-auto  text-klight">
        {questions.map((question) => (
          <Link to={`/posts/${question._id}`} className="text-blue-500 hover:text-blue-700 block">
            <div key={question._id} className="mb-4">
              <h3 className="font-semibold text-white p-3 bg-black rounded-xl">{question.string}</h3>
              <p className="text-gray-300">{question.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:w-[500px] border-klight rounded-lg p-4 mx-auto text-klight gap-2">
        <Textarea
          placeholder="Didn't see your question? Add it here!"
          className="bg-klight text-kdark"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handlePostButton} className="bg-[#14591d] hover:bg-[#0a210f]">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Community;
