import React, {useState,useCallback, useRef} from 'react'

const Slider = ({slidChange, setSlid}) => {

    const [isDragging, setIsDragging] = useState(null);
    const ref = useRef(null);

    const handleMouseDown = useCallback((e) => {
        setIsDragging(e.screenX);

        document.addEventListener('mouseup', () => {
            setIsDragging(null);
            console.log('up');
        }, {once:true})
  }, [])

  const handleMouseMove = (e) => {
    if (isDragging) {
      setSlid(isDragging - e.clientX)
        if(e.screenX>0)
        ref.current.style.right = `${isDragging - e.screenX}px`
      else  ref.current.style.right = `${isDragging + e.screenX}px`;
        console.log(slidChange);
    }
  }

    
  return (
      <div
          ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={`slider fixed m-auto select-none group flex h-full items-center justify-center transition bg-gray-300 hover:bg-blue-500 w-4 hover:cursor-col-resize`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2 14"
        width="2"
        height="14"
        fill="currentColor"
        className="text-white dark:text-gray-400 transition -translate-y-6 dark:group-hover:text-white"
      >
        <circle
          r="1"
          transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"
        ></circle>
        <circle
          r="1"
          transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"
        ></circle>
        <circle
          r="1"
          transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"
        ></circle>
      </svg>
    </div>
  );
}

export default Slider
