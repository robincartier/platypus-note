import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import Editor from "../components/Editor";
import { addParagraph, setParagraph, deleteParagraph } from "actions";


const mapStateToProps = state => {
    return {
        paragraphs: state.paragraphs.present,
        canUndo: state.paragraphs.past.length > 0,
        canRedo: state.paragraphs.future.length > 0,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addParagraph: (index) => dispatch(addParagraph(index)),
        setParagraph: (index, text) => dispatch(setParagraph(index, text)),
        deleteParagraph: (index) => dispatch(deleteParagraph(index)),
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    };
};

const InputEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);

export default InputEditor;