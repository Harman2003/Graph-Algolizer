export const addNodes = (textData, setgraph) => {
  
    let data = textData;
    if (!data) {
        alert('Please enter some Data in Text Box');
        return
  };
  
  data = data.replace(/\n/, ";").split(";");
  let count = data[0];
  let nodes = [];
  for (let i = 0; i < count - "0"; i++) nodes.push({ id: i });

  let links = data[1]
    .trim()
    .substring(1, data[1].length - 1)
    .replace(/\n/g, "")
    .replaceAll(" ", "")
    .split(/[\[\]]/)
    .filter((e) => !(e === "" || e === ","));

  for (let i = 0; i < links.length; i++) {
    let l = links[i];
    links[i] = l.split(",");
    links[i] = {
      source: links[i][0] - "0",
      target: links[i][1] - "0",
      value: links[i][2] - "0",
    };
  }

  //Checking If Node exists
  for (const obj of links) {
    let n = nodes.length;
    if (obj.source >= n) {
      alert(`Node ${obj.source} does not exist`);
      return;
    }
    if (obj.target >= n) {
      alert(`Node ${obj.target} does not exist`);
      return;
    }

  }

  setgraph({
    node: [],
    links: [],
  });
  setgraph({
    nodes: nodes,
    links: links,
  });
};

