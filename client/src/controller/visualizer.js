import * as d3 from "d3";
import { checkBounds } from "./checkbound";

async function ForceGraph(
  { graphdata },
  {
    ref,
    nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
    nodeTitle, // given d in nodes, a title string
    nodeFill = "#FFFFFF", // node stroke fill
    nodeStroke = "#138D75", // node stroke color
    nodeStrokeWidth = 1.5, // node stroke width, in pixels
    nodeStrokeOpacity = 1, // node stroke opacity
    nodeRadius = 20, // node radius, in pixels
    nodeStrength,
    linkSource = ({ source }) => source, // given d in links, returns a node identifier string
    linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
    linkStroke = "#999", // link stroke color
    linkStrokeOpacity = 0.6, // link stroke opacity
    linkWeight = ({ value }) => value, // given d in links, returns a stroke width in pixels
    linkStrokeLinecap = "round", // link stroke linecap
    linkStrength,
    invalidation, // when this promise resolves, stop the simulation
  } = {}
) {
  let nodes = graphdata.nodes;
  let links = graphdata.links;

  // Compute values.
  const N = d3.map(nodes, nodeId).map(intern);
  const LS = d3.map(links, linkSource).map(intern);
  const LT = d3.map(links, linkTarget).map(intern);
  if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);

  const W = d3.map(links, linkWeight);
  W.reverse();
  const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

  // Replace the input nodes and links with mutable objects for the simulation.
  // setgraph({
  let Nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
  let Links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));
  // })

  // Construct the forces.
  const forceNode = d3.forceManyBody().distanceMax(300).strength(-100);
  const forceLink = d3.forceLink(Links).id(({ index: i }) => N[i]);
  if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
  if (linkStrength !== undefined) forceLink.strength(linkStrength);

  const simulation = d3
    .forceSimulation(Nodes)
    // .charge(0)
    .force("link", forceLink)
    .force("charge", forceNode)
    .force("center", d3.forceCenter())
    // .gravity(0)
    .on("tick", ticked);

  await ref.current;

  const svg = d3.select(ref.current);
  // .attr("style", "width: 95%; height: 80%; margin: auto")
  // .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg
    .append("g")
    .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
    .attr("stroke-opacity", linkStrokeOpacity)
    .attr("stroke-linecap", linkStrokeLinecap)
    .selectAll("line")
    .data(Links)
    .join("line")
    .attr("class", (e) => {
      
      return (
        "line" +
        e.source.id +
        "_" +
        e.target.id +
        " " +
        "line" +
        e.target.id +
        "_" +
        e.source.id
      );
    });

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(Nodes)
    .join("circle")
    .attr("id", ({ id: i }) => "circle" + i)
    .attr("fill", nodeFill)
    .attr("stroke", nodeStroke)
    .attr("stroke-opacity", nodeStrokeOpacity)
    .attr("stroke-width", nodeStrokeWidth)
    .attr("r", nodeRadius)
    .call(drag(simulation));

  const id = svg
    .append("g")
    .selectAll("text")
    .data(Nodes)
    .join("text")
    .text(({ index: i }) => T[i])
    .call(drag(simulation));

  const weight = svg
    .append("g")
    .selectAll("text")
    .data(Links)
    .join("text")
    .text(() => W.pop())
    .call(drag(simulation));

  // if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
  if (L) link.attr("stroke", ({ index: i }) => L[i]);

  if (invalidation != null) invalidation.then(() => simulation.stop());

  function intern(value) {
    return value !== null && typeof value === "object"
      ? value.valueOf()
      : value;
  }

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    weight
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);

    node
      .attr("cx", (d) => {
        checkBounds(d, nodeRadius);
        return d.x;
      })
      .attr("cy", (d) => d.y);

    id.attr("x", (d) => {
      checkBounds(d, nodeRadius);
      return d.x - 7;
    }).attr("y", (d) => d.y + 5);
  }

  let tempForces = {};

  const modifyForces = (simulation) => {
    tempForces = {};
    // For example, I want to temporarily remove the "link" and "charge" forces during dragging.
    ["link", "charge"].forEach((forceName) => {
      tempForces[forceName] = simulation.force(forceName);
      simulation.force(forceName, null);
    });
    // You may modify your forces here. Store them to 'tempForces' if you'd like to restore them after dragging.
  };

  const restoreForces = (simulation) => {
    for (let [name, force] of Object.entries(tempForces)) {
      simulation.force(name, force);
    }
    tempForces = {};
  };

  function drag(simulation) {
    function dragstarted(event) {
      modifyForces(simulation);
      if (!event.active) simulation.alphaTarget(0.05).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      restoreForces(simulation);

      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return Object.assign(svg.node());
}

export default ForceGraph;
