import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatComp from "./ChatComp";

const Chat = ({messageSent,socket}) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    setMessages(prevMessages => [...prevMessages, {
      text: message,
      sender: "me",
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