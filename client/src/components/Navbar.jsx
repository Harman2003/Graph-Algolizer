import React from 'react'

const Navbar = () => {
  return (
    
    <div className="bg-white flex p-2 h-14 drop-shadow-sm border-b-2 border-gray-300">
        <h1 className="font-Montserrat text-lg bg-slate-800 text-white mx-4 px-2 py-1 rounded-b-lg">
          Graph /<span className="font-extrabold"> Runner</span>
        </h1>
        <ul className="flex w-80 place-content-evenly">
          <li>Home</li>
          <li>Visualizer</li>
          <li>Learn</li>
          <li>Contanct Us</li>
        </ul>
      </div>
    
  );
}

export default Navbar
