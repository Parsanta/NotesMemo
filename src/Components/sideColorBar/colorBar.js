import React, { useState } from "react";
import "../sideColorBar/colorBar.css";
import add from "../../assets/add.png";
import add1 from "../../assets/add1.png";

export const ColorBar = (props) => {
  const colors = [
    "#FF6384", 
    "#36A2EB", 
    "#FFCE56", 
    "#4BC0C0", 
    "#9966FF", 
  ];

  const [listOpen, setListOpen] = useState(false);

  const addImage = props.mode ? add1 : add;

  return (
    <div className="colorBar">
      <img src={addImage} alt="colors" onClick={() => setListOpen(!listOpen)} />
      <ul className={`colors ${listOpen ? "colors_active" : ""}`}>
        {colors.map((item, index) => (
          <li
            key={index}
            className="color"
            style={{ backgroundColor: item }}
            onClick={() => props.addNote(item)}
          />
        ))}
      </ul>
    </div>
  );
};
