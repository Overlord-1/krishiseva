import React from "react";
import ChatInput from "./ChatInput";

const Chat = ({messageSent}) => {

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    messageSent(message);
    // Here, you would typically add the message to your chat state and send it to your backend
 };

  return (
    <div className="w-full bg-blue-400 h-screen">
      <div className=" h-screen w-full fixed top-[760px]">
        <ChatInput onSendMessage={handleSendMessage}  />
      </div>
    </div>
  );
};

export default Chat;
