import React, { useState, useContext, useRef } from "react";
import { GoTriangleDown } from "react-icons/go";
import Svg from "./Svg";
import { sampleGenerate } from "../controller/sampleGenerate";
import { graphalgo } from "../controller/graphalgo";
import { AppContext } from "./Home";

const Graph = React.forwardRef(( props,ref) => {
  
  const { graphdata, setgraph , NavHide1, NavHide2} = useContext(AppContext);

  const inputRef= useRef()
  
  //Algorithm popup State
  const [popup, setpopup] = useState(false);
  const show = () => (popup ? setpopup(false) : setpopup(true));
  
  //Algorithm State
  const [dataState, setData] = useState("Algorithms");
  const updatedata = (e) => {
    setData(e.target.innerHTML);
    show();
  };


  return (
    <>
      {popup && (
        <div
          className="blocker fixed w-screen h-screen z-0"
          onClick={show}
        ></div>
      )}
      <div
        className={` font-OpenSans w-1/2 px-5 h-[calc(100vh-56px)] bg-gray-100 `}
      >
        <div className="relative toolbar flex px-3 py-3.5 rounded-b-md">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gray-100/60 z-20 hidden"
            ref={NavHide1}
          ></div>
          <button
            className="bg-[#44a2e5] hover:bg-[#1b81ca] text-white text-sm px-2 py-0.5 rounded-full"
            onClick={() => graphalgo(dataState, graphdata, NavHide1, NavHide2, inputRef)}
          >
            Run Visualizer
          </button>
          <input
            ref={inputRef}
            type="number"
            className="ml-4 px-2 py-0.5 rounded-md"
            placeholder="Enter Source Node"
          />
          <button
            className="bg-[#44a2e5] hover:bg-[#1b81ca] text-white text-sm px-2 py-0.5 rounded-full ml-auto"
            onClick={() => sampleGenerate(setgraph, false)}
          >
            Generate Sample
          </button>
          <div className="ml-3 relative">
            <button
              className="border-2 border-gray-200 hover:bg-gray-300 rounded-full px-2 py-0.5 flex place-items-center relative z-10"
              onClick={show}
            >
              {dataState} <GoTriangleDown />
            </button>
            {popup && (
              <ul className="w-36 m-1 p-2 absolute rounded-lg shadow-2xl  ml-auto text-sm bg-slate-50 z-10">
                <div
                  className="hover:bg-slate-100 cursor-pointer"
                  onClick={updatedata}
                >
                  Depth First Search
                </div>
                <div
                  className="hover:bg-slate-100 cursor-pointer"
                  onClick={updatedata}
                >
                  Breadth First Search
                </div>
                <div
                  className="hover:bg-slate-100 cursor-pointer"
                  onClick={updatedata}
                >
                  Prim's Algorithm
                </div>
              </ul>
            )}
          </div>
        </div>

        {/* Graph Visualization */}
        <Svg ref={ref} />
      </div>
    </>
  );
});

export default Graph;
