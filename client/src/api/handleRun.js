import * as d3 from "d3";

export async function handleRun(list, graphdata) {

  console.log(list)
  //Clear the Graph Before Running New Algo
  for (const src of graphdata.nodes) {
    let node = d3.select(`#circle${src.id}`);
    node.attr("fill", "#FFFFFF");
  }

  for (let i = 0; i < list.length; i++) {
    let src = list[i];
    let isBackTrack = false;
    if (src[0] === "r") {
      isBackTrack = true;
      src = src.substring(1);
    }
    
    // handling two continuous repeation of nodes(happens when node has no further childrens to visit)
    if (i != list.length - 1 && list[i + 1][0] === 'r') {
      let next = list[i + 1];
      next = next.substring(1, next.length);
      if (src === next) continue;
    }

    let node = d3.select(`#circle${src}`);
    node.attr("fill", "#0B5345");
    if (isBackTrack) {
      await timeout(1000, node, "#FFFFFF");
    } else await timeout(1000, node, "#138D75");
  }
}

function timeout(time, node, color) {
  return new Promise((resolve) => {
    setTimeout(() => {
      node.attr("fill", color);
      resolve();
    }, time);
  });
}
