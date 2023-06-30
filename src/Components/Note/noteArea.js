import React, { useState } from "react";
import "../Note/note.css";
import deleteIcon from "../../assets/delete.png";
import pin from '../../assets/pin.png';

export const NoteArea = (props) => {
  const noteStyle = {
    backgroundColor: props.note.color,
    color: props.mode ? "#ffffff" : "#000000",
  };

  return (
    <div className={`noteArea ${props.mode ? "dark-mode" : ""}`} style={noteStyle}>
      <textarea
        className="noteText"
        defaultValue={props.note.text}
        placeholder="Enter Text"
        onChange={(event) => props.updateText(event.target.value, props.note.id)}
        style={noteStyle}
      />
      <div className="noteDelete">
        <p>{props.note.time}</p>
        <img
          src={pin}
          alt="pin"
          
        />
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => props.deleteNote(props.note.id)}
        />
      </div>
    </div>
  );
};
