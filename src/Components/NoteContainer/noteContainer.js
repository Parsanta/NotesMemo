import React from "react";
import { NoteArea } from "../Note/noteArea";
import "../NoteContainer/noteContainer.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export const NoteContainer = (props) => {
  const reverArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverArray(props.notes);

  return (
    <div className="noteContainer">
      <h1>Notes</h1>
      <Button
        variant={props.mode ? "outline-light" : "outline-dark"}
        onClick={() =>
          props.handleMode((previousDarkMode) => !previousDarkMode)
        }
      >
        CHANGE THEME
      </Button>
      <div className="notes">
        {notes?.length > 0 ? (
          notes.map((item) => (
            <NoteArea
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
              mode={props.mode}

            />
          ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
};
