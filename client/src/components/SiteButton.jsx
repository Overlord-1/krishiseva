import React from "react";

const SiteButton = ({ text ,width ,height }) => {
  return (
    <button className={`bg-black p-5 rounded-[16px] m-2 text-white hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50 font-bold flex items-center justify-center`}
        style={{width: width, height: height}}
    >
      {text}
    </button>
  );
};

export default SiteButton;
