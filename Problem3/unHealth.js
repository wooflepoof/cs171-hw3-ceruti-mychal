var bbDetail, bbOverview, dataSet, svg, createVis;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1200 - margin.left - margin.right;

var height = 375 - margin.bottom - margin.top;

bbOverview = {
    x: 20,
    y: 0,
    w: width,
    h: 70
};

bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 300
};

var format = d3.time.format("%B %Y");

dataSet = [];

svg = d3.select("#visUN").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom
}).append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });


d3.csv("unHealth.csv", function(data) {

	return{
		AnalysisDate: format.parse(data.AnalysisDate),
		WomensHealth : +data.WomensHealth
	};
	
	}, function(error, data) {

	
         return createVis(data);
    });

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

createVis = function(data){
	
	dataSet = data
	
	xOverviewScale = d3.time.scale().domain(d3.extent(dataSet, function(d){return d.AnalysisDate})).range([bbOverview.x, bbOverview.w]);  // define the right domain generically
	
	var maxWomensHealth = d3.max(dataSet, function(d){return d.WomensHealth});
	
	//fix Y Scale
    yOverviewScale = d3.scale.linear().domain([0,maxWomensHealth]).range([bbOverview.h, 0]);	
	
	//define and create the brush
	var brushed = console.log("hello");
	
	var brush = d3.svg.brush().x(xOverviewScale).on("brush", brushed);
	
	svg.append("g").attr("class", "brush").call(brush)
	.selectAll("rect").attr({
    height: bbOverview.h,
    transform: "translate(" + 0 + "," + bbOverview.y + ")"
	});
	
	//create the axes
	
	xAxisOverview = d3.svg.axis()
	.scale(xOverviewScale)
	.orient("bottom");
		  
    yAxisOverview = d3.svg.axis()
	.scale(yOverviewScale)
	.orient("left")
	.ticks(3);
	
	line = d3.svg.line()
    .x(function(d) { return xOverviewScale(d.AnalysisDate); })
    .y(function(d) { return yOverviewScale(d.WomensHealth); });
	
	svg.append("g")
	.attr("class", "y axis overview")
	.attr("transform", "translate(" + bbOverview.x + ", "  + (bbOverview.y) + ")")
	.call(yAxisOverview);
			
	svg.append("g")
	.attr("class", "x axis overview")
	.attr("transform", "translate(" + 0 + "," + (bbOverview.h) + ")")
	.call(xAxisOverview);
	
	svg.append("path")
      .datum(dataSet)
      .attr("class", "line")
      .attr("d", line);
	
	svg.selectAll("circle")
	.data(dataSet)
	.enter()
	.append("circle")
	.attr("cx", function(d){return xOverviewScale(d.AnalysisDate)})
	.attr("cy", function(d){return yOverviewScale(d.WomensHealth)})
	.attr("r", 2);
	

		  
};

