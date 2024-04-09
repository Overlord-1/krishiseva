import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatComp from "./ChatComp";
import axios from "axios";

const Chat = ({messageSent,socket,time}) => {
  const [messages, setMessages] = useState([]);
  //this loads all the messsages from the db
  useEffect(() => {
    axios.get("http://localhost:4000/api/messages").then((response) => {
      response.data.map((parameter)=>{
        setMessages(prevMessages=>[...prevMessages,{text:parameter.text,sender:parameter.email,time:parameter.time}])
      })
    });    
  }, []);

//this function handles the messages sent by the user logged in 
  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    setMessages(prevMessages => [...prevMessages, {
      text: message,
      sender: localStorage.getItem("email"),
      time: time,
    }]);
    messageSent(message);
  };

//this function handles the messages sent by the OTHER user by socket emitting 

  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log("Message received:", data); 
      setMessages(prevMessages => [...prevMessages, {
        text: data.text,
        sender: data.email,
        time: data.time,
      }]);
    };

    socket.on("recvMessage", handleNewMessage);

    // Clean up the effect
    return () => socket.off("recvMessage", handleNewMessage);
  }, [socket]);

  return (
    <div className="w-full bg-blue-400 h-screen">
        <ChatComp messages={messages} />
      <div className=" h-screen w-full fixed top-[760px]">
        <ChatInput onSendMessage={handleSendMessage}  />
      </div>
    </div>
  );
};

export default Chat;