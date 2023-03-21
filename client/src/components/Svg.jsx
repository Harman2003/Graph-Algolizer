import React, { useState } from 'react'
import {updateBounds } from '../controller/checkbound';

const Svg = React.forwardRef((props, ref) => {

     const [screensize, setscreen] = useState({
       width: window.innerWidth,
       height: window.innerHeight,
     });

     var timeout;
     window.addEventListener("resize", () => {
       if (timeout) {
         window.cancelAnimationFrame(timeout);
       }
       timeout = window.requestAnimationFrame(() => {
         setscreen({
           width: window.innerWidth,
           height: window.innerHeight,
         });
       });
     });
    
    let width = screensize.width * 0.5;
    let height = (screensize.height - 56);
    updateBounds(width, height);
    
    return (
      <svg
        className="bg-white rounded-lg w-[95%] h-[88%] m-auto"
        ref={ref}
        viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      />
    );
})

export default Svg
