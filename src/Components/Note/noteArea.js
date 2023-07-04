import React, { useState, useRef } from "react";
import "../Note/note.css";
import deleteIcon from "../../assets/delete.png";
import pin from "../../assets/pin.png";
import unpin from "../../assets/unpin.png";
import note from "../../assets/note.png";
import list from "../../assets/list.png";

export const NoteArea = (props) => {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const [listCount, setListCount] = useState(1);
  const [isListEnabled, setListEnabled] = useState(false);

  const handleToggleList = () => {
    setListEnabled(!isListEnabled);
    if (!isListEnabled) {
      const lines = text.split("\n");
      const newLines = [...lines];
      let newListCount = listCount;

      for (let i = 0; i < lines.length; i++) {
        newLines[i] = `${newListCount}. ${newLines[i]}`;
        newListCount++;
      }

      setText(newLines.join("\n"));
      setListCount(newListCount);
    } else {
      const lines = text.split("\n");
      const newLines = lines.map((line) => line.replace(/^\d+\.\s/, ""));
      setText(newLines.join("\n"));
    }
  };

  const handleKeyDown = (event) => {
    if (!isListEnabled || event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    const textArea = textAreaRef.current;
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;

    const lines = text.split("\n");
    const newLines = [...lines];

    if (selectionStart === selectionEnd) {
      newLines.splice(selectionStart, 0, `${listCount}. `);
      setListCount((prevCount) => prevCount + 1);
    } else {
      const selectedText = text.substring(selectionStart, selectionEnd);
      const selectedLines = selectedText.split("\n");

      let replaceText = "";
      selectedLines.forEach((line, index) => {
        if (index === 0) {
          replaceText += `${listCount}. ${line}\n`;
          setListCount((prevCount) => prevCount + 1);
        } else {
          replaceText += line;
        }

        if (index < selectedLines.length - 1) {
          replaceText += "\n";
        }
      });

      newLines.splice(selectionStart, selectionEnd - selectionStart, replaceText);
    }

    setText(newLines.join("\n"));
    textArea.selectionStart = selectionStart + 3;
    textArea.selectionEnd = selectionEnd + 3;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const noteStyle = {
    backgroundColor: props.note.color,
    color: props.mode ? "#ffffff" : "#000000",
  };

  const [pinned, setPinned] = useState(props.note.pinned);

  const handleTogglePin = () => {
    setPinned(!pinned);
    props.pinNote(props.note.id);
  };

  return (
    <div className={`noteArea ${props.mode ? "dark-mode" : ""}`} style={noteStyle}>
      <div className="noteHeader">
        <input
          className="noteTitle"
          defaultValue={props.note.title}
          placeholder="Enter Title"
          onChange={(event) => props.updateTitle(event.target.value, props.note.id)}
          style={noteStyle}
        />
        <img
          src={isListEnabled ? note : list}
          alt="note/list"
          style={{ height: "32px", margin: "8px" }}
          className="listToggleButton"
          onClick={handleToggleList}
        />
      </div>
      <textarea
        ref={textAreaRef}
        className="noteText"
        value={text}
        placeholder="Enter Text"
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        style={noteStyle}
        readOnly={false}
      />
      <div className="noteDelete">
        <p>{props.note.time}</p>
        <img
          src={pinned ? unpin : pin}
          alt="pin"
          style={{ height: "35px", marginLeft: "0", opacity: pinned ? 1 : "" }}
          onClick={handleTogglePin}
        />
        <img src={deleteIcon} alt="delete" onClick={() => props.deleteNote(props.note.id)} />
      </div>
    </div>
  );
};
