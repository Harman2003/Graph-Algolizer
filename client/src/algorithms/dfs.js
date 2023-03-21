import * as d3 from "d3";


export const dfs = async (src, adjList, visited) => {
    
    let node = d3.select(`#circle${src}`);
    
    visited[`${src}`] = true;

    for (let desObj of adjList[src]) {

        if (!visited.hasOwnProperty(desObj.des)) {

            node.attr("fill", "rgb(22 101 52)");
            await timeout(500, node);

            await dfs(desObj.des, adjList, visited);  
        }
        
        node.attr("fill", "rgb(22 101 52)");
        await timeout(300, node);
    }

    return true;
}

function timeout(time, node) {
    return new Promise(resolve => {
        setTimeout(() => {
             node.attr("fill", "rgb(134 239 172)");
            resolve();
        }, time)
    })
}

