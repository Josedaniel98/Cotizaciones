import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderNumber} from '../Utils/renderField';
import {AsyncSelectField} from '../Utils/renderField/renderField';
import Grid from "../Utils/Grid";

const CotizacionForm = (props) => {
    const { handleSubmit, getProductos,producto,total,registrarCotizacion, handleChangeProducto,agregarProducto, value } = props;
    return(
        <React.Fragment>
           
            <form onSubmit={handleSubmit}>
                <label>Productos</label>
                <Field
                    name="productos"
                    type="text"
                    placeholder="Seleccionar producto"
                    loadOptions={getProductos}
                    component={AsyncSelectField}
                    onChange={handleChangeProducto}
                    value={value}
                            />
        
                <button
                    type="button"
                    className='btn btn-primary btn-sm'
                    onClick={e => agregarProducto()}
                >
                    Agregar producto
                </button>
                <br /><br />
                
                <button
                    type="button"
                    className='btn btn-primary btn-sm'
                    onClick={e=> registrarCotizacion()}
                >
                    Guardar cotizacion
                </button>
                
                <a
                    className='btn btn-secondary btn-sm ml-2'
                    href='/#/cotizacion'
                >
                    Cancelar
                </a>
                <h5>Total: Q.{total}</h5>
                 <table class="table">
                       <thead>
                           <tr>
                           <th scope="col">Producto</th>
                           <th scope="col">Precio (Q)</th>
                           </tr>
                       </thead>
                       <tbody>
                       {
                        producto
                            ? producto.map(producto => (
                               
                                <tr>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                </tr>
                            ))
                            : console.log('No tiene data')
                    }
                           
                       </tbody>
                       </table>
                
            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'cotizacionForm', // a unique identifier for this form    
})(CotizacionForm);