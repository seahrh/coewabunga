var Turtles = {};

Turtles.Viz = {};

Turtles.Viz.Prices = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=0"
};

Turtles.Viz.Prices.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Prices.dataSourceUrl);
	
	query.setQuery("select B, min(F) group by B pivot D order by B format B 'd MMM yyyy', min(F) '$#,###' ");
	
	query.send(Turtles.Viz.Prices.dashboard);
};

Turtles.Viz.Prices.dashboard = function(response) {
	var toDate = new Date();

	var fromDate = new Date();

	// Initial filter chart by the last 2 years

	fromDate.setDate(toDate.getDate() - (2 * 365));

	var containerId = "coe-prices";

	var data = response.getDataTable();

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));

	var dateControl = new google.visualization.ControlWrapper({
		"controlType" : "ChartRangeFilter",
		"containerId" : "coe-prices-control1",
		"options" : {
			"filterColumnIndex" : 0,
			"ui" : {
				"chartType" : "LineChart",
				"chartOptions" : {
					"enableInteractivity" : false,
					"chartArea" : {
						"height" : "100%"
					},
					"legend" : {
						"position" : "none"
					},
					"hAxis" : {
						"textPosition" : "in"
					},
					"vAxis" : {
						"textPosition" : "none",
						"gridlines" : {
							"color" : "none"
						}
					}
				},
				"snapToData" : true
			}
		},
		"state" : {
			"range" : {
				"start" : fromDate,
				"end" : toDate
			}
		}
	});

	var chart = new google.visualization.ChartWrapper({
		"containerId" : "coe-prices-chart1",
		"chartType" : "LineChart",
		"options" : {
			"title" : "COE Prices",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxes" : {
				0 : {
					"title" : "COE Prices of Cars (All Categories except D)",
					"textPosition" : "in",
					"format" : "$#,###",
					"titleTextStyle" : {
						"italic" : false
					}
				},
				1 : {
					"title" : "COE Prices of Motorcycles (Category D)",
					"textPosition" : "in",
					"format" : "$#,###",
					"titleTextStyle" : {
						"italic" : false
					}
				}
			},
			"hAxis" : {
				"textPosition" : "none",
				"textStyle" : {
					"fontSize" : 16
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "90%",
				"height" : "95%",
				"left" : 60,
				"top" : 45
			},
			"focusTarget" : "category",
			"series" : {
				0 : {
					"type" : "line",
				},
				1 : {
					"type" : "line",
				},
				2 : {
					"type" : "line",
				},
				3 : {
					"type" : "line",
					"targetAxisIndex" : 1
				},
				4 : {
					"type" : "line"
				}
			}
			

		}

	});

	dashboard.bind([ dateControl ], [ chart ]);

	dashboard.draw(data);

};


Turtles.Viz.Quotas = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=0"
};

Turtles.Viz.Quotas.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Quotas.dataSourceUrl);
	
	query.setQuery("select B, C, D, E, G, H, F "
			+ "order by B "
			+ "label D 'Category', C 'Year', F 'Price' "
			+ "format B 'd MMM yyyy', F '$#,###' ");
	
	query.send(Turtles.Viz.Quotas.dashboard);
};

Turtles.Viz.Quotas.dashboard = function(response) {
	
	var containerId = "coe-quotas";

	var data = response.getDataTable();

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var categoryControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : "coe-quotas-control1",
		"options" : {
			"filterColumnLabel" : "Category",
			"ui" : {
				"label" : "Category",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["Cat A (Cars up to 1600cc and 97kW)"]
		}
	});

	var yearControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : "coe-quotas-control2",
		"options" : {
			"filterColumnLabel" : "Year",
			"ui" : {
				"label" : "Year",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : true,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : []
		}
	});


	var chart = new google.visualization.ChartWrapper({
		"containerId" : "coe-quotas-chart1",
		"chartType" : "ComboChart",
		"options" : {
			"title" : "COE Quotas, Bids Received and Prices",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxes" : {
				0 : {
					"title" : "",
					"textPosition" : "out",
					"format" : "#,###"
				},
				1 : {
					"textPosition" : "out",
					"format" : "$#,###"
				}
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "yyyy",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "85%",
				"height" : "80%",
				"left" : 60,
				"top" : 45
			},
			"focusTarget" : "category",
			"isStacked" : true,
			"series" : {
				0 : {
					"type" : "bars",
				},
				1 : {
					"type" : "bars",
				},
				2 : {
					"type" : "line",
					"targetAxisIndex" : 1,
					"color" : "green"
				}
			}

		}

	});

	chart.setView({
		'columns' : [ 0,3,4,6]
	});
	
	dashboard.bind([ yearControl, categoryControl ], [ chart ]);

	dashboard.draw(data);

};


