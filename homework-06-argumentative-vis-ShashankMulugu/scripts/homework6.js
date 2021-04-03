var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%m/%d/%y");

var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

var svg = d3.select("#barchart").append("svg").style("background-color", "#061f08")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data\\barchart.csv").then(function (data) {

    data.forEach(function (d) {
        d.approval = +d.approval;
    });

    x.domain(data.map(function (d) { return d.year; }));
    y.domain([0, d3.max(data, function (d) { return d.approval; })]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.approval); })
        .attr("height", function (d) { return height - y(d.approval); });

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("Approval Rating")
        .style("fill", "white");

    svg.append("g")
        .attr('class', 'grid')
        .call(d3.axisLeft(y)

            .tickSize(-width, 0, 0));
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("Year")
        .style("fill", "white");
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom + 30)
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .style("fill", "orange")
        .text("Approval Ratings");
    svg.selectAll(".tick line").attr("stroke", "cyan").attr("stroke-opacity", 0.6)
    svg.selectAll(".tick text").attr("stroke", "white").style("font-size", 10)



});

///////////Line Chart////////////
var parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
var x2 = d3.scaleTime().range([0, width]);
var y2 = d3.scaleLinear().range([height, 0]);

// define the line


var linesvg = d3.select("#linechart")
    .append("svg").style("background-color", "#061f08")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data\\meanlinedata.csv").then(function (data) {
    var valueline = d3.line()
        .x(function (d) { return x2(d.date); })
        .y(function (d) { return y2(d.value); });
    var valueline2 = d3.line()
        .x(function (d) { return x2(d.date); })
        .y(function (d) { return y2(d.plus); });
    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
        d.plus = +d.plus;
    });

    // Scale the range of the data
    x2.domain(d3.extent(data, function (d) { return d.date; }));
    y2.domain([d3.min(data, function (d) {
        return Math.min(d.value, d.plus);
    }), d3.max(data, function (d) {
        return Math.max(d.value, d.plus);
    })]);

    // Add the valueline path.
    linesvg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "lime")
        .attr("d", valueline);

    linesvg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline2);


    // Add the x Axis
    linesvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        );

    linesvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("Ratings")
        .style("fill", "white");

    // Add the y Axis
    linesvg.append("g")
        .call(d3.axisLeft(y)
            .tickSize(-width, 0, 0));
    linesvg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .text("Year")
        .style("fill", "white");
    linesvg.append("text")
        .attr("x", (width / 2) - 170)
        .attr("y", height + margin.bottom + 30)
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .style("fill", "orange")
        .text("Approval Ratings");
    linesvg.append("text")
        .attr("x", width / 2 + 70)
        .attr("y", height + margin.bottom + 30)
        .style("text-anchor", "right")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .style("fill", "lime")
        .text("Disapproval Ratings");
    linesvg.selectAll(".tick line").attr("stroke", "cyan").attr("stroke-opacity", 0.6)
    linesvg.selectAll(".tick text").attr("stroke", "white").style("font-size", 10)

});
