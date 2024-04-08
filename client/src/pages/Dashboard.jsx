import React, { useState } from "react";
import "../Dashboard.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import io from "socket.io-client";

const Dashboard = () => {
  // const socket = io("http://localhost:3000");
  // socket.on("connection", () => {
  //   console.log("Connected to server");
  // });

  const socket = useMemo(() => io("http://localhost:3000"), []);

  socket.on("connection", () => {
    console.log("Connected to server");
  });

  return (
    <>
      <Header />
      <Navbar />
    </>
  );
};

export default Dashboard;
