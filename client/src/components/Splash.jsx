import React, { useEffect } from 'react';
import './Splash.css'; 

const Splash = ({ onComplete, startPosition }) => {
 useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
 }, [onComplete]);

 return (
    <div
      className="splash-screen"
      style={{
        top: startPosition.top,
        left: startPosition.left,
        width: startPosition.width,
        height: startPosition.height,
      }}
    ></div>
 );
};

export default Splash;
