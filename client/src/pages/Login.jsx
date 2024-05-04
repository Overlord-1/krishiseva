import React, { useRef, useState } from "react";
import down from "../assets/down.png";
import { Link } from "react-router-dom";
import axios from "axios";

import {motion} from "framer-motion";
import Splash from "../components/Splash";
import LightLogo from "/logos/krishiseva-high-resolution-logo-black.png";

// const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/auth/login", {
//         teamCode,
//         password,
//       });

//       const token = response.data.data.token;
//       console.log("Login Successful! Token:", token);
//     } catch (error) {
//       console.error("Login Failed:", error.response?.data);
//     }
//   };

const Login = () => {
  const [registerError, setRegisterError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const loginButtonRef = useRef(null);
  const [splashStartPosition, setSplashStartPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/login/${formData.email}/${formData.password}`
      );
      // console.log(response.data.user);
      console.log(response.data.user.name); // You can handle the response as needed
      console.log(response.data.user.email);
      const email = response.data.user.email;
      const name = response.data.user.name;
      const id = response.data.user._id;
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      const buttonRect = loginButtonRef.current.getBoundingClientRect();
      const startPosition = {
        top: buttonRect.top,
        left: buttonRect.left,
        width: buttonRect.width,
        height: buttonRect.height,
      };
      setShowSplash(true);
      setSplashStartPosition(startPosition);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error);
      setRegisterError(true);
      setMessage(error.response.data.fetch);
    }
  };
  return (
    <div className="bg-[#0a210f] w-full h-screen flex flex-col lg:flex-row lg:items-center">
      <div className="leftSide w-full lg:w-[40%]">
        <img
          src={LightLogo}
          alt="krishiseva logo light mode"
          width={299}
          className="mx-auto"
        />
      </div>
      <div className="rightSide flex flex-col">
        <div  className="font-light text-center mx-3 text-[#e1e289] text-[19px] lg:text-3xl">
        Increase your crop yield with our advisories and personalized features
        </div>
        <form
          className="flex flex-col justify-center items-center mt-24"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email" 
            className="bg-[#D9D9D9] text-black p-5 rounded-xl m-3b lg:w-[800px]"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className=" text-black p-5 bg-[#D9D9D9] rounded-xl m-3 lg:w-[800px]"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-[#99aa38] w-[150px] p-5 rounded-xl m-3 lg:w-[300px] lg:mt-5 text-[#0a210f] font-bold hover:bg-[#e1e289] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50"
            ref={loginButtonRef}
          >
            {loading ? "Logging in..." : "Get Started"}
          </button>
            {registerError && ( <div className="text-red-500 text-lg font-semibold">{message}</div>)}
          </form>
          <div className="mt-14 mx-auto">         
  <div className="ml-2 text-[#e1e289] opacity-70">
    <Link to="/" 
      style={{
        color: '#e1e289', // Light grey
        textDecoration: 'none', // Remove underline
        fontWeight: 'bold', // Make text bold
        cursor: 'pointer', // Change cursor to pointer on hover
        padding: '0 30px', // Add padding for inline display
      }}
    >
      Not our part yet? &nbsp;
      <span 
        style={{
          color: '#99aa38', // Darker green
          fontWeight: 'normal', // Reset font weight for this part
          textDecoration: 'underline', // Add underline
          marginRight: '0 50px 0 0', // Add space to the right of the span
        }}
      >
        Join now
      </span>
    </Link>
  </div>
  {showSplash && (
    <Splash
      onComplete={() => setShowSplash(false)}
      startPosition={splashStartPosition}
    />
  )}
</div>
        </div>
      </div>
    
  );
};

export default Login;