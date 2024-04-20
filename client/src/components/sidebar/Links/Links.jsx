import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Links = () => {
  return (
    <div className='links'>
      <Link to={"/crop"}>
        <motion.a
          className='text-white'
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
          className='text-white'
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
          Leaf Detector
        </motion.a>
      </Link>
      <Link to={"/community"}>
        <motion.a
          className='text-white'
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
          Community Section
        </motion.a>
      </Link>
    </div>
  );
};

export default Links;