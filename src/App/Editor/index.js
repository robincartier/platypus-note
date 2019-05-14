import React from "react";
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
        <Box onClick={props.onClick}>
            { (props.isSelected) ?
                <TextArea value={props.value} fill onChange={props.onChange} plain resize={false}/> :
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
                "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_"],
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
        <Box
            flex
            elevation='small'
        >
            <Box
                align="center"
            >
                <p>Editor</p>
            </Box>
            <Box
                direction='column'
                flex
                overflow={{ horizontal: "hidden", vertical: "scroll" }}
                align="left"
                height="small"
                pad="medium"
                // border={{ size: "medium", style: "solid" }}
            >
                <InputEditor/>
            </Box>
        </Box>
    );
}

export default Editor;
