var fs = require('fs');

var data = fs.readFileSync('./data/All_Routes_By_Number.txt','utf-8');;

var graphLib = require('./lib/graph.js');

var commandLineArgs = require('command-line-args');

var Graph = graphLib.WeightedGraph;

var Edge = graphLib.Edge;

var lib = require('./lib/lib.js');

var refinedBusData = lib.refineBusData(data);

var graph =  lib.makeGraph(Graph, Edge, refinedBusData);

var cli = commandLineArgs([
  { name: 'route', alias: 'r', type: Boolean },
  { name: 'pass', alias: 'p', type: Boolean },
  { name: 'direct', alias: 'd', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'from', alias: 'f', type: String, multiple: true },
  { name: 'to', alias: 't', type: String, multiple: true}
]);

var options = cli.parse();

if(options.route){
	console.time();
	console.log(graph.shortestPath(options.from.join(" "),options.to.join(" ")));
	console.timeEnd();
}

// console.log(options);