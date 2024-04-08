import React, { useEffect, useMemo, useState } from "react";
import "../Dashboard.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import io from "socket.io-client";

const Dashboard = () => {
  // const socket = io("http://localhost:4000");
  // const socket = io("http://localhost:3000");
  // socket.on("connection", () => {
  //   console.log("Connected to server");
  // });

  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket]);

  // socket.emit("message", {text:"putTextHere", Img:"putImgHere", email:"formLocal"})
  return (
    <>
      <Header />
      <Navbar />
    </>
  );
};

export default Dashboard;
