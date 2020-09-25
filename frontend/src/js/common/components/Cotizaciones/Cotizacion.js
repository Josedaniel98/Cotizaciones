import React, {Component} from 'react';
import Formulario from './Form';
import Grid from "../Utils/Grid";


class Cotizacion extends Component{
  
    render(){
        
        const { getProductos, crear,total,registrarCotizacion, producto,handleChangeProducto,agregarProducto, value } = this.props;
        const funcionEnvio = crear;
        return(
            <div className='d-flex flex-column w-100'>
                <h3>Crear Cotizacion</h3>              
        
                <Formulario 
                    onSubmit={funcionEnvio}
                    getProductos={getProductos}
                    handleChangeProducto={handleChangeProducto}
                    value={value}
                    agregarProducto={agregarProducto}
                    producto={producto}
                    total={total}
                    registrarCotizacion={registrarCotizacion}
                />
                
            </div>            
        )
    }
}
export default Cotizacion;