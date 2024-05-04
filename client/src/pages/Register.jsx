import React, { useState } from "react";
import axios from "axios";
import down from "../assets/down.png";
import { Link } from "react-router-dom";
import LightLogo from "/logos/krishiseva-high-resolution-logo-black.png";

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
    <div className="bg-[#0a210f] w-full h-screen flex flex-col lg:flex-row lg:items-center"> {/* Set background color */}
      <div className="leftSide w-full lg:w-[40%]">
        <img
          src={LightLogo}
          alt="krishiseva logo light mode"
          width={299}
          className="mx-auto" // Center the logo
        />
      </div>
      <div className="rightSide flex flex-col">
        <div className="font-light text-center mx-3 text-[#e1e289] text-[19px] lg:text-3xl">
          Increase your crop yield with our advisories and personalized features
        </div>
        <form
          className="flex flex-col justify-center items-center mt-24"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-[#D9D9D9] text-black p-5 rounded-xl m-3 lg:w-[800px]" // Style input fields
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#D9D9D9] text-black p-5 rounded-xl m-3 lg:w-[800px]" // Style input fields
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="text-black p-5 bg-[#D9D9D9] rounded-xl m-3 lg:w-[800px]" // Style input fields
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-[#99aa38] w-[150px] p-5 rounded-xl m-3 lg:w-[300px] lg:mt-5 text-[#0a210f] font-bold hover:bg-[#e1e289] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50" // Style submit button
          >
            Register
          </button>
          {registerError && (
            <div className="text-red-500 text-lg font-semibold">
              User already present please Login
            </div>
          )}
        </form>
        <div className="mt-14 mx-auto">
          <div href="/" className="ml-2 text-[#e1e289] opacity-70">
          <Link to="/login" 
      style={{
        color: '#e1e289', // Light grey
        textDecoration: 'none', // Remove underline
        fontWeight: 'bold', // Make text bold
        cursor: 'pointer', // Change cursor to pointer on hover
        padding: '0 30px', // Add padding for inline display
      }}
    >
      Have an account already?&nbsp;
      <span 
        style={{
          color: '#99aa38', // Darker green
          fontWeight: 'normal', // Reset font weight for this part
          textDecoration: 'underline', // Add underline
          marginRight: '0 50px 0 0', // Add space to the right of the span
        }}
      >
        Log in
      </span>
    </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;