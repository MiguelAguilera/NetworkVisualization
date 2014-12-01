
var width = 1280,
    height = 800;
var margin = {top: 30, right: 20, bottom: 30, left: 50};

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-400)
    .linkDistance(80)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    

d3.json("net.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();
      
      

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 2)
      .style("stroke", function(d) { 	if (d.value===1) {return "lime";}
      								 	else if (d.value===-1) {return "red";} 
      								 	});

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("r", function(d) { 	if (d.type==="proposal") {return d.size + 5;}
      								else if (d.type==="user") {return 5;} 
      								})

      .style("fill", function(d) { 	if (d.type==="proposal") {return "Crimson";}
      								else if (d.type==="user") {return "black";} 
      								})
      .call(force.drag);

	node.append("title")
 		.text(function(d) { return d.name; });
      
    
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
  
});
