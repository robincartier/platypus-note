import React from "react";
import "./Editor.css";
import marked from "marked";

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

function Line(props) {
    return (
        <React.Fragment>
            <div onClick={props.onClick}>
                {props.value}
            </div>
        </React.Fragment>
    );
}
class InputEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: ["test", "test2"],
            editedLine: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(i) {
        this.setState({editedLine: i});
        // this.setState({lines: l});
        return;
    }

    handleChange(event) {
        const lines = this.state.lines;
        const i = event.target.id;
        lines[i] = event.target.value;
        this.setState({lignes: lines});
    }

    preRender() {
        return this.state.lines.map((line, i) => {
            const v = (this.state.editedLine === i)
                ? <input value={line} id={i} onChange={this.handleChange}/>
                : <div dangerouslySetInnerHTML={{ __html: marked(line) }} />;
            console.log(marked(line));
            return (
                <Line
                    key={i}
                    value={v}
                    onClick={() => this.handleClick(i)}
                />
            );
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
