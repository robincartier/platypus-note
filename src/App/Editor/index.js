import React, {useState, useEffect} from "react";
import { Box, Markdown, TextArea, Text} from "grommet";
import "./Editor.css";
import marked from "marked";
import styled from "styled-components";

// marked.setOptions({
//     renderer: new marked.Renderer(),
//     pedantic: false,
//     gfm: true,
//     tables: true,
//     breaks: false,
//     sanitize: false,
//     smartLists: true,
//     smartypants: false,
//     xhtml: false
// });

const StyledPre = styled.pre`
  background-color: #7d4cdb;
`;

function Paragraph(props) {
    return (
        // TODO: box with the size of the MD Text inside
        <Box onClick={props.onClick}
            // height={props.height ? props.height + "px" : "auto"}
        >
            { (props.isSelected) ?
                <TextArea value={props.value} onChange={props.onChange} onBlur={props.onBlur} fill={true} plain resize={false}/> :
                <Markdown components={{ pre: StyledPre }} >{props.value}</Markdown>
            }
        </Box>
    );
}
class InputEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: ["# Et bona frustra meritis\n## Dentes in tellure",
                "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
                "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_",
                "# Et bona frustra meritis\n## Dentes in tellure",
                "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
                "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_"],
            editedLine: null,
            heights: []
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        const lines = this.state.lines;
        const i = this.state.editedLine;
        lines[i] = event.target.value;
        this.setState({lignes: lines});
    }

    onBlur() {
        console.log("blur");
        this.setState({editedLine: null});
    }

    onClick(event, i) {
        if (this.state.editedLine === i) return;
        const heights = this.state.heights;
        heights[i] = event.currentTarget.offsetHeight;
        this.setState({editedLine: i, heights: heights});
    }

    preRender() {
        return this.state.lines.map((line, i) => {
            return <Paragraph
                onClick={(event) => this.onClick(event, i)}
                onChange={this.onChange}
                onBlur={this.onBlur}
                key={i}
                value={line}
                height={this.state.heights[i]}
                isSelected = {this.state.editedLine === i}
            />;
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="Editor-content">
                    {this.preRender()}
                </div>
            </React.Fragment>
        );
    }
}

function Editor() {
    return (
        <React.Fragment>
            <div className="Editor">
                <div className="Editor-title">
                    <p>Editor</p>
                </div>
                <InputEditor/>
            </div>
        </React.Fragment>
    );
}

export default Editor;
