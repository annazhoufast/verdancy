import React, {Component, useState} from 'react';
import * as d3 from 'd3';


export class Breakdown extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            data: []
        }
    }

    drawChart(data) {
        // const data = this.state.data;
        const margin = ({ top: 20, right: 60, bottom: 40, left: 40 });

        const height = 700;

        const width = window.innerWidth - 200;

        const yeet = d3.sort(data, d => d.TotalCO2);

        const color = d3.scaleOrdinal()
            .domain(yeet.map(d => d.PlantName))
            .range(["#F4EBC2", "#D8C469", "#feffa6", "#E89B55"]);


        const max_CO2 = d3.max(data, d => d.TotalCO2);



        const x_scale = d3.scaleLinear()
            .domain([0, max_CO2])
            .range([margin.left + 60, width - margin.right - 150]);

        const y_scale = d3.scaleBand()
            .domain(yeet.map(d => d.PlantName))
            .range([height - margin.bottom, margin.top])
            .padding(0.1);

        const xAxis = g => g
            .attr("transform", `translate(0, 0)`)
            .call(d3.axisBottom(x_scale));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft().scale(y_scale))
            .style("font-size", "16pt");

        // const chart = d3.select("body")
        const chart = d3.select("#my-svg")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#679967");
            // .attr("transform", "translate(100, 100)");

        chart.append('g')
            .call(xAxis)
            .attr("transform", `translate(100, ${height-25})`)
            .style("color", "white");

        chart.append('g')
            .call(yAxis)
            .attr("transform", "translate(200,0)")
            .style("color", "white");

        chart.append("g")
            .selectAll("rect")
            .data(yeet)
            .join("rect")
                .attr("fill", (d) => color(d.PlantName))
                .attr("x", x_scale(0) + 100)
                .attr("y", d => y_scale(d.PlantName) + 15)
                .attr("width", d => x_scale(d.TotalCO2) - x_scale(0))
                .attr("height", 30); // y_scale.bandwidth()

        chart.selectAll("labels")
            .data(yeet)
            .enter()
            .append("text")
              .attr("x", (d) => x_scale(d.TotalCO2) + 5 + 100)
              .attr("y", d => y_scale(d.PlantName) + 35)
              .text(d => d.TotalCO2)
              .style("fill", "white")
            .style("font", "12pt Sans-serif");

        const an = chart.append("text")
            .attr("transform", `translate(${width / 2 + 20}, ${height - 50})`)
            .text("")
            .style("text-anchor", "middle")
            .style("font", "20pt Sans-serif")
            .style("fill", "white");

          an.text(`gCO2e`);
    }

    componentDidMount() {
        // console.log(this.state.data);

        console.log(window.innerWidth);
        fetch("https://verdancy.capstone.ischool.uw.edu/v1/UserPlants/", {
            method: "GET",
            headers: new Headers({
                "Authorization": localStorage.getItem("Authorization")
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.drawChart(result);
            });
    }

    render() {
        return (
          <section className="green-background">
            <div className="container">
              <div className="centered">
                <h3 className="centered emissions-header">Plantastic! Let's take a look at the emissions that were saved by each vegetable...</h3>
              </div>
                {/* <svg id="my-svg" width={window.innerWidth} height={800}></svg> */}
                <div id="my-svg"></div>
            </div>
          </section>
        )
    }
}
