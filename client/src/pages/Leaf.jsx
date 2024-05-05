import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import plusicon from "/plus.png";
import QAComp from "@/components/QAComp";
import axios from "axios";
import { ReactTyped } from "react-typed";

const Leaf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [renderIndex, setRenderIndex] = useState(0);

  useEffect(() => {
    if (results.length !== 0) {
      
      const timeouts = [
        setTimeout(() => setRenderIndex(1), 1500), // Render QAComp 1 after 1 second
        setTimeout(() => setRenderIndex(2), 7000), // Render QAComp 2 after 2 seconds
        setTimeout(() => setRenderIndex(3), 10000), // Render QAComp 3 after 3 seconds
      ];

      return () => timeouts.forEach(clearTimeout);
    }
  }, [results]);


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log('submit')
    if (!selectedFile) {
      console.error('No file selected');
      setError(true);
      setLoading(false);
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
      console.log(response.data);
      setResults(response.data);
      setLoading(false);
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
    <div className="bg-[#0a210f] min-h-screen">
      <Navbar text={"Leaf Care Diagnostics"} />
      <div className="main-content w-full min-h-screen lg:overflow-hidden flex flex-col md:flex-row">
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
                {/* <div className="text-[#0a210f] text-3xl text-center">Image Uploaded</div> */}
              </div>
            ) : (
              <img src={plusicon} width="110vw" alt="Plus Icon" />
            )}
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-klight mt-5 p-5 rounded-lg text-kdark font-bold ">
            Start Diagnosis
          </button>
          {
            error && <div className="text-red-500 mt-3">Please select an image to upload </div>
          }

          {success && <div className="mt-10 text-kdark font-bold">
            <ReactTyped className="bg-klight p-5 mt-10 rounded-full" strings={[results.isHealthy ? `Congratulations your ${results?.crop} crop is very healthy ` : `Oops your crop has some disease check out the results.`]} typeSpeed={10} />
            {/* {results?.crop} */}
          </div>}
        </div>
        <div className="right-side w-full lg:w-1/2 lg:h-full flex flex-col items-center">
          <div className="text-2xl font-bold text-left">Results</div>
          <div className="results ml-5 bg-transparent lg:w-[800px] mt-10 flex flex-col gap-5">
            {results.length !== 0 ? (
              <div className="flex flex-col gap-5">
                {renderIndex >= 1 && (
                  <QAComp text={results.ans1} rank={0} disease={results.isHealthy} />
                )}
                {renderIndex >= 2 && (
                  <QAComp text={results.ans2} rank={1} disease={results.isHealthy} />
                )}
                {renderIndex >= 3 && (
                  <QAComp text={results.ans3} rank={2} disease={results.isHealthy} />
                )}
              </div>
            ) : (
              <div className="text-center text-klight">
                Please upload image to get the results
              </div>
            )}
            {
              loading &&
              <div>
                <h2 className="mb-2 text-lg font-semibold text-klight dark:text-white">Converting your image:</h2>
                <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    Upload your file to our website
                  </li>

                  <li className="flex items-center">
                    <div role="status">
                      <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Preparing your file
                  </li>
                </ul>
              </div>

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaf;



