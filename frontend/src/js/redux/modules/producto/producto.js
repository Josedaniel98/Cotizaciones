import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "producto",
    "producto",
    "productoForm",
    "/producto",
);

export default handleActions(reducers, initialState);
