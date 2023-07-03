import React from "react";
import USAMap from "react-usa-map";
import statesJson from "../states.json";
 export default function GeographyChart_02({ data }) {
  const states = statesJson.data;
   const createColorMap = () => {
    const colorMap = {};
    data.forEach(({ state, count }) => {
      const stateData = states.find((s) => s.attributes.name === state);
      if (stateData) {
        colorMap[stateData.attributes.abbreviation] = {
          fill:
            count > 0 && count < 30
              ? "#90ee90"
              : count >= 30 && count < 70
              ? "#ff7f50"
              : count>=70 ?"ff0000":"#87ceeb",
          count,
        };
      }
    });
    return colorMap;
  };
   const colorMap = createColorMap();
   const legendItems = [
    {
        color: "#87ceeb",
        label: "0",
      },
    {
      color: "#90ee90",
      label: "1-30",
    },
    {
      color: "#ff7f50",
      label: "30-70",
    },
    {
      color: "#ff0000",
      label: "70+",
    },
  ];
   const Legend = () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {legendItems.map(({ color, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <div style={{ width: "20px", height: "20px", backgroundColor: color, marginRight: "5px" }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
   return (
    <div style={{ width: '50%', height: '50%' }}>
      <USAMap customize={colorMap} />
      <Legend />
    </div>
  );
}
