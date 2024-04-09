import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatComp from "./ChatComp";
import axios from "axios";

const Chat = ({messageSent,socket}) => {
  const [messages, setMessages] = useState([]);
  //this loads all the messsages from the db
  useEffect(() => {
    axios.get("http://localhost:4000/api/messages").then((response) => {
      console.log(response.data[0].text);
      response.data.map((parameter)=>{
        setMessages(prevMessages=>[...prevMessages,{text:parameter.text,sender:parameter.email}])
      })
    });    
  }, []);

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    setMessages(prevMessages => [...prevMessages, {
      text: message,
      sender: localStorage.getItem("email"),
    }]);
    messageSent(message);
  };

  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log("Message received:", data); 
      setMessages(prevMessages => [...prevMessages, {
        text: data.text,
        sender: data.email,
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