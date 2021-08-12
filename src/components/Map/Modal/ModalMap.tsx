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
  const selectedWeather = useSelector(
    (state: RootState) => state.currentPoint.weather
  );

  const outsideClick = (e: any) => {
    if (e.target.className === "modal active") {
      setModalActive(false);
    }
  };
  console.log(selectedWeather);

  const data = selectedWeather.daily.slice(1, 8).map((temp) => {
    return temp.temp.max;
  });

  console.log(data);

  const w = 500;
  const h = 500;

  const myRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const accessToRef = d3
      .select(myRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#FFFFFF");

    accessToRef
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 60)
      .attr("height", (d, i) => d * 10)
      .attr("fill", (d, i) => (d > 35 ? "tomato" : "yellow"));
  }, []);

  return (
    <div className={active ? "modal active" : "modal"} onClick={outsideClick}>
      <div className={active ? "modal_content active" : "modal_content"}>
        {<div ref={myRef}></div>}
      </div>
    </div>
  );
};

export default ModalMap;
