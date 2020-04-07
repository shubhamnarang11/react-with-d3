import React, { Component } from "react";
import * as d3 from "d3";
import "./graph.css";

class Graph extends Component {
  componentDidMount() {
    this.drawBarChart(this.props.graphData);
  }

  drawBarChart(data) {
    var margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 100
    };

    var width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale
      .linear()
      .range([0, width])
      .domain([
        0,
        d3.max(data, function(d) {
          return d.val_1;
        })
      ]);

    var y = d3.scale
      .ordinal()
      .rangeRoundBands([height - 200, 0], 0.1)
      .domain(
        data.map(function(d) {
          return d.brand;
        })
      );

    var yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var bars = svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g");

    bars
      .append("rect")
      .attr("y", function(d) {
        return y(d.brand) + 22;
      })
      .attr("height", 15)
      .attr("x", 0)
      .attr("width", function(d) {
        return x(d.val_1) / 2;
      })
      .attr("class", data =>
        data.val_1 >= data.mark_val
          ? "thin-bar-higher-value"
          : "thin-bar-lesser-value"
      );

    bars
      .append("rect")
      .attr("y", function(d) {
        return y(d.brand) + 12;
      })
      .attr("height", 40)
      .attr("x", 0)
      .attr("width", function(d) {
        return x(d.val_2) / 2;
      })
      .attr("class", data =>
        data.val_1 >= data.mark_val
          ? "thick-bar-higher-value"
          : "thick-bar-lesser-value"
      );

    bars
      .append("line")
      .style("stroke", "black")
      .attr("x1", function(d) {
        return x(d.mark_val) / 2;
      })
      .attr("y1", function(d) {
        return y(d.brand) + 15;
      })
      .attr("x2", function(d) {
        return x(d.mark_val) / 2;
      })
      .attr("y2", function(d) {
        return y(d.brand) + 50;
      });
  }

  render() {
    return <div ref="canvas"></div>;
  }
}

export default Graph;
