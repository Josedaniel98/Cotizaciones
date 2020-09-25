import React, {Component} from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListCotizacion extends Component{
    componentWillMount = () => {
        this.props.listar();
    }   

    render(){
        const {data, loader, onPageChange, onSortChange} = this.props;

        return(
            <div className='d-flex flex-column w-100'>
                <h3>Cotizaciones</h3>
                <a 
                    className='btn btn-primary btn-sm w-25'
                    href='/#/cotizacion/create'
                >
                    Crear Cotizacion
                </a>

                <Grid 
                    data={data} 
                    loading={loader} 
                    onPageChange={onPageChange}
                    onSortChange={onSortChange} 
                >
                    <TableHeaderColumn
                        isKey
                        dataField="usuario"
                        dataSort
                        dataFormat={(cell) => {
                            return cell.label;
                        }}
                    >
                        Usuario
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="total"
                        dataSort
                    >
                        Total (Q)
                    </TableHeaderColumn>
                                   
                </Grid>
            </div>            
        )
    }
}

export default ListCotizacion;