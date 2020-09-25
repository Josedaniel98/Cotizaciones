import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = 'SET_DATA';
const SET_LOADER = 'SET_LOADER';
const SET_PAGE = 'SET_PAGE';
const SET_PRODUCTO='SET_PRODUCTO';
const SET_TOTAL='SET_TOTAL';

export const setProducto = producto => ({
    type: SET_PRODUCTO,
    producto,
});
export const setTotal= total=>({
    type: SET_TOTAL,
    total,
})

const listar = ( page = 1) => (dispatch) => {

    dispatch({type: SET_LOADER, loader: true});
    const params = { page }
  
    api.get('cotizacion', params).then((response)=>{

        dispatch({type: SET_DATA, data: response});
        dispatch({type: SET_PAGE, page: page});
    }).catch(() => {
    }).finally(()=>{
        dispatch({type: SET_LOADER, loader: false});
    });
   
};

const getProductos = (search) =>()=> {
    const productos = [];
    return api.get('producto', {search}).then((response) => {
        if (response) {
            response.results.forEach((producto) => {
                productos.push({
                    value: producto.id, 
                    label: producto.nombre,
                    precio: producto.precio
                });
            });
        }
        return productos
    }).catch(() => {
        return [];
    });
};
const handleChangeProducto = id =>(dispatch, getStore)=>{

    api.get(`producto/${id.value}`).then((response)=>{
        console.log(response.nombre)

        return response
    }).catch(() => {
        return [];
    });
}
const registrarCotizacion = () => (dispatch, getStore) =>{
    const  usuario  = getStore().login.me.id;
    const { producto } = getStore().cotizacion;
    const total = getStore().cotizacion.total;
    console.log(producto)
    let pro=[]   
    producto.forEach((item)=>{
        pro.push(
            item.id
        )
    })
    const data ={
        usuario:usuario,
        total: total,
        productos: pro
    }
    console.log("datos registro", data)
    api.post('cotizacion', data).then((response) => {
        NotificationManager.success('Cotizacion registrada correctamente', 'Éxito', 1000);
        dispatch(push("/cotizacion"));
    }).catch((error) => {
        console.log(error);
        NotificationManager.error('error', 'ERROR', 0);
    }).finally(() => {

    });
}

const agregarProducto = () => (dispatch, getStore) => {
    const { values } = getStore().form.cotizacionForm;
    const { producto } = getStore().cotizacion;
    const newForm = {
        ...values,
        id:"",
        nombre: "",
        precio: "",
    };
    const nuevoProducto = [{  
        id: values.productos.value,
        nombre: values.productos.label, 
        precio: values.productos.precio }, 
        ...producto];
    dispatch(setProducto(nuevoProducto));
    var total=0;
    nuevoProducto.forEach((item)=>{ 
        total=total + item.precio
    })
    dispatch(setTotal(total))
    dispatch(initializeForm('cotizacionForm', newForm));
    console.log("productos", nuevoProducto)
};
export const actions = {

    listar,
    getProductos,
    handleChangeProducto,
    agregarProducto,
    setTotal,
    registrarCotizacion,
};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },

    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_TOTAL]: (state, {total }) => {
        return {
            ...state,
            total,
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
    data: {},
    page: 1,
    producto:[],
    total: 0,
};

export default handleActions(reducers, initialState);
