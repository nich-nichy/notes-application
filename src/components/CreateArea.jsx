import React, { useState } from "react";
import { Plus } from 'lucide-react'

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    const newNote = { ...note, id: Date.now() };
    props.onAdd(newNote);
    setNote({
      title: "",
      content: ""
    });
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitNote}>
          <Plus />
        </button>

      </form>
    </div>
  );
}

export default CreateArea;
