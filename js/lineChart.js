function createChart(foodName, element) {

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  /*var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");*/

  var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  var svg = d3.select("#" + element).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  $.getJSON("result.json", function (data) {

    var requiredData = [];
    var existingEntries = [];
    var foodData = data[foodName];

    for (var lang in foodData) {
      var lang = foodData[lang];
      for (var year in lang) {
        var yearContent = lang[year];
        for (var month in yearContent) {
          var monthVal = yearContent[month];
          var date = new Date();
          date.setYear(year);
          date.setMonth(month);
          date.setDate(1);

          // merge different languages
          if (existingEntries[year * 100 + month] == null) {
            var index = requiredData.push({
                "date" : date,
                "close": monthVal
              }) - 1;
            existingEntries[year * 100 + month] = index;
          } else {
            requiredData[existingEntries[year * 100 + month]].close += monthVal;
          }
        }
      }
    }
    requiredData.sort(compare);

    x.domain(d3.extent(requiredData, function (d) {
      return d.date;
    }));
    y.domain(d3.extent(requiredData, function (d) {
      return d.close;
    }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    /*svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("Price ($)");*/

    svg.append("path")
      .datum(requiredData)
      .attr("class", "line")
      .attr("d", line);
  });
}

function compare(a, b) {

  if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}