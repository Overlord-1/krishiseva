import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DashCard = ({title,content,route}) => {
  const navigate = useNavigate();
 return (
    <motion.div
      className="bg-[#e1e289] text-[#0a210f] p-6 rounded-lg shadow-lg h-[500px] flex flex-col justify-between -mt-28"
      initial={{ x: -100, opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      transition={{ duration: 0.5 }}
      staggerChildren={1}
    >
      <h2 className="text-4xl font-bold mb-4 text-center">{title}</h2>
      <motion.p
      initial={{ x: 100, opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      transition={{ duration: 0.5 }} 
      className="text-lg mb-6">
        {content}
      </motion.p>
      <button onClick={()=>{
        navigate(route)
      }} className="bg-[#0a210f] text-[#e1e289] px-4 py-2 rounded-lg hover:bg-[#0a210f6a] transition-colors duration-200">
        Try Out
      </button>
    </motion.div>
 );
};

// //<button onClick={() => navigate(route)} className="bg-[#0a210f] text-[#e1e289] px-4 py-2 rounded-lg hover:bg-[#0a210f6a] transition-colors duration-200">
// Try Out
// </button>

export default DashCard;
