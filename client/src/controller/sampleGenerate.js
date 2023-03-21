export let sampleGenerate = (setgraph, initialize) => {
   
    let nodes = [];
    for (let i = 0; i <=15; i++)
        nodes[i] = { id: i }
    
    let links = [];
    for (let i = 0; i <=20; i++){
        let src = Math.floor(Math.random() * 15);
        let des = Math.floor(Math.random() * 15);
        let val = Math.floor(Math.random() * 50);

        //parallel edge checker
        let check = links.find((e) => {
            console.log('hey')
            let source = e?.source;
            let target = e?.target;
            return ((src===source && des===target) || (src===target && des===source))
        })

        //check for self loop & parallel edges
        if(!check && src!==des)
        links.push({source: src, target: des, value: val})
    }

    console.log(links);

    if(!initialize)
        setgraph({
            nodes: nodes,
            links: links
        })
    else
    return {
        nodes: nodes,
        links: links
    }
}

// export sampleGenerate;