import React from "react";
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

function Markdown(props) {
    return <div dangerouslySetInnerHTML={{__html: marked(props.value)}} className="Editor-markdown" />;
}

function Paragraph(props) {
    return (
        <React.Fragment>
            <div  onClick={props.onClick} style={{height: props.height}} className="Editor-paragraph">
                { (props.isSelected) ?
                    <textarea value={props.value} autoFocus={true} className="Editor-input" onChange={props.onChange} onBlur={props.onBlur} onKeyPress={props.onKeyPress}/> :
                    <Markdown value={props.value}/>
                }
            </div>
        </React.Fragment>
    );
}
class InputEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: ["# Et bona frustra meritis\n## Dentes in tellure",
                "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
                "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_",
                "# Et bona frustra meritis\n## Dentes in tellure",
                "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
                "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_"],
            editedLine: null,
            editedLineHeight: null
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onClick(event, i) {
        if (this.state.editedLine === i) return;
        console.log(event.currentTarget.offsetHeight);
        const height = event.currentTarget.offsetHeight;
        this.setState({editedLine: i, editedLineHeight: height});
    }

    onChange(event) {
        const values = this.state.values.slice();
        let editedLine = this.state.editedLine;
        values[editedLine] = event.target.value;
        // if two consecutive linebreaks at the end, go to new value
        if (values[editedLine].match(/\S*\n\n$/g)) {
            values[editedLine] = values[editedLine].replace(/\n\n/g, "");
            editedLine ++;
            values.splice(editedLine, 0, "");
        }
        // if two consecutive linebreaks at the beginning, go to new value
        if (values[editedLine].match(/^\n\n\S*/g)) {
            values[editedLine] = values[editedLine].replace(/\n\n/g, "");
            values.splice(editedLine, 0, "");
        }
        this.setState({editedLine: editedLine, values: values, editedLineHeight: null});
    }

    onBlur() {
        const values = this.state.values.slice();
        const i = this.state.editedLine;
        this.checkInput(values, i);
        this.setState({editedLine: null, values: values});
    }

    onKeyPress(event) {
        // Shift + Enter --> blur
        if(event.key === "Enter" && event.shiftKey){
            this.onBlur();
            return;
        }
        // Ctrl + Enter --> go to new value
        if(event.key === "Enter" && event.ctrlKey){
            const newEditedLine = this.state.editedLine + 1;
            const values = this.state.values.slice();
            values.splice(newEditedLine, 0, "");
            // TODO: deal with size of new line !!
            this.setState({editedLine: newEditedLine, values: values, editedLineHeight: null});
        }
    }

    checkInput(values, currentIndex) {
        // delete empty content
        if (!values[currentIndex] || values[currentIndex].match(/^(\S{0}\s+\S{0})$/g)) {
            values.splice(currentIndex, 1);
        }
        // TODO: clean break at begining/end
        // return text.replace(/(\n\n)\n+/g, "\n\n");
    }

    preRender() {
        return this.state.values.map((line, i) => {
            return <Paragraph
                onClick={(event) => this.onClick(event, i)}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyPress={this.onKeyPress}
                key={i}
                value={line}
                height= {(this.state.editedLine === i) ? this.state.editedLineHeight : "auto" }
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
