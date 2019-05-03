import React from 'react';
import "./Editor.css"

function Line(props) {
  return (
    <React.Fragment>
      <p onClick={props.onClick}>
        {props.i} : {props.value}
      </p>
    </React.Fragment>
  );
}
class InputEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: ["test", "test2"],
    };
  }

  handleClick(i) {
    alert(i);
    return;
  }

  preRender() {
    return this.state.lines.map((line, i) => {
      return (<Line
      value={line}
      i={i}
      onClick={() => this.handleClick(i)}
    />);
    });
  }
  

  render() {
    return (
      <React.Fragment>
        <p>Type your note ...</p>
        {this.preRender()}
      </React.Fragment>
    );
  }
}

function Editor() {
  return (
    <React.Fragment>
      <p>Editor</p>
      <div className="editable">
        <InputEditor/>
      </div>
    </React.Fragment>
  );
}

export default Editor;
