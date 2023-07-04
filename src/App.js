import "./App.css";
import { useState, useEffect } from "react";
import { NoteContainer } from "./Components/NoteContainer/noteContainer";
import { ColorBar } from "./Components/sideColorBar/colorBar";

function App() {
  const storedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
  const [notes, setNotes] = useState(storedNotes.map(note => ({
    ...note,
    title: ""
  })));

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const addNote = (color) => {
    const tempNotes = [
      ...notes,
      {
        id: Date.now() + "" + Math.floor(Math.random() * 7),
        text: "",
        time: formattedDate + " " + formattedTime,
        color,
        pinned: false,
        title: "",
      },
    ];
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = notes.filter((item) => item.id !== id);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  const updateTitle = (title, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].title = title;
    setNotes(tempNotes);
  };

  const [mode, setMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", mode);
  }, [mode]);

  return (
    <div className={`App ${mode ? "dark-mode" : ""}`}>
      <ColorBar addNote={addNote} mode={mode} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
        updateTitle={updateTitle}
        mode={mode}
        handleMode={setMode}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
