import React, { useState } from "react";
import "../sideColorBar/colorBar.css";
import add from "../../assets/add.png";
import add1 from "../../assets/add1.png";

export const ColorBar = (props) => {
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
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
