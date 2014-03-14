var bbDetail, bbOverview, dataSet, svg, createVis;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1200 - margin.left - margin.right;

var height = 475 - margin.bottom - margin.top;

bbOverview = {
    x: 10,
    y: 0,
    w: width,
    h: 50
};

bbDetail = {
    x: 10,
    y: 50,
    w: width,
    h: 300
};

var format = d3.time.format("%B %Y");

var parseDate = d3.time.format("%m/%_d/%y").parse;

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


createVis = function(data){
	
	dataSet = data
			
	var maxWomensHealth = d3.max(dataSet, function(d){return d.WomensHealth});
	
    var x2 = d3.time.scale().range([bbOverview.x, bbOverview.w]),
		x = d3.time.scale().range([bbDetail.x, bbDetail.w]),
		y2 = d3.scale.linear().range([bbOverview.h, bbOverview.y]),
		y = d3.scale.linear().range([bbDetail.h, bbDetail.y]);
	
	var	xAxisOverview = d3.svg.axis()
		.scale(x2)
		.orient("bottom"),
		
		xAxisDetail = d3.svg.axis()
		.scale(x)
		.orient("bottom");		
					  
	var	yAxisOverview = d3.svg.axis()
		.scale(y2)
		.orient("left")
		.ticks(3),
					  
		yAxisDetail = d3.svg.axis()
		.scale(y)
		.orient("left");
		
	x.domain(d3.extent(dataSet, function(d){return d.AnalysisDate}));
	y.domain([0,maxWomensHealth]);
	x2.domain(x.domain());
	y2.domain(y.domain());
	
	var areaOverview = d3.svg.area()
	.interpolate("monotone")
    .x(function(d) { return x2(d.AnalysisDate); })
    .y0(bbOverview.h)
    .y1(function(d) { return y2(d.WomensHealth); });
	
	var areaDetail = d3.svg.area()
	.interpolate("monotone")
    .x(function(d) { return x(d.AnalysisDate); })
    .y0(bbDetail.h)
    .y1(function(d) { return y(d.WomensHealth); });
	

	
	var brush = d3.svg.brush().x(x2).on("brush", brushed);
	
	//define and create the brush (based on http://bl.ocks.org/mbostock/1667367 example)
	function brushed() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.select(".area").attr("d", areaDetail);
	focus.select(".x.axis").call(xAxisDetail);
	};
	
	//clip the graph
	svg.append("defs").append("clipPath")
    .attr("id", "clip")
	.append("rect")
	.attr("transform", "translate(" +bbDetail.x+ "," + 0 + ")")
    .attr("width", bbDetail.w)
    .attr("height", height)

	var context = svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + bbOverview.x + ", "  + (bbOverview.y) + ")")
	.call(yAxisOverview);
	
	var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + bbDetail.x + ", "  + bbDetail.y + ")");
	
	focus.append("path")
      .datum(dataSet)
      .attr("class", "area")
      .attr("d", areaDetail);

	focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" +bbDetail.x+ "," + bbDetail.h + ")")
      .call(xAxisDetail);

	focus.append("g")
      .attr("class", "y axis")
      .call(yAxisDetail);
  
	context.append("path")
      .datum(dataSet)
      .attr("class", "area")
      .attr("d", areaOverview);

	context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" +bbOverview.x + "," + bbOverview.h + ")")
      .call(xAxisOverview);
	  
	//create brush class  
	context.append("g").attr("class", "brush")
	.call(brush)
	.selectAll("rect").attr({
    height: bbOverview.h,
    transform: "translate(" + 0 + "," + bbOverview.y + ")"
	});
	



	//create the circles 
	svg.selectAll("circle")
	.data(dataSet)
	.enter()
	.append("circle")
	.attr("class", "circle")
	.attr("fill", "teal")
	.attr("cx", function(d){return x2(d.AnalysisDate)})
	.attr("cy", function(d){return y2(d.WomensHealth)})
	.attr("r", 3)
	.attr("transform", "translate(" +bbOverview.x + "," + 0 + ")");
	
	//Wire up the buttons	
	d3.select("input[value=\"National Wear Red Day\"]").on("click", function(){
		return svg.select(".brush").call(brush.extent([parseDate('1/1/12'),parseDate('3/1/12')])); //Thanks Carolina! @ 630
	});
	
	d3.select("input[value=\"Health & Human Services Announcement\"]").on("click", function(){
		return svg.select(".brush").call(brush.extent([parseDate('6/31/12'),parseDate('8/31/12')]))
	});
	
	
};

