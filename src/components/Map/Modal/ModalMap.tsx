import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TTemp } from "../../utils/types";
import "./ModalMap.scss";

interface ModalMapProps {
  active: boolean;
  data: TTemp | null;
  outsideClick: React.MouseEventHandler<HTMLDivElement>;
}

export const ModalMap: React.FC<ModalMapProps> = ({
  active,
  data,
  outsideClick,
}) => {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      let innerW = window.innerWidth / 1.5;
      let innerH = window.innerHeight / 3;
      if (window.innerWidth === 1920 && window.innerHeight > 960) {
        innerW = 540;
        innerH = 500;
      } else if (window.innerWidth > 1920 && window.innerHeight > 1000) {
        innerW = window.innerWidth / 2.5;
        innerH = window.innerWidth / 3;
      }

      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = innerW - margin.left - margin.right,
        height = innerH - margin.top - margin.bottom;

      const svg = d3
        .select(myRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map((d) =>
            new Date(d.dt * 1000).toLocaleDateString().slice(0, 10)
          )
        )
        .padding(0.2);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      const yScale = d3.scaleLinear().domain([-100, 100]).range([height, 0]);

      svg.append("g").call(d3.axisLeft(yScale));

      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("width", xScale.bandwidth)
        .attr("height", (d) => height - yScale(d.temp.max))
        .attr("x", (d) =>
          xScale(new Date(d.dt * 1000).toLocaleDateString().slice(0, 10))
        )
        .attr("y", (d) => yScale(d.temp.max))
        .attr("fill", "#FFA500")
        .append(`title`)
        .text(
          (d) => `${d.temp.max} celsius
        `
        );

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4)

        .attr(
          "d",
          d3
            .line()
            .curve(d3.curveBasis)
            .x(function (d) {
              return xScale(new Date(d.dt * 1000).toLocaleDateString()) * 1.11;
            })
            .y(function (d) {
              return yScale(d.temp.max) * 1.2;
            })
        );
    }
  }, [data]);

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div className={active ? "modal_content active" : "modal_content"}>
        <div ref={myRef}></div>
      </div>
    </div>
  );
};

export default ModalMap;
