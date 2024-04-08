import React, { useRef, useState } from "react";
import down from "../assets/down.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Splash from "../components/Splash";

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
  const [showSplash, setShowSplash] = useState(false);
  const loginButtonRef = useRef(null);
  const [splashStartPosition, setSplashStartPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:4000/api/${formData.email}/${formData.password}`
      );
      console.log(response.data.user.name); // You can handle the response as needed
      console.log(response.data.user.email);
      const email = response.data.user.email;
      const name = response.data.user.name;
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
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
      console.error("Error registering user:", error);
      setRegisterError(true);
      setMessage(error.response.data.fetch);
    }
  };
  return (
    <div className="main flex mx-auto items-center justify-between h-screen flex-col bg-gradient-to-b from-blue-400 to-white">
      <div className="flex mx-auto items-center justify-end md:justify-center h-screen flex-col">
        {/* <Tractor color='rgb(74 222 128)' size={70} />   //previous used logo*/}
        <h1 className="text-6xl mb-7 mainText font-bold uppercase">
          कृषि SEVA
        </h1>
        {registerError && (
          <p className="text-white bg-red-500 p-3 m-3 rounded-full">
            {message}
          </p>
        )}
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="bg-black text-white p-5 rounded-xl m-3"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border-green-500  text-white p-5 bg-black rounded-xl m-3"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-400 w-[150px] p-5 rounded-xl"
            ref={loginButtonRef}
          >
            Login
          </button>
          <div className="mt-4">
            Not our part yet ?
            <a href="/" className="ml-2 text-green-400">
              <Link to="/">Sign Up</Link>
            </a>
          </div>
        </form>
      </div>

      <img src={down} alt="" className="w-full md:hidden" />
      {/* This is chahts idea */}
      {showSplash && (
        <Splash
          onComplete={() => setShowSplash(false)}
          startPosition={splashStartPosition}
        />
      )}
    </div>
  );
};

export default Login;
