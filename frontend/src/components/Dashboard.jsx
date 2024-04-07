import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import * as d3 from "d3";
import MyListings from "./MyListings";

export default function Dashboard() {
    const [selectedValue, setSelectedValue] = useState("Dashboard");
    useEffect(() => {
        // Bar graph data
        const meatData = [
            { type: "Fish", value: Math.random() * 100 },
            { type: "Beef", value: Math.random() * 100 },
            { type: "Pork", value: Math.random() * 100 },
            { type: "Lamb", value: Math.random() * 100 },
            { type: "Chicken", value: Math.random() * 100 },
        ];

        // Total excess meat transactions data (random values for demonstration)
        const transactionsData = [
            { month: "January", value: Math.random() * 1000 },
            { month: "February", value: Math.random() * 1000 },
            { month: "March", value: Math.random() * 1000 },
        ];

        // Creating bar graph
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 300 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3
            .select("#bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleBand()
            .domain(meatData.map((d) => d.type))
            .range([0, width])
            .padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(meatData, (d) => d.value)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g").call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(meatData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.type))
            .attr("y", (d) => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.value))
            .attr("fill", "#856cf4");

        // Total excess meat transactions line chart
        const lineChartMargin = { top: 20, right: 30, bottom: 30, left: 40 };
        const lineChartWidth =
            300 - lineChartMargin.left - lineChartMargin.right;
        const lineChartHeight =
            300 - lineChartMargin.top - lineChartMargin.bottom;

        const lineChartSvg = d3
            .select("#line-chart")
            .append("svg")
            .attr(
                "width",
                lineChartWidth + lineChartMargin.left + lineChartMargin.right
            )
            .attr(
                "height",
                lineChartHeight + lineChartMargin.top + lineChartMargin.bottom
            )
            .append("g")
            .attr(
                "transform",
                `translate(${lineChartMargin.left},${lineChartMargin.top})`
            );

        const xLine = d3
            .scaleBand()
            .domain(transactionsData.map((d) => d.month))
            .range([0, lineChartWidth])
            .padding(0.1);

        const yLine = d3
            .scaleLinear()
            .domain([0, d3.max(transactionsData, (d) => d.value)])
            .nice()
            .range([lineChartHeight, 0]);

        const line = d3
            .line()
            .x((d) => xLine(d.month) + xLine.bandwidth() / 2)
            .y((d) => yLine(d.value));

        lineChartSvg
            .append("path")
            .datum(transactionsData)
            .attr("fill", "none")
            .attr("stroke", "#856cf4")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        lineChartSvg
            .selectAll(".dot")
            .data(transactionsData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", (d) => xLine(d.month) + xLine.bandwidth() / 2)
            .attr("cy", (d) => yLine(d.value))
            .attr("r", 4)
            .attr("fill", "steelblue");
        // Adding axis to line chart
        lineChartSvg
            .append("g")
            .attr("transform", `translate(0,${lineChartHeight})`)
            .call(d3.axisBottom(xLine));

        lineChartSvg.append("g").call(d3.axisLeft(yLine));
    }, []);

    return (
        <Container>
            <Sidebar
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
            {selectedValue == "Dashboard" ? (
                <>
                    <BarChart id="bar-chart"></BarChart>
                    <BarChart id="line-chart"></BarChart>
                </>
            ) : (
                <>
                    <MyListings />
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 100%;
`;

const BarChart = styled.div`
    background: #f1edff;
    border-radius: 24px;
    height: fit-content;
    padding: 24px;
    margin: 24px;
`;
