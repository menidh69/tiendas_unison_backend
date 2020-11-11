import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { Component } from 'react';
import { render } from '@testing-library/react';


class Carrito extends Component {

    constructor (props) {
        super(props);
        this.state={
            name: "Carrito"
        }
    }


    render(){
        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="container">
                            <h2>Carrito de compras</h2>
                            <div className="container mt-4">
                                <Tabla/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

    }   
}

function Tabla () {

    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);

    useEffect(() =>{
        fetchitems();
    });


    const fetchitems = async () => {
        const data = await fetch (`http://localhost:5000/api/v1/carrito/${user.id}`);
        const items = await data.json();
        const data2 = await fetch (`http://localhost:5000/api/v1/carritoItem/${items[0].id}`);
        const items2 = await data2.json();
        console.log(items2[0])
        if (items2 == null) {
            console.log("hola");
        } else {
            setItems(items2[0]);

        }
    }
    var total = 0;


    if (items.length > 0) {
        items.map(item => (
            total += (item.precio*item.cantidad)
        ));
        return(
            <Fragment>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>(
                        <tr>
                            <td scope="row">{item.nombre}</td>
                            <td>${Number.parseFloat(item.precio).toFixed(2)}</td>
                            <td>{item.cantidad}</td>
                            <td>${Number.parseFloat(item.precio*item.cantidad).toFixed(2)}</td>
                            <td><Eliminar item={item}/></td>
                        </tr>  
                        ))}
                    </tbody>
                </table>
                <hr/>
                        <div><h5>Total a pagar: ${Number.parseFloat(total).toFixed(2)}</h5></div>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h4>Aun no a agregado nada al carrito.</h4>
            </Fragment>
        )
    }
}

function Eliminar (props){
        
    return(
        <Fragment>
            <a href={"#eliminar" + props.item.id} role="button" className="btn btn-danger" data-toggle="modal">
                Quitar
            </a>
            <Modal item={props.item}></Modal>
            
        </Fragment>

    );

}


function Modal(props){

    


    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`http://localhost:5000/api/v1/eliminarCarritoItem/${props.item.id}`, {
            method: "DELETE"
        });
    }

    return(
        <div id={"eliminar" + props.item.id} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">¿Estás seguro?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>¿Seguro que quieres quitar {props.item.nombre} del carrito?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"  onClick={eliminarClick}>Quitar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;