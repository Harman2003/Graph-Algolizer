import * as d3 from "d3";

export const bfs =  async (src, adjList, visited) => {
  
    var colors= getRandomColor()
    let queue = [];
    queue.push({value:src, radius:0});
    visited[src] = true;

    while (queue.length > 0) {
        
        let {value, radius} = queue.shift();
        let node = d3.select(`#circle${value}`);

      console.log(radius);
        node.attr("fill", colors[radius]);
        await timeout(500, node);

        for (let desObj of adjList[value]) {
            if (!visited.hasOwnProperty(desObj.des)) {
                queue.push({value:desObj.des, radius: radius+1});
                visited[desObj.des] = true;
            }
        }
  }
  
  return true;
}

function timeout(time, node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // node.attr("fill", "#138D75");
      resolve();
    }, time);
  });
}


function getRandomColor() {
  return [
    "#7f3c8d",
    "#11a579",
    "#3969ac",
    "#f2b701",
    "#e73f74",
    "#80ba5a",
    "#e68310",
    "#008695",
    "#cf1c90",
    "#f97b72",
    "#4b4b8f",
    "#A52A2A",
    "#800000",
    "#D2691E",
    "#FF7F50"
  ]
}