import React from "react";

const ChatComp = ({ messages }) => {
  return (
    <div className="chat-messages p-4 overflow-y-auto h-full max-h-[660px] mb-[1000px] ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 w-full flex ${
            message.sender === localStorage.getItem('email') ? "flex-row justify-end" : "flex-row-reverse justify-end"
          }`}
        >
          <div
            className={`rounded-2xl font-bold p-3 ${
              message.sender === localStorage.getItem('email')
                ? "bg-[#fcdc5c] text-black"
                : "bg-[#6d9895] text-black"
            }`}
          >
            <p>{message.text}</p>
          </div>
          <div
            className={`${message.sender===localStorage.getItem('email')?"bg-[#6d9895]":"bg-[#fcdc5c]"}  w-10 h-10 rounded-[50%] text-black p-3 flex justify-center font-bold uppercase`}
          >
            {
              message.sender === localStorage.getItem('email')
                ? localStorage.getItem("name")[0]
                : message.sender[0]
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatComp;
