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
  const selectedWeather = useSelector((state: RootState) =>
    state.weatherInfo.cache[state.weatherInfo.cache.length - 1].daily
      .slice(1, 8)
      .map((temp) => {
        return temp;
      })
  );
  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalActive(false);
    }
  };

  const getTime = d3.timeFormat("%H:%M");

  const myRef = useRef<HTMLDivElement>(null);

  const i = selectedWeather.map((info) => {
    return info.temp.max;
  });
  console.log(selectedWeather);

  React.useEffect(() => {
    if (selectedWeather) {
      const margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 560 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select(myRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
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
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(selectedWeather)
        .join("rect")
        .attr("width", x.bandwidth)
        .attr("height", (d) => height - y(d.temp.max))
        .attr("x", (d) =>
          x(new Date(d.dt * 1000).toLocaleDateString().slice(0, 10))
        )
        .attr("y", (d) => y(d.temp.max))
        .attr("fill", "#69b3a2");
    }
  }, []);

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div className={active ? "modal_content active" : "modal_content"}>
        <div ref={myRef}></div>
      </div>
    </div>
  );
};

export default React.memo(ModalMap);
