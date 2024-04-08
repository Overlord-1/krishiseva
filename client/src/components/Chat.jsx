import React, { useEffect } from "react";
import ChatInput from "./ChatInput";

const Chat = ({messageSent,socket}) => {

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    messageSent(message);
    // Here, you would typically add the message to your chat state and send it to your backend
 };

 socket.on("recvMessage", (data) => {
    console.log("Message received:", data); 
  });

  return (
    <div className="w-full bg-blue-400 h-screen">
      <div className=" h-screen w-full fixed top-[760px]">
        <ChatInput onSendMessage={handleSendMessage}  />
      </div>
    </div>
  );
};

export default Chat;
