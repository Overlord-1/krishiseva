import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import plusicon from "/plus.png";
import QAComp from "@/components/QAComp";

const Leaf = () => {
 const [selectedFile, setSelectedFile] = React.useState(null);

 const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
 }

 return (
    <div className="bg-[#0a210f] h-screen">
      <Navbar text={"Leaf Disease Detector"} />
      <div className="main-content w-full lg:overflow-hidden flex flex-col md:flex-row">
        <div className="leftside w-full lg:max-h-screen lg:w-1/2 relative flex flex-col items-center">
          <div className="text-2xl font-bold text-center">Upload Image</div>
          <div className="imageupload ml-5 bg-transparent w-full md:w-[500px] h-[300px] mt-10 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full md:w-[500px] h-[300px] absolute hover:cursor-pointer bg-[#ffffff77] rounded-lg border-2 border-gray-300"
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
