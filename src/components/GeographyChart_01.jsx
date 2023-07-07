import React from "react";
import USAMap from "react-usa-map";
import statesJson from "../states.json";
 export default function GeographyChart({ data }) {
  const states = statesJson.data;
  console.log(data);
   const createColorMap = () => {
    const colorMap = {};
     data.forEach(({ state, percentage }) => {
      console.log(typeof(percentage))
      const stateData = states.find((s) => s.attributes.name === state);
      if (stateData) {
        colorMap[stateData.attributes.abbreviation] = {
          fill: percentage>0&&percentage<2?"#90ee90":(percentage>=2&&percentage<7)?"#ff7f50":"#87ceeb"
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
