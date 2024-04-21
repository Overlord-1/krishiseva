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
    <div>
      <h1 >Have a look at what the community is talking</h1>
    </div> 
  );
};

export default LeftBar;
