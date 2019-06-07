export const ADD_PARAGRAPH = "ADD_PARAGRAPH";
export const SET_PARAGRAPH = "SET_PARAGRAPH";
export const DELETE_PARAGRAPH = "DELETE_PARAGRAPH";

export const addParagraph = (index) => ({
    type: ADD_PARAGRAPH,
    index,
});

export const setParagraph = (index, text) => ({
    type: SET_PARAGRAPH,
    index,
    text,
});

export const deleteParagraph = (index) => ({
    type: DELETE_PARAGRAPH,
    index
});