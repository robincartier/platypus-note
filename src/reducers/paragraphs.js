/* eslint-disable indent */
import { ADD_PARAGRAPH, SET_PARAGRAPH, DELETE_PARAGRAPH } from "actions";

const defaultText = ["# Et bona frustra meritis\n## Dentes in tellure",
    "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
    "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_",
    "# Et bona frustra meritis\n## Dentes in tellure",
    "Lorem markdownum *dato*; docti *grege cognoscendus* ullum. Et hic, mirabere\nvero; accipe mente, quod nil. Precibusque patris leniat iniqua exsultantemque\n> Inque et coruscant quae potentia adventum **leves**, mens caecae, collabitur.\n> Nomenque potentia orbis, et sumus praecordiaque haud.", "__test__\n\ntest\n\naaaaaa", "test2", "test", "test2", "test", "test2", "test", "test2",
    "1. Clangore silva epota neque labitur\n2. Modo malis\n3. Cupidine peti undis Xanthos parum", "_test2_"];

const paragraphs = (state = defaultText, action) => {
    switch (action.type) {
        case SET_PARAGRAPH:
            return [
                ...state.slice(0, action.index),
                action.text,
                ...state.slice(action.index + 1),
            ];
        case ADD_PARAGRAPH:
            return [
                ...state.slice(0, action.index),
                "",
                ...state.slice(action.index),
            ];
        case DELETE_PARAGRAPH:
                return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1),
                ];
        default:
            return state;
    }
};

export default paragraphs;