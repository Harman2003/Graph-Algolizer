import * as d3 from "d3";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { prims } from "../algorithms/prims";

export const graphalgo = async (algo, graphdata, NavHide1, NavHide2, inputRef) => {

  if (algo === "Algorithms") {
    alert("Please choose one Algorithm to Run Visualizer");
    return;
  }

  if (inputRef.current.value < 0 || inputRef.current.value > 15) {
    alert("Please enter a valid node number")
    return;
  }

  const src = Math.round(inputRef.current.value)
  console.log(src);

  //Clear the Graph Before Running New Algo
  for (const src of graphdata.nodes) {
    let node = d3.select(`#circle${src.id}`);
    node.attr("fill", "#FFFFFF");
  }

  for (const Obj of graphdata.links) {
    let link = d3.select('.line'+Obj.source+'_'+Obj.target);
    link.attr("stroke", "gray");
    link.attr("stroke-width", "1.5px")
  }

  //Create Adjacency List
  let nodes = graphdata.nodes.length;
  let adjacencyList = [];
  for (let i = 0; i < nodes; i++) adjacencyList[i] = [];

  for (let i = 0; i < graphdata.links.length; i++) {
    let src = graphdata.links[i].source;
    let des = graphdata.links[i].target;
    let weight = graphdata.links[i].value;

    adjacencyList[src].push({ des, weight });
    adjacencyList[des].push({ des: src, weight });
  }

  let visited = {};

  switch (algo) {
    case "Depth First Search":
      console.log(algo);
      NavHide1.current.style.display='block'
      NavHide2.current.style.display='block'
      await dfs(src, adjacencyList, visited);
      NavHide1.current.style.display= 'none'
      NavHide2.current.style.display= 'none'
      break;
    case "Breadth First Search":
      console.log(algo);
      NavHide1.current.style.display = "block";
      NavHide2.current.style.display = "block";
      await bfs(src, adjacencyList, visited);
      NavHide1.current.style.display = "none";
      NavHide2.current.style.display = "none";
      break;
    case "Prim's Algorithm":
      console.log(algo);
     NavHide1.current.style.display = "block";
     NavHide2.current.style.display = "block";
      await prims(src, adjacencyList, visited);
      NavHide1.current.style.display = "none";
      NavHide2.current.style.display = "none";
      break;
  }
}