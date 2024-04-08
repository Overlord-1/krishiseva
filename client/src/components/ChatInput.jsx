import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
 const [message, setMessage] = useState('');

 const handleChange = (e) => {
    setMessage(e.target.value);
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
 };

 return (
    <form onSubmit={handleSubmit} className="flex items-center p-4">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message here..."
        className="flex-grow px-4 py-2 text-black rounded-full bg-white border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        Send
      </button>
    </form>
 );
};

export default ChatInput;
