import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen max-w-[90%] mx-auto flex flex-grow items-center justify-center">
      <div className="rounded-lg p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
        <p className="text-gray-400">
          Oops! The page you are looking for could not be found.
        </p>
        <a
          href="/dashboard"
          className="mt-4 inline-block rounded bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-600"
        >
          {" "}
          Go back to Dashboard{" "}
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
