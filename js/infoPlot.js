function infoPlot(){

    var self = this; // for internal d3 functions

    var ipDiv = $("#plot");
  
 var margin = {top: 10, right: 10, bottom: 100, left: 0},
    margin2 = {top: 150, right: 10, bottom: 5, left: 0},
    width = ipDiv.width() - margin.left - margin.right,
    height = ipDiv.height() - margin.top - margin.bottom,
    height2 = ipDiv.height() - margin2.top - margin2.bottom;

/*       
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    margin2 = {top: 5, right: 5, bottom: 30, left: 40},
    width = ipDiv.width() - margin.left - margin.right,
    height = ipDiv.height() - margin.top - margin.bottom,
    height2 = ipDiv.height() - margin2.top - margin2.bottom;
 
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
   		margin2 = {top: 5, right: 5, bottom: 20, left: 40},
        width = ipDiv.width() - margin.right - margin.left,
        height = ipDiv.height() - margin.top - margin.bottom
        height2 = ipDiv.height() - margin2.top - margin2.bottom;
*/
var parseDate = d3.time.format("%Y-%m-%d").parse;

    var x = d3.time.scale().range([0, width]);

    var x2 = d3.time.scale().range([0, width]);

    var y = d3.scale.linear().range([height, 0]);

    var y2 = d3.scale.linear().range([height, 0]);


/*
var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);
*/
var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.close); });

var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.close); });



/*
var svg = d3.select("#plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/
var svg = d3.select("#plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
 	.append("rect")
    .attr("width", width)
    .attr("height", height);


var focus = svg.append("svg:g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("svg:g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("data/nordea.csv", type, function(error, data) {


  x.domain(d3.extent(data.map(function(d) { return d.date ; })));
  y.domain([0, d3.max(data.map(function(d) { return d.close; }))]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);
});



function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select(".area").attr("d", area);
  focus.select(".x.axis").call(xAxis);
}

function type(d) {

  d.date = parseDate(d.date);
  d.close = +d.close;
  return d;
}

}




