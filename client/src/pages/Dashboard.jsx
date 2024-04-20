import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import chat from "../assets/chat.svg";
import cropcycle from "../assets/cropcycle.svg";
import leafrecog from "../assets/leafrecog.svg";
import Chat from "../components/Chat";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import axios from "axios";
import LeftBar from "@/components/LeftBar";
import Navbar from "@/components/Navbar/Navbar";

const Dashboard = () => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
  const time = format(new Date(), "hh:mm aaa");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket]);
  
  const handleMessageSent = (message) => {
    const jsonMsg = {
      text: message,
      Img: null,
      email: localStorage.getItem("email"),
      time: time,
    };
    console.log(jsonMsg);
    socket.emit("message", jsonMsg);
  };

  const [pageState, setPageState] = useState(2);
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
      <Navbar text={"KrishiSeva"} />
      <div className="text-5xl w-full flex justify-center h-screen items-center overflow-hidden">
        Welcome to the Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
