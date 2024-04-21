import React from 'react';
import { motion } from 'framer-motion';

const DashCard = () => {
 return (
    <motion.div
      className="bg-[#0a210f] text-white p-6 rounded-lg shadow-lg h-[500px] flex flex-col justify-between -mt-28"
      initial={{ x: -100, opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      transition={{ duration: 0.5 }}
      staggerChildren={1}
    >
      <h2 className="text-4xl font-bold mb-4 text-center">Card Heading</h2>
      <motion.p
      initial={{ x: 100, opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      transition={{ duration: 0.5 }} 
      className="text-lg mb-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam iste accusamus maxime nisi placeat nemo necessitatibus. Incidunt, quisquam quasi temporibus ut hic non. Esse distinctio numquam, corrupti fuga suscipit omnis quae obcaecati natus autem quisquam repellat sint tempore? Consectetur, aliquam!
      </motion.p>
      <button className="bg-white text-[#0a210f] px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
        Try Out
      </button>
    </motion.div>
 );
};

export default DashCard;
