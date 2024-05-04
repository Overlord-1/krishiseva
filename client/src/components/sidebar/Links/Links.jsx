import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LightLogo from "/logos/krishiseva-high-resolution-logo-black2.png";


const Links = () => {
  return (
    <div>
      
    <div className='links'>
    <img
          src={LightLogo}
          alt="krishiseva logo light mode"
          width={299}
          className="mx-auto"
        />  
        <div></div>  
      <Link to={"/crop"}>
        <motion.a
          className='text-[#0a210f] font-bold'
          whileHover={{
            textDecoration: "underline",
            textDecorationThickness: "9px",
            textDecorationColor: "currentColor",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          style={{
            textDecoration: "none",
            textDecorationThickness: "0px",
            textDecorationColor: "transparent",
            transition: {
              textDecoration: { duration: 0.3, ease: "easeInOut" },
              textDecorationThickness: { duration: 0.3, ease: "easeInOut" },
              textDecorationColor: { duration: 0.3, ease: "easeInOut" }
            }
          }}
        >
          Crop Predictor
        </motion.a>
      </Link>
      <Link to={"/leaf"}>
        <motion.a
          className='text-[#0a210f] font-bold'
          whileHover={{
            textDecoration: "underline",
            textDecorationThickness: "9px",
            textDecorationColor: "currentColor",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          style={{
            textDecoration: "none",
            textDecorationThickness: "0px",
            textDecorationColor: "transparent",
            transition: {
              textDecoration: { duration: 0.3, ease: "easeInOut" },
              textDecorationThickness: { duration: 0.3, ease: "easeInOut" },
              textDecorationColor: { duration: 0.3, ease: "easeInOut" }
            }
          }}
        >
          Leaf Care Diagnostics
        </motion.a>
      </Link>
      <Link to={"/community"}>
        <motion.a
          className='text-[#0a210f] font-bold'
          whileHover={{
            textDecoration: "underline",
            textDecorationThickness: "9px",
            textDecorationColor: "currentColor",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          style={{
            textDecoration: "none",
            textDecorationThickness: "0px",
            textDecorationColor: "transparent",
            transition: {
              textDecoration: { duration: 0.3, ease: "easeInOut" },
              textDecorationThickness: { duration: 0.3, ease: "easeInOut" },
              textDecorationColor: { duration: 0.3, ease: "easeInOut" }
            }
          }}
        >
          Farmers Forum
        </motion.a>
      </Link>
    </div>
    </div>
  );
};

export default Links;