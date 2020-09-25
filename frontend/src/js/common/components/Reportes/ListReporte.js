import React, {Component} from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";

class ListReporte extends Component{
    componentWillMount = () => {
        this.props.listar();
    }   

    render(){
        const {data,promedio} = this.props;
        return(
            <div className='d-flex flex-column w-100'>
                <h3>Reportes</h3>
                <h5>Promedio de cotizaciones: {promedio}</h5>
                <h5>Promedio de totales por usuario</h5>
            
                <table class="table">
                       <thead>
                           <tr>
                           <th scope="col">Usuario</th>
                           <th scope="col">Promedio (Q)</th>
                           </tr>
                       </thead>
                       <tbody>
                       {
                         data && data.map(item => (
                               
                                <tr>
                                <td>{item.usuario}</td>
                                <td>{item.promedio}</td>
                                </tr>
                            ))
                          
                    }
                           
                       </tbody>
                       </table>
            </div>            
        )
    }
}

export default ListReporte;