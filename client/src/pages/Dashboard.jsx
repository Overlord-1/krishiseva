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
import DashCard from "@/components/DashCard";

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
    <div className="bg-[#0a210f]">
      <Navbar text={"कृषिseva"} />
      <div className="flex gap-[70px] w-full mx-auto items-center h-screen max-w-[90%]">
        <DashCard title= {"Crop Insights"} content = {" Explore the optimal crops for your region with our Crop Insights feature. Simply input your location to discover suitable crops, along with detailed information on their benefits, growth patterns, and additional cultivation regions. Make informed planting decisions effortlessly. "} />
        <DashCard title= {"Leaf Care Diagnostics"} content = {"Empower your crop management with LeafCare Diagnostics. Upload images of your plant leaves, and our advanced system will swiftly detect any diseases present. Receive accurate diagnoses, detailed disease descriptions, and recommended preventive measures to safeguard your crops. "} />
        <DashCard title= {"Farmers Forum"} content = {"Join our Farmers Forum to connect, learn, and thrive alongside fellow agriculturists. Share insights, ask questions, and exchange valuable experiences in a supportive community environment. Enhance your farming journey with shared knowledge and expertise."} />
        
      </div>
    </div>
  );
};

export default Dashboard;
