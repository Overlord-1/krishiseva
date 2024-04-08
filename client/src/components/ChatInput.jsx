import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage }) => {
 const [message, setMessage] = useState('');

 const handleChange = (e) => {
    setMessage(e.target.value);
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input field after sending
    }
 };

 return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message here..."
        className="chat-input-field text-black"
      />
      <button type="submit" className="chat-input-button">Send</button>
    </form>
 );
};

export default ChatInput;
