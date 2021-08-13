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
        return temp.temp.max;
      })
  );

  const outsideClick = (e: any) => {
    if (e.target.className === "modal active") {
      setModalActive(false);
    }
  };

  console.log(`ada`, selectedWeather);

  const getTime = d3.timeFormat("%H:%M");

  const w = 500;
  const h = 525;

  const myRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedWeather) {
      const accessToRef = d3
        .select(myRef.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const rect = accessToRef
        .selectAll("rect")
        .data(selectedWeather)
        .enter()
        .append("rect")
        .attr("x", (_d, i) => i * 70)
        .attr("y", (d, _i) => h - 10 * d)
        .attr("width", 60)
        .attr("height", (d, _i) => d * 10)
        .attr("fill", (d, _i) => (d > 30 ? "tomato" : "yellow"));
      rect.append(`title`).text((data) => `${data} celsius`);
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
