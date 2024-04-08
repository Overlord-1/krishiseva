import React, { useEffect, useMemo, useState } from "react";
import "../Dashboard.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import io from "socket.io-client";
import { motion } from "framer-motion";
import chat from "../assets/chat.svg";
import cropcycle from "../assets/cropcycle.svg";
import leafrecog from "../assets/leafrecog.svg";
import Chat from "../components/Chat";

const Dashboard = () => {

  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket]);

  const handleMessageSent = (message) => {
    const jsonMsg = { text: message, Img: null, email: localStorage.getItem("email") }
    console.log(jsonMsg);
    socket.emit("message",jsonMsg);
  }

  const [pageState, setPageState] = useState(0);
  const handleFooterClick = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "cropcycle") {
      setPageState(0);
    } else if (e.target.alt === "leafrecog") {
      setPageState(1);
    } else if (e.target.alt === "chat") {
      setPageState(2);
    }
  };

  // socket.emit("message", {text:"putTextHere", Img:"putImgHere", email:"formLocal"})




  return (
    <div className="">
      <Header />
      {/* <Navbar/> */}
      {
        pageState === 0 ? (
          <div className="cropcycle">
            <h1>Crop Cycle</h1>
          </div>
        ) : pageState === 1 ? (
          <div className="leafrecog">
            <h1>Leaf Recognition</h1>
          </div>
        ) : (
          <Chat messageSent={handleMessageSent} />
        )
      }
      <div className="footer w-full bg-[#1e1f26] text-white flex px-5 justify-between fixed bottom-0  z-20 rounded-t-2xl">
          <motion.div whileTap={{ scale: 0.4 }} className={`${pageState === 0 ? "bg-[#6cff7379]" : "bg-[#1e1f26]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={cropcycle}
              alt="cropcycle"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
          <motion.div whileTap={{ scale: 0.5 }} className={`${pageState === 1 ? "bg-[#feaeae]" : "bg-[#959fee]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={leafrecog}
              alt="leafrecog"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
          <motion.div whileTap={{ scale: 0.5 }} className={`${pageState === 2 ? "bg-[#feaeae]" : "bg-[#959fee]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={chat}
              alt="chat"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
        </div>
    </div>
  );
};

export default Dashboard;
