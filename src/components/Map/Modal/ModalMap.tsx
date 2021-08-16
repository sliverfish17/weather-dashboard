import React, { Dispatch, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import * as d3 from "d3";

import "./ModalMap.scss";
interface ModalMapProps {
  active: boolean;
  setModalActive: Dispatch<boolean>;
}

export const ModalMap: React.FC<ModalMapProps> = ({
  active,
  setModalActive,
}) => {
  const current = useSelector((state: RootState) => state.weatherInfo.current);

  const selectedWeather = current?.daily.slice(1, 8).map((temp) => {
    return temp;
  });

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalActive(false);
    }
  };

  const myRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedWeather) {
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 520 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

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
          selectedWeather.map((d) =>
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
        .data(selectedWeather)
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
        .datum(selectedWeather)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return xScale(new Date(d.dt * 1000).toLocaleDateString());
            })
            .y(function (d) {
              return yScale(d.temp.max) * 1.5;
            })
            .curve(d3.curveBasis)
        );
    }
  }, [selectedWeather?.length]);

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div className={active ? "modal_content active" : "modal_content"}>
        <div ref={myRef}></div>
      </div>
    </div>
  );
};

export default ModalMap;
