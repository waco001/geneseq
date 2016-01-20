/**
 * @overview Draws bodydonut for bodymap expression.
 * @module Bodymap
 * @author Abhishek Gorti
 */
/**
 * Manages the bodymap donut chart
 * @this bodymap namespace
 * @class bodymap
 * @constructor
 */
var bodydonut = new function() {
    var draw_plot = function(id, source, params) {
        $.post(source, {
            'gene_id': id
        }, function(data, status) {
            if (status == 'success' && data != null) {
                console.log('data: ' + data);
                console.log('status: ' + status);
                data = jQuery.parseJSON(data);
                self.data = data;
                data.values.sort(function(a, b) {
                    return b[1] - a[1]
                });
                var dataset = [{
                    gene: "",
                    data: []
                }];
                var genes = [];
                dataset = [{
                    data: [],
                    gene: "LPAR"
                }];
                data.values.forEach(function(s) {
                    genes.push(s[0]);
                    dataset[0].data.push(s[1])
                });
                var texttip = d3.select(".texttip");

                var width = 600,
                    height = 400,
                    cwidth = 50;
                var inner_radius = 70;

                var color = d3.scale.ordinal()
                    .range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#FFFFFF"]);

                var pie = d3.layout.pie()
                    .sort(null)
                    .startAngle(10 * (Math.PI / 180))
                    .endAngle(300 * (Math.PI / 180));

                var arc = d3.svg.arc();

                var svg = d3.select("#bodydonut-chart").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("stroke-width", "2.5")
                    .attr("stroke", "white")
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var gs = svg.selectAll("g")
                    .data(d3.values(dataset)).enter().append("g");
                gs.selectAll("path").data(function(d) {
                        return pie(d.data);
                    })
                    .enter().append("path")
                    .attr("fill", function(d, i) {
                        return color(i);
                    })
                    .attr("d", function(d, i, j) {
                        console.log(d);
                        console.log(i);
                        console.log(j);
                        return arc.innerRadius(cwidth * j + inner_radius).outerRadius(cwidth * (j + 1) + inner_radius)(d)
                    }).on("mouseover", function(d, i, j) {
                      d3.select(this)
                       .attr("stroke","white")
                       .transition()
                       .duration(500)
                       .attr("stroke-width",6);
                        d3.select(".inside-text").text(genes[i] + " " + Math.round(d.value));
                    }).on("mouseout", function() {
                      d3.select(this)
                       .attr("stroke","white")
                       .transition()
                       .duration(1000)
                       .attr("stroke-width",2.5);
                        d3.select(".inside-text").text("");
                    }).on("click", function(d, j) {
                        alert("Onclick Maybe?:" + d.data.name);
                    });

                var texts = svg.selectAll("text")
                    .data(d3.values(dataset))
                    .enter();
                svg.append("text")
                    .attr("stroke", "black")
                    .attr("stroke-width", "0")
                    .style("text-anchor", "middle")
                    .attr("class", "inside-text")
                    .text(function(d) {
                        return '';
                    });

            }
        });
    };
    /**
     * Public function to draw plot
     * @param {string} id - gene id to plot
     * @param {string} source - data source to POST to
     * @param {dict} params
     */
    this.plot = function(id, source, params) {
        draw_plot(id, source, params);
    };
}
