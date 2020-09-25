import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderNumber} from '../Utils/renderField';

const ProductoForm = (props) => {
    const { handleSubmit, actualizar, ver } = props;
    return(
        <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <Field component={renderField} name='nombre' disabled={ver}/>
            <br /><br />
            <label>Descripcion</label>
            <Field component={renderField} name='descripcion' disabled={ver}/>
            <br /><br />
            <label>Precio (Q)</label>
            <Field component={renderNumber} name='precio' disabled={ver}/>

            <br /><br />
            {!ver &&
            <button
                type="submit"
                className='btn btn-primary btn-sm'
            >
                {actualizar ? 'Actualizar Producto' : 'Registrar Producto'}
            </button>
            }
            <a
                className='btn btn-secondary btn-sm ml-2'
                href='/#/producto'
            >
                Cancelar
            </a>
        </form>
    )
}

export default reduxForm({
    form: 'productoForm', // a unique identifier for this form    
})(ProductoForm);