import React, { useState } from "react";
import { NoteArea } from "../Note/noteArea";
import "../NoteContainer/noteContainer.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import moon from "../../assets/moon.png";

export const NoteContainer = (props) => {
  const reverArray = (arr) => {
    const pinnedNotes = arr.filter((note) => note.pinned);
    const unpinnedNotes = arr.filter((note) => !note.pinned);
    const sortedNotes = [...unpinnedNotes, ...pinnedNotes];

    return sortedNotes.reverse();
  };

  const notes = reverArray(props.notes);
  const [search, setSearch] = useState("");

  const togglePin = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, pinned: !note.pinned };
      }
      return note;
    });

    props.setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="noteContainer">
      <h1>NotesMemo</h1>
      <Button
        variant={props.mode ? "light" : "outline-dark"}
        onClick={() =>
          props.handleMode((previousDarkMode) => !previousDarkMode)
        }
      >
        <img src={moon} style={{ height: "30px" }} alt="moon" />
      </Button>
      <input
        type="text"
        placeholder="type to search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="notes">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((item) => (
            <NoteArea
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
              updateTitle={props.updateTitle}
              mode={props.mode}
              pinNote={togglePin}
              title={props.title}
            />
          ))
        ) : (
          <h3>No matching notes found</h3>
        )}
      </div>
    </div>
  );
};
