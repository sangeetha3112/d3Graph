//Defining the D3 margin
var margin={ top:60, right:30, bottom: 100, left:100},
    width=900 - margin.right-margin.left,
    height=500- margin.top-margin.bottom;
//define svg
var svg_population=d3.select('#population')
        .append('svg')
        .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
        })
        .append('g')
            .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');
//Scale and Axis
var xScale=d3.scale.ordinal()
.rangeRoundBands([0,width], 0.1);
var yScale=d3.scale.linear()
.range([height, 0]);
//define axis
var xAxis=d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
var yAxis=d3.svg.axis()
    .scale(yScale)
    .orient("left");
//Getting JSON data
d3.json("output/ageWiseLiteratePopulation.json", function(error, data){
    if(error){
    console.log("Error");
    }
    data.forEach(function(d){
        d.population=+ d.population;
        d.ageGroup=d.ageGroup;
        console.log(d.population);
    });
    data.sort(function(a,b){
    return b.population- a.population;
    });
// specify the domains of x and y scales
xScale.domain(data.map(function(d){
    return d.ageGroup;
}));
yScale.domain([0, d3.max(data, function(d){
    return d.population;
})]);
//draw the bars
svg_population.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay(function(d,i){
        return i*200;
    })
    .attr({
        'x': function(d){
        return xScale(d.ageGroup);
        },
        'y': function(d){
        return yScale(d.population);
        },
        "width": xScale.rangeBand(),
        "height": function(d){
        return height-yScale(d.population);
        }
    });
//label the bars
/*
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d){ return d.population2013; })
    .attr('x', function (d){ return xScale(d.country) + xScale.rangeBand()/2;
    })
    .attr('y', function(d){
    return yScale(d.population2013) + 12;
    })
    .style("fill", "white")
    .style("text-anchor", "left");
*/
// append x axis and y axis
svg_population.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-60)")
    .attr("dx","-0.8em")
    .attr("dy", "-0.25em")
    .style("text-anchor","end")
    .style("font-size", "12px");
svg_population.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll('text')
    .attr("dx","-0.8em")
    .attr("dy", "-0.25em")
    .style("text-anchor","end")
    .style("font-size", "12px");
});
