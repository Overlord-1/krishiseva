import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import plusicon from "/plus.png";
import QAComp from "@/components/QAComp";
import axios from "axios";
import { set } from "date-fns";

const Leaf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [results, setResults] = useState([]);
  const handleSubmit = async (e) => {
    // console.log('submit')
    e.preventDefault()
    console.log('submit')
    if (!selectedFile) {
      console.error('No file selected');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('ai', selectedFile);

      const response = await axios.post(`http://localhost:4000/api/ai/recognize`, formData);
      console.log('Image uploaded successfully:', response.data);
      setSuccess(true);
      console.log(response.data.predicted_disease);
      setResults(response.data.predicted_disease);
    }
    catch (error) {
      console.log('Error uploading image:');
      console.log(error);
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div className="bg-[#0a210f] h-screen">
      <Navbar text={"Leaf Disease Detector"} />
      <div className="main-content w-full lg:overflow-hidden flex flex-col md:flex-row">
        <div className="leftside w-full lg:max-h-screen lg:w-1/2 relative flex flex-col items-center">
          <div className="text-2xl font-bold text-center">Upload Image</div>
          <div className=" border-klight border-2 rounded-lg  imageupload ml-5 bg-transparent w-full md:w-[500px] h-[300px] mt-10 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-ful opacity-0 md:w-[500px] h-[300px] absolute hover:cursor-pointer bg-[#ffffff77] rounded-lg border-2 border-gray-300"
            />
            {selectedFile ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                  className="w-full md:w-[500px] h-[300px] object-cover rounded-lg"
                />
                <div className="text-[#0a210f] text-3xl text-center">Image Uploaded</div>
              </div>
            ) : (
              <img src={plusicon} width="110vw" alt="Plus Icon" />
            )}
          </div>
          {/* <p>IMgae uplaided press button </p> */}
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-klight mt-5 p-5 rounded-lg text-kdark font-bold ">
            Start Diagnosis
          </button>
          {
            error && <div className="text-red-500 mt-3">Please select an image to upload </div>
          }
          {success && <div className="text-green-500 mt-3">{results.indexOf("healthy")!==-1?"Congratulations your leaf is healthy":"sorry leaf has disease" }</div>}
        </div>
        <div className="right-side w-full lg:w-1/2 lg:h-full flex flex-col items-center">
          <div className="text-2xl font-bold text-left">Results</div>
          <div className="results ml-5 bg-transparent md:w-[500px] mt-10 flex flex-col gap-5">

            <QAComp />
            <QAComp />
            <QAComp />
            <QAComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaf;
