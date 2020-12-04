import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Component } from 'react';
import { render } from '@testing-library/react';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { UserContext } from '../../UserContext'


import {Modal, Button} from 'react-bootstrap';



const Pedidos = ()=>{


        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="container">
                            <h2>Pedidos pendientes</h2>
                            <div className="container mt-4">
                                <Tabla/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

}


function Tabla () {

    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [variasTiendas, setVariasTiendas] = useState(false)
    const handleClose = () => setVariasTiendas(false)
    const handleShow = () => setVariasTiendas(true);

    useEffect(() =>{
        fetchitems()
    });
    
    const fetchitems = async ()=>{
        const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/pedidos/${user.id}`)
        const json = await data.json();
        // console.log(json.result)
        setItems(json.result)
        console.log(items)
    }
    

    

        return(
            <Fragment>
                <Fragment>
                <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Productos / Cantidad</th>
                                <th scope="col">Nombre de cliente</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => 
                                    <tr className="fjcc">
                                        {item.orden_items.map(orden => 
                                        <div>
                                            <td className="fjcc2">{orden.producto.nombre}</td>
                                            <td className="fjcc2">{orden.cantidad}</td>
                                        </div>
                                        )}
                                        <td>{item.usuario.nombre}</td>
                                        <td>{item.fecha}</td>
                                        <td><Entregar orden={item} /></td>
                                    </tr>
                            )}
                            </tbody>
                    </table>
                    <hr/>
                            
                
                        <Modal show={variasTiendas} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Aviso</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Has agregado productos de tiendas distintas, 
                                    por lo que se generará una orden por cada 
                                    tienda cuando realices la compra.
                                </p>

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            
                            </Modal.Footer>
                        </Modal>
                        </Fragment>
            </Fragment>
        );
} 

async function handleToken(token)  {
  //console.log(token,  addresses);

}



function Entregar (props){

    return(
        <Fragment>
            <a href={"#eliminar" + props.orden.id} role="button" className="btn btn-info btn-sm" data-toggle="modal">
               Entregar
            </a>
            <ModalDelete orden={props.orden}></ModalDelete>

        </Fragment>

    );

}


function ModalDelete(props){




    const eliminarClick = async() => {
        const response = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/entregar/${props.orden.id}`, {
            method: "PUT"
        });
        
    }

    return(
        <div id={"eliminar" + props.orden.id} className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmación de entrega de pedido</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Entregar pedido al cliente: {props.orden.usuario.nombre} {props.orden.id}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-success" data-dismiss="modal"  onClick={eliminarClick}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pedidos;
