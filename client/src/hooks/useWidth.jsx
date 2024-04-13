import { useState, useEffect } from 'react';

function useWidth() {
 const [width, setWidth] = useState(window.innerWidth);

 function handleResize() {
    setWidth(window.innerWidth);
 }

 useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
 }, []);

 return width;
}