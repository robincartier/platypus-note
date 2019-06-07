import { connect } from "react-redux";
import Editor from "../components/Editor";
import { addParagraph, setParagraph, deleteParagraph } from "actions";


const mapStateToProps = state => {
    return {
        paragraphs: state.paragraphs,
        editedLine: state.editedLine,
        editedLineHeight: state.editedLineHeight,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addParagraph: (index) => dispatch(addParagraph(index)),
        setParagraph: (index, text) => dispatch(setParagraph(index, text)),
        deleteParagraph: (index) => dispatch(deleteParagraph(index)),
    };
};

const InputEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);

export default InputEditor;