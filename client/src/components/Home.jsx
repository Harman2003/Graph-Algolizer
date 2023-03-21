import React, { useRef, useState, createContext, useCallback } from "react";
import Graph from "./Graph";
import TextArea from "./TextArea";
import ForceGraph from "../controller/visualizer";
import { sampleGenerate } from "../controller/sampleGenerate";
import Split from "react-split";


export const AppContext = createContext(null);

const Home = () => {
  
  const sample = useCallback(() => sampleGenerate(null, true), []);
  //graph nodes & links
  const [graphdata, setgraph] = useState(sample());
  const svgRef = useRef(null);
  const NavHide1 = useRef()
  const NavHide2= useRef()

    if (svgRef.current) {
      svgRef.current.innerHTML = "";
    }
  ForceGraph(
    {
      graphdata,
    },
    {
      nodeId: (d) => d.id,
      nodeTitle: (d) => d.id,
      nodeStrength: -2000,
      ref: svgRef,
      nodeRadius: 20
    }
  )

  return (
    
    <AppContext.Provider value={{ graphdata, setgraph , NavHide1, NavHide2}}>
      <Split  
        direction="horizontal"
        className="flex bg-gray-300 z-10"
      >
        <Graph ref={svgRef}/>
        <TextArea  />
      </Split>
    </AppContext.Provider>
  )
};

export default Home;
