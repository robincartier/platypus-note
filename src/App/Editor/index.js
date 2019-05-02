import React from 'react';
import "./Editor.css"

class InputEditor extends React.Component {
  render() {
    return (
      <p>Type your note ...</p>
    );
  }
}

function Editor() {
  return (
    <React.Fragment>
      <div contenteditable="true">
        <InputEditor/>
      </div>
    </React.Fragment>
  );
}

export default Editor;