Turtles.Viz.QuotasYearly = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=0"
};

Turtles.Viz.QuotasYearly.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Quotas.dataSourceUrl);
	
	query.setQuery("select C, D, sum(E), max(F), avg(F)"
			+ "group by C, D "
			+ "label D 'Category', C 'Year', sum(E) 'Yearly Quota', max(F) 'Highest Price', avg(F) 'Average Price' "
			+ "format sum(E) '#,###', max(F) '$#,###', avg(F) '$#,###' ");
	
	query.send(Turtles.Viz.QuotasYearly.dashboard);
};

Turtles.Viz.QuotasYearly.dashboard = function(response) {
	
	var containerId = "coe-quotas-yearly";

	var data = response.getDataTable();

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var categoryControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control1",
		"options" : {
			"filterColumnLabel" : "Category",
			"ui" : {
				"label" : "Category",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["Cat A (Cars up to 1600cc and 97kW)"]
		}
	});


	var chart = new google.visualization.ChartWrapper({
		"containerId" : containerId + "-chart1",
		"chartType" : "ComboChart",
		"options" : {
			"title" : "Annual COE Quotas vs. Price",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxes" : {
				0 : {
					"title" : "",
					"textPosition" : "out",
					"format" : "#,###"
				},
				1 : {
					"textPosition" : "out",
					"format" : "$#,###"
				}
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "#",
				"textStyle" : {
					"fontSize" : 14
				},
				"gridlines" : {
					"count" : 6
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "85%",
				"height" : "80%",
				"left" : 60,
				"top" : 45
			},
			"focusTarget" : "category",
			"series" : {
				0 : {
					"type" : "bars"
				},
				1 : {
					"type" : "line",
					"targetAxisIndex" : 1
				},
				2 : {
					"type" : "line",
					"targetAxisIndex" : 1
				}
			}
		}

	});

	chart.setView({
		'columns' : [ 0,2,3,4]
	});
	
	dashboard.bind([ categoryControl ], [ chart ]);

	dashboard.draw(data);

};


Turtles.Viz.BidDistribution = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=3"
};

Turtles.Viz.BidDistribution.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.BidDistribution.dataSourceUrl);
	
	query.setQuery("select A, C, H, J, L "
			+ "where L > 0 "
			+ "label A 'Bidding Exercise', C 'Category', L 'Number Of Successful Bids' "
			+ "format L '#,###', J '$#,###' ");
	
	query.send(Turtles.Viz.BidDistribution.dashboard);
};

Turtles.Viz.BidDistribution.dashboard = function(response) {
	
	var containerId = "coe-biddist";

	var data = response.getDataTable();
	
	console.log(containerId + ".isError: " + response.isError() 
			+ "\nMessage: " + response.getMessage() 
			+ "\nDetailedMessage: " + response.getDetailedMessage());

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var exerciseControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control1",
		"options" : {
			"filterColumnLabel" : "Bidding Exercise",
			"ui" : {
				"label" : "Bidding Exercise",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["August 2013 Second Open Bidding Exercise"]
		}
	});
	
	var categoryControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control2",
		"options" : {
			"filterColumnLabel" : "Category",
			"ui" : {
				"label" : "Category",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["Category B (Cars 1601cc and above)"]
		}
	});


	var chart = new google.visualization.ChartWrapper({
		"containerId" : containerId + "-chart1",
		"chartType" : "ComboChart",
		"options" : {
			"title" : "Distribution Of Successful Bids (June - August 2013)",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxes" : {
				0 : {
					"title" : "",
					"textPosition" : "in",
					"format" : "$#,###"
				},
				1 : {
					"textPosition" : "in",
					"format" : "#,###"
				}
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "#",
				"textStyle" : {
					"fontSize" : 13
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "75%",
				"left" : 0,
				"top" : 50
			},
			"focusTarget" : "category",
			"series" : {
				0 : {
					"type" : "bars"
				},
				1 : {
					"type" : "steppedArea",
					"targetAxisIndex" : 1
				}
			}
		}

	});

	chart.setView({
		'columns' : [ 2,3,4]
	});
	
	dashboard.bind([ exerciseControl,categoryControl ], [ chart ]);

	dashboard.draw(data);

};

