import React, {Component} from 'react';

import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListProducto extends Component{
    componentWillMount = () => {
        this.props.listar();
    }   


    render(){
        const {data, loader, onPageChange, onSortChange, eliminar} = this.props;

        return(
            <div className='d-flex flex-column w-100'>
                <h3>Productos</h3>
                <a 
                    className='btn btn-primary btn-sm w-25'
                    href='/#/producto/create'
                >
                    Agregar producto
                </a>

                <Grid 
                    data={data} 
                    loading={loader} 
                    onPageChange={onPageChange}
                    onSortChange={onSortChange} 
                >
                    <TableHeaderColumn
                        isKey
                        dataField="nombre"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="descripcion"
                        dataSort
                    >
                        Descripcion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="precio"
                        dataSort
                    >
                        Precio (Q)
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "producto", ver: "producto", eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>                    
                </Grid>
            </div>            
        )
    }
}

export default ListProducto;