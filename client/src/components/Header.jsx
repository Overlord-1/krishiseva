import React from "react";

const Header = () => {
  return (
    <div className="header flex justify-between border-solid border-b-4 border-black py-2">
      <div>
        <h1 className="text-4xl mainText font-bold uppercase mt-6 ml-6">
          कृषि
        </h1>
        <h1 className="text-4xl mainText font-bold uppercase ml-12 -mt-4 text-amber-300">
          SEVA
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-user-round size-10 m-3 mb-1"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>

        <h1 className="text-xl mr-2 font-bold">
          {localStorage.getItem("name")}
        </h1>
      </div>
    </div>
  );
};

export default Header;