Turtles.Viz.Overbidding = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=3"
};

Turtles.Viz.Overbidding.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Overbidding.dataSourceUrl);
	
	query.setQuery("select A, C, sum(L) "
			+ "where L > 0 and (M = 'Total number of successful bids' or M = 'Bids exceeding QP by 10% or more') "
			+ "and C != 'Category D (Motorcycles)' "
			+ "group by A, C "
			+ "pivot M "
			+ "label A 'Bidding Exercise', C 'Category', sum(L) '' "
			+ "format sum(L) '#,###' ");
	
	query.send(Turtles.Viz.Overbidding.dashboard);
};

Turtles.Viz.Overbidding.dashboard = function(response) {
	
	var containerId = "coe-overbid";

	var data = response.getDataTable();
	
	console.log(containerId + ".isError: " + response.isError() 
			+ "\nMessage: " + response.getMessage() 
			+ "\nDetailedMessage: " + response.getDetailedMessage());

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var exerciseControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control1",
		"options" : {
			"filterColumnLabel" : "Bidding Exercise",
			"ui" : {
				"label" : "Bidding Exercise",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["August 2013 Second Open Bidding Exercise"]
		}
	});

	var chart = new google.visualization.ChartWrapper({
		"containerId" : containerId + "-chart1",
		"chartType" : "SteppedAreaChart",
		"options" : {
			"title" : "Number Of Successful Bids Exceeding Quota Premium By 10 Percent Or More (June - August 2013)",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxis" : {
				"title" : "",
				"textPosition" : "in",
				"format" : "#,###"
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "#",
				"textStyle" : {
					"fontSize" : 13
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "75%",
				"left" : 0,
				"top" : 50
			},
			"focusTarget" : "category"
		}

	});
	
	chart.setView({
		'columns' : [ 1,2,3]
	});
	
	dashboard.bind([ exerciseControl], [ chart ]);

	dashboard.draw(data);

};


Turtles.Viz.Subscription = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEdZQkFWelRiSTQ5MUdzSXdnVHkzRUE&headers=1&gid=0"
};

Turtles.Viz.Subscription.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Subscription.dataSourceUrl);

	query.setQuery("select B, G/E, F, C, D "
			+ "order by B "
			+ "label G/E 'Subscription Rate', D 'Category', C 'Year', F 'Price' "
			+ "format B 'd MMM yyyy', G/E '#.#', F '$#,###' ");

	query.send(Turtles.Viz.Subscription.dashboard);
};

