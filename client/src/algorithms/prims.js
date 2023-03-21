import * as d3 from "d3";
import PriorityQueue from "./priorityQueue";

export const prims = async (src, adjList, visited) => {
  
    let queue = new PriorityQueue();
    console.log('childpushed')
    for (const { des, weight } of adjList[src]) {
        console.log({src:des, parent:src, weight:weight})
        queue.enqueue({src:des, parent: src, weight: weight }, weight);
    }

  visited[src] = true;

  while (!queue.isEmpty()) {
      let choosedEdge = queue.dequeue();
      if (visited[choosedEdge.src]) continue;
      visited[choosedEdge.src] = true;

      let link = await d3.select('.line' + choosedEdge.src + '_' + choosedEdge.parent);
      
      console.log(choosedEdge)

    // node.attr("fill", "#0B5345");
      link.attr("stroke", "blue");
      link.attr("stroke-width", '3')
    await timeout(800);
    // console.log(parent)

    for (let desObj of adjList[choosedEdge.src]) {
        if (!visited.hasOwnProperty(desObj.des)) {
        queue.enqueue({src:desObj.des, parent:choosedEdge.src, weight: desObj.weight}, desObj.weight);
      }
    }
    }
    
    return true;
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

