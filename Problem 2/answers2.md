Questions Problem 2
======================

1. The data-types are table, row, and html elements.

2. Here is how I implemented this feature:

`			var getRows = getTable.find("tr:gt(9)").each(function(index, value){
					var lineArray = [];
					/* Select the first 6 td" elements columns and iterate over them*/	
					$(this).find('td:lt(6)')
					.each(function(index, value){
						if ($(value).text().length > 0){
							return lineArray.push(convertToInt(($(value).text())));
						}
						/*Push empty cells to the array*/
						else{
							return lineArray.push('');
						}
					}); `