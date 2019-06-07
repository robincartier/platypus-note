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

const Markdown = (props) => {
    return <div dangerouslySetInnerHTML={{__html: marked(props.value)}} className="Editor-markdown" />;
};

const Paragraph = (props) => {
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
};

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedLine: null,
            editedLineHeight: null
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onClick(event, i) {
        if (this.state.editedLine === i) return;
        const height = event.currentTarget.offsetHeight;
        this.setState({editedLine: i, editedLineHeight: height});
    }

    onChange(event) {
        // this.setState({editedLineHeight: null});
        this.props.setParagraph(this.state.editedLine, event.target.value);

        // if two consecutive linebreaks at the end, go to new value
        if (event.target.value.match(/\S*\n\n$/g)) {
            this.props.addParagraph(this.state.editedLine + 1);
            // TODO: deal with size of new line !!
            this.setState({editedLine: this.state.editedLine + 1, editedLineHeight: null});
        }
        // if two consecutive linebreaks at the beginning, go to new value
        if (event.target.value.match(/^\n\n\S*/g)) {
            this.props.addParagraph(this.state.editedLine);
            // TODO: deal with size of new line !!
            this.setState({editedLine: this.state.editedLine, editedLineHeight: null});
        }
    }

    onBlur() {
        this.setState({editedLine: null});
        this.checkInput(this.props.paragraphs, this.state.editedLine);
    }

    onKeyPress(event) {
        // Shift + Enter --> blur
        if(event.key === "Enter" && event.shiftKey){
            this.onBlur();
            return;
        }
        // Ctrl + Enter --> go to new value
        if(event.key === "Enter" && event.ctrlKey){
            this.props.addParagraph(this.state.editedLine + 1);
            // TODO: deal with size of new line !!
            this.setState({editedLine: this.state.editedLine + 1, editedLineHeight: null});
        }
    }

    checkInput(textArray, index) {
        // delete empty content
        if (!textArray[index] || textArray[index].match(/^\s+$/g)) {
            this.props.deleteParagraph(index);
            return;
        }
        // clean empty lines
        const cleanText = textArray[index].replace(/\s+$/gm, "");
        if (cleanText)  this.props.setParagraph(index, cleanText);
    }

    render() {
        return (
            <React.Fragment>
                <div className="Editor">
                    <div className="Editor-title">
                        <p>Editor</p>
                    </div>
                    <div className="Editor-content">
                        {this.props.paragraphs.map((paragraph, i) => {
                            return <Paragraph
                                onClick={(event) => this.onClick(event, i)}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                onKeyPress={this.onKeyPress}
                                key={i}
                                value={paragraph}
                                height= {(this.state.editedLine === i) ? this.state.editedLineHeight : "auto" }
                                isSelected = {this.state.editedLine === i}
                            />;})
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Editor;
