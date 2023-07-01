import React, { useState } from "react";
import "../Note/note.css";
import deleteIcon from "../../assets/delete.png";
import pin from '../../assets/pin.png';
import unpin from '../../assets/unpin.png';

export const NoteArea = (props) => {
  const [pinned, setPinned] = useState(props.note.pinned);

  const noteStyle = {
    backgroundColor: props.note.color,
    color: props.mode ? "#ffffff" : "#000000",
  };

  const handleTogglePin = () => {
    setPinned(!pinned);
    props.pinNote(props.note.id);
  };
  

  return (
    <div className={`noteArea ${props.mode ? "dark-mode" : ""}`} style={noteStyle} >
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
          src={pinned ? unpin : pin}
          alt="pin"
          style={{ height: "35px", marginLeft: "0" ,opacity:pinned?1:""}}
          onClick={handleTogglePin}
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
