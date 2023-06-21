import React from "react";
import USAMap from "react-usa-map";
import statesJson from "../states.json";
 export default function GeographyChart({ data }) {
  const states = statesJson.data;
   const createColorMap = () => {
    const colorMap = {};
     data.forEach(({ state, price }) => {
      const stateData = states.find((s) => s.attributes.name === state);
      if (stateData) {
        colorMap[stateData.attributes.abbreviation] = {
          fill: price>100&&price<300?(price>=300&&price<700?"#90ee90":"#ff7f50"):"#87ceeb"
        };
      }
    });
    console.log(colorMap)
     return colorMap;
  };
   const colorMap = createColorMap();
   return (
    <div>
      <USAMap customize={colorMap} />
    </div>
  );
}