/**
 * Created by hen on 2/20/14.
 */
    var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    width = 960 - margin.left - margin.right;

    height = 300 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: 100
    };

    dataSet = [];

    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


    d3.csv("popData.csv", function(data) {
		return {
			year: +data.year,
			
			USCensus: data.USCensus,
			
			PopulationBureau: data.PopulationBureau,
			
			UN: data.UN,
			
			HYDE: data.HYDE,
			
			Maddison: data.Maddison
			};
	}, function(error, rows) {

        return createVis(rows);
    });

    createVis = function(rows) {
	

        var xAxis, xScale, yAxis,  yScale;

          xScale = d3.scale.linear().domain([yearMinMax]).range([0, bbVis.w]);  // define the right domain generically

		  // example that translates to the bottom left of our vis space:
		  var visFrame = svg.append("g").attr({
		      "transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",
		  	  //....
			  
		  });
		  
		  console.log(rows);
		  
		  visFrame.append("rect");
		  //....
		  var yearMinMax = d3.extent(rows, function(d) {return d.year});
		  console.log(yearMinMax);
		  
          yScale = d3.scale.linear().domain([200,0]).range([0, bbVis.h]);
		  
		  xAxis = d3.svg.axis()
		  .scale(xScale)
		  .orient("bottom");
		  
          yAxis = d3.svg.axis()
		  .scale(yScale)
		  .orient("left")
		  .ticks(5);
		  
		  svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")")
			.call(yAxis);
			
		  svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(" + bbVis.x + "," + (bbVis.h + bbVis.h) + ")")
			.call(xAxis);
//        // add y axis to svg !




    };
