/**
 * Created by hen on 2/20/14.
 */
 
	// influenced by http://bl.ocks.org/mbostock/3884955
    var bbVis, brush, createVis, dataSet, dUSCensus, dPopulationBureau, dHYDE, dUN, dMaddison, handle, height, margin, svg, svg2, width;

	var color = d3.scale.category10();
	
    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    width = 1200 - margin.left - margin.right;

    height = 375 - margin.bottom - margin.top;

    bbVis = {
        x: 70,
        y: 0,
        w: width - 100,
        h: height + 0
    };
	//known data
    dataSet = [];
	//interpolated data
	dataSet2 = [];

	
	
    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


    d3.csv("popData.csv", function(data) {
		//Create both datasets, then populate them with data
		if (+data['USCensus'] != 0){
			dataSet.push({name:'USCensus', year: +data.year, population: +data['USCensus']})
			}
		else{
			dataSet2.push({name:'USCensus', year: +data.year, population: +data['USCensus']})
			};
		
		if (+data['PopulationBureau'] != 0){
			dataSet.push({name:'PopulationBureau', year: +data.year, population: +data['PopulationBureau']})
			}
		else{
			dataSet2.push({name:'PopulationBureau', year: +data.year, population: +data['PopulationBureau']})
			};
		
		if (+data['UN'] != 0){
			dataSet.push({name: 'UN', year: +data.year, population: +data['UN']})
			}
		else{
			dataSet2.push({name: 'UN', year: +data.year, population: +data['UN']})
			};
		
		if (+data['HYDE'] != 0){
			dataSet.push({name: 'HYDE', year: +data.year, population: +data['HYDE']})
			}
		else{
			dataSet2.push({name: 'HYDE', year: +data.year, population: +data['HYDE']})
			};
		
		if (+data['Maddison'] != 0){
			dataSet.push({name: 'Maddison', year: +data.year, population: +data['Maddison']})
			}
		else{
			dataSet2.push({name:'Maddison', year: +data.year, population: +data['Maddison']})
			};
		
		return {
		
			year: /*new Date(data.year, 0)*/+data.year,
			
			USCensus: +data.USCensus,
			
			PopulationBureau: +data.PopulationBureau,
			
			UN: +data.UN,
			
			HYDE: +data.HYDE,
			
			Maddison: +data.Maddison
			}
			

	}, function(error, data) {
		color.domain(d3.keys(data[0]).filter(function(key) {return key !== "year"; }));

	
          return createVis(data);
    });

    createVis = function(data) {
	
        var xAxis, x, yAxis,  y;
		

		  
		// dataSet.map
		  
		  // create the line
		  
		  /* var line = d3.svg.line()
			.data(dataSet)
			.interpolate("basis")
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.population); }); */
		
		  

		/*  //Implement interpolation
		var interpolatedData = dataSet.forEach(function(d){
			if (d.year == 0){
				*/
			

		  

		  //  Use highest population estimates 		  
		  var popMax = d3.max(data, function(d){
			return Math.max([d.USCensus], [d.PopulationBureau], [d.UN], [d.HYDE], [d.Maddison])				
			});
			
		  //X Scale
		  x = d3.scale.pow().exponent(3.5).domain([0, 2050]).range([bbVis.x, bbVis.w]);  // define the right domain generically
		  //Y Scale
          y = d3.scale.pow().exponent(1.5).domain([0, popMax]).range([bbVis.h, 0]);
		  
		  //X and Y Axis
		  xAxis = d3.svg.axis()
		  .scale(x)
		  .orient("bottom")
		  .tickFormat(d3.format("d"));
		  
          yAxis = d3.svg.axis()
		  .scale(y)
		  .orient("left")
		  
		    
		  //visual stuff		  
		  svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + bbVis.x + ", "  + bbVis.y + ")")
			.attr("font-size", "11px")
		    .attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.call(yAxis);
			
		  svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(" + 5 + "," + (bbVis.h) + ")")
			.attr("font-size", "11px")
		    .attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.call(xAxis);
		
		  svg.selectAll("circle")
			.data(dataSet)
			.enter()
			.append("circle")
			.attr("cx", function(d){return x(d.year)})
			.attr("cy", function(d){return y(d.population)})
			.attr("r", 3)
			.attr("fill", function(d){return color(d.name)}); 
			
			
		  svg.append("path")
			.attr("class", "line")
			.attr("d", function (d){return d.population})
			.style("stroke", "red");
		
	


	

		/*  svg.selectAll("circle")
			.data(dataSet)
			.enter()
			.append("circle")
			.attr("cx", function(d){Object.keys(d).forEach(function (key){d[key].forEach(function(d){return x(d.year)})})})
			.attr("cy", function(d){Object.keys(d).forEach(function (key){d[key].forEach(function(d){return y(d.value)})})})					
			.attr("r", 2);
		*/
		






    };
