Homework 3 Problem 3 Answers
============================

Questions
--------

** Looking at the elements that are added to the <g> element.**
	1. Name the HTML element (type and class) that represents the interactive area.
		The graph lies within the div element with `id = "visUN"`. In the div, an SVG element is created wherein lies the the <g> element that holds the space for the entire graph. The interactive space (where the brushing occurs) is in a <g> element with class = "focus"
	
	2. Name the HTML element (type and class) that is used for representing the selection.
		It is a <rect> element with `class = "extent"`. 
	
	3. What are the other DOM elements for?
		The other DOM elements (<g> class = resize e, and resize w) represent the drag-able(transforming?) bounds of the brushing rectangle.