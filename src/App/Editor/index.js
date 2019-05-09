import React from "react";
import { Box, Markdown, TextArea, Text} from "grommet";
import "./Editor.css";
import marked from "marked";
import styled from "styled-components";

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

const StyledPre = styled.pre`
  background-color: #7d4cdb;
`;

function Paragraph(props) {
    return (
        <Box onClick={props.onClick}>
            { (props.isSelected) ?
                <TextArea value={props.value} onChange={props.onChange} /> :
                <Markdown components={{ pre: StyledPre }} >{props.value}</Markdown>
            }
        </Box>
    );
}
class InputEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: ["test", "test2", "test\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2"],
            editedLine: null,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const lines = this.state.lines;
        const i = this.state.editedLine;
        lines[i] = event.target.value;
        this.setState({lignes: lines});
    }

    onClick(i) {
        this.setState({editedLine: i});
    }

    preRender() {
        return this.state.lines.map((line, i) => {
            return <Paragraph
                onClick={() => this.onClick(i)}
                onChange={this.onChange}
                key={i}
                value={line}
                isSelected = {this.state.editedLine === i}
            />;
        });
    }

    render() {
        return (
            <div className="editable">
                <p>Type your note ...</p>
                {this.preRender()}
            </div>
        );
    }
}

function Editor() {
    return (
        <React.Fragment>
            <p>Editor</p>
            <InputEditor/>
        </React.Fragment>
    );
}

export default Editor;
