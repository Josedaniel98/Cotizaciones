import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = 'SET_DATA';
const SET_LOADER = 'SET_LOADER';
const SET_PAGE = 'SET_PAGE';
const SET_PROMEDIO_NO= 'SET_PROMEDIO_NO'
const SET_TOP='SET_TOP'

const listar = ( page = 1) => (dispatch) => {

    dispatch({type: SET_LOADER, loader: true});
    const params = { page }

    api.get('cotizacion/total_usuarios').then((response)=>{
 
        dispatch({type: SET_DATA, data: response.data})
    })
    api.get('cotizacion/total_numero').then((response)=>{

        dispatch({type: SET_PROMEDIO_NO, promedio : response.data})
    })
    api.get('historial/top_producto').then((response)=>{

        dispatch({type: SET_TOP, top : response.data})
    })
    .catch(() => {
    }).finally(()=>{
        dispatch({type: SET_LOADER, loader: false});
    });
   
};

export const actions = {

    listar,

};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PROMEDIO_NO]: (state, { promedio }) => {
        return {
            ...state,
            promedio,
        };
    },
    [SET_TOP]: (state, { top }) => {
        return {
            ...state,
            top,
        };
    },
    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
 
};

export const initialState = {
    loader: false,
    data: [],
    page: 1,
    promedio:0,
    top:[]
};

export default handleActions(reducers, initialState);
