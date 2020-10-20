import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './EditarMenu.css';

const EditarMenu = ()=> {

    return(

        <Fragment>
            <div className="mainContainer">
                <div className="top-container">
                    <div className="top-container-item izq">
                        <a className="atras izq" href="/">
                            <h6 className="izq">← Atras</h6>
                        </a>
                        <h6 className="izq">| Menú</h6>
                    </div>
                    
                    <div className="top-container-item der">
                        <Link to='/panel/Menu/EditarMenu/AgregarProducto'>
                            <button  className="btn btn-success der">Agregar producto</button>
                        </Link>
                    </div>
                </div>
                <div className="container tabla">
                    <Tabla/>
                </div>
            </div>
        </Fragment>
    );
}

function Tabla() {
    return(
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Tostitos</td>
                <td>$12.00</td>
                <td>Papitas</td>
                <td>
                    <button className="btn btn-info mr">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                </td>
                </tr>
                <tr>
                <td>baiabaia</td>
                <td>$0.50</td>
                <td>Basura</td>
                <td>
                    <button className="btn btn-info mr">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                </td>
                </tr>
                <tr>
                <td>Tamal de carne</td>
                <td>$15.00</td>
                <td>Comida</td>
                <td>
                    <button className="btn btn-info mr">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EditarMenu;