Turtles.Viz.Subscription.dashboard = function(response) {
	
	var containerId = "coe-subscription";

	var toDate = new Date();

	var fromDate = new Date();

	// Initial filter chart by the last 2 years

	fromDate.setDate(toDate.getDate() - (180));
	
	var data = response.getDataTable();

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var categoryControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control1",
		"options" : {
			"filterColumnLabel" : "Category",
			"ui" : {
				"label" : "Category",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : false,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["Category A (Cars 1600cc and below)"]
		}
	});

	var yearControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control2",
		"options" : {
			"filterColumnLabel" : "Year",
			"ui" : {
				"label" : "Year",
				"labelStacking" : "horizontal",
				"allowTyping" : false,
				"allowMultiple" : true,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : []
		}
	});

	var chart = new google.visualization.ChartWrapper({
		"containerId" : containerId + "-chart1",
		"chartType" : "ComboChart",
		"options" : {
			"title" : "COE Quotas vs. Highest Price By Year",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxes" : {
				0 : {
					"title" : "",
					"textPosition" : "out",
					"format" : ""
				},
				1 : {
					"textPosition" : "out",
					"format" : ""
				}
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "MMM yyyy",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "85%",
				"height" : "80%",
				"left" : 30,
				"top" : 45
			},
			"focusTarget" : "category",
			"series" : {
				0 : {
					"type" : "bars"
				},
				1 : {
					"type" : "line",
					"targetAxisIndex" : 1
				}
			}
		}

	});
	
	chart.setView({
		'columns' : [ 0,1,2]
	});
	
	dashboard.bind([ categoryControl,yearControl ], [ chart ]);

	dashboard.draw(data);

};

Turtles.Viz.Population = {};

Turtles.Viz.Population.Cars = {
	dataSourceUrl : "//spreadsheets.google.com/a/google.com/tq?key=0ArgBv2Jut0VxdEZkckZ3ekhka3I5aE5qZUpKd2I3VEE&headers=1&gid=0"
		
	//dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdEZkckZ3ekhka3I5aE5qZUpKd2I3VEE&headers=2&gid=0"
};

Turtles.Viz.Population.Cars.query = function() {
	var query = new google.visualization.Query(Turtles.Viz.Population.Cars.dataSourceUrl);

	query.setQuery("select A, L, K, J, I, H, G, F, E, D, C, B "
			+ "order by A "
			+ "label A 'Brand' ");

	query.send(Turtles.Viz.Population.Cars.dashboard);
};

Turtles.Viz.Population.Cars.dashboard = function(response) {
	
	var containerId = "car-population";

	var data = response.getDataTable();
	
	
	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var brandControl = new google.visualization.ControlWrapper({
		"controlType" : "CategoryFilter",
		"containerId" : containerId + "-control1",
		"options" : {
			"filterColumnLabel" : "Brand",
			"ui" : {
				"label" : "Brand",
				"labelStacking" : "horizontal",
				"allowTyping" : true,
				"allowMultiple" : true,
				"selectedValuesLayout" : "aside"
			},
		},
		"state" : {
			"selectedValues" : ["FERRARI", "LAMBORGHINI", "MASERATI", "ROLLS ROYCE", "ASTON MARTIN"]
		}
	});

	var chart = new google.visualization.ChartWrapper({
		"containerId" : containerId + "-chart1",
		"chartType" : "ColumnChart",
		"options" : {
			"title" : "Yearly Car Population",
			"titleTextStyle" : {
				"fontSize" : 16
			},
			"vAxis" : {
				"title" : "",
				"textPosition" : "in",
				"format" : "#,###"
			},
			"hAxis" : {
				"textPosition" : "out",
				"format" : "",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "80%",
				"left" : 0,
				"top" : 40
			},
			"focusTarget" : "category"
		}

	});
		
	dashboard.bind([ brandControl ], [ chart ]);

	dashboard.draw(data);

};

Turtles.UI = {};

Turtles.UI.LoadAnimation = {
	"start" : function(){
		var opts = {
			lines : 13, // The number of lines to draw
			length : 7, // The length of each line
			width : 4, // The line thickness
			radius : 10, // The radius of the inner circle
			corners : 1, // Corner roundness (0..1)
			rotate : 0, // The rotation offset
			color : '#000', // #rgb or #rrggbb
			speed : 1, // Rounds per second
			trail : 60, // Afterglow percentage
			shadow : false, // Whether to render a shadow
			hwaccel : false, // Whether to use hardware acceleration
			className : 'spinner', // The CSS class to assign to the spinner
			zIndex : 2e9, // The z-index (defaults to 2000000000)
			top : $(window).height()/2.5, // Manual positioning in viewport
			left : "auto"
			
		};
		var target = $("body")[0];
		return new Spinner(opts).spin(target);
	},
	"stop" : function(spinner){
		spinner.stop();
	}
};