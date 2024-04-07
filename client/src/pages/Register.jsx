import React, { useState } from "react";
import axios from "axios";
import down from "../assets/down.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/", formData);
      console.log(response.data); // You can handle the response as needed
    } catch (error) {
      console.error("Error registering user:", error.response?.data.message);
      setRegisterError(true);
    }
  };

  return (
    <div className="main flex mx-auto items-center justify-between h-screen flex-col bg-gradient-to-b from-blue-400 to-white">
      <div className="flex mx-auto items-center justify-end md:justify-center h-screen flex-col">
        <h1 className="text-6xl mb-7 mainText font-bold uppercase">कृषि SEVA</h1>
        {registerError && (
          <p className="text-white bg-red-500 p-3 m-3 rounded-full">
            User already present please Login
          </p>
        )}
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-black text-white p-5 rounded-xl m-3"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-black text-white p-5 rounded-xl m-3"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border-green-500 p-5 bg-black text-white rounded-xl m-3"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-400 w-[150px] p-5 rounded-xl"
          >
            Register
          </button>
          <div className="mt-4">
            Have an account already ?
            <Link to="/login" className="ml-2 text-green-400">
              Login
            </Link>
          </div>

        </form>
      </div>

      <img src={down} alt="" className="w-full md:hidden" />
    </div>
  );
};

export default Register;