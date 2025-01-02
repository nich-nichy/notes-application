import { Trash } from "lucide-react";
import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note" key={props.id}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}><Trash /></button>
    </div>
  );
}



export default Note;
