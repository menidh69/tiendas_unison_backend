import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Component } from 'react';
import { render } from '@testing-library/react';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ModalPagar from './ModalPagar';
import { UserContext } from '../../UserContext'


import {Modal, Button} from 'react-bootstrap';
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



toast.configure();
const Carrito = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const [ID, setIDStripe] = useState();
    const [productos, setProductos] = useState()
   
    

        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="container">
                            <h2>Carrito de compras</h2>
                            <div className="container mt-4">
                                <Tabla setIDStripe={setIDStripe} handleShow={handleShow} setProductos={setProductos} productos={productos}/>
                            </div>
                            <ModalPagar show={show} handleClose={handleClose} setProductos={setProductos} productos={productos} handleShow={handleShow} id_stripe={ID}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

    }


function Tabla (props) {

    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [variasTiendas, setVariasTiendas] = useState(false)
    const handleClose = () => setVariasTiendas(false)
    const handleShow = () => setVariasTiendas(true);

    useEffect(() =>{
        let isMounted = true;
        if(isMounted){
            fetchitems()
            .then(json=>{
                let arrayTiendas = []
                console.log(json)
                //Obtiene las diferentes tiendas de los items
                json.map(item=>{
                    if(!arrayTiendas.includes(item.producto.id_tienda)){
                        arrayTiendas.push(item.producto.id_tienda)
                    }
                })
                if(arrayTiendas.length>1){
                    setVariasTiendas(true);
                }
                // //Iteracion sobre tiendas y sementa los productos por tienda
                // arrayTiendas.map(tienda=>{
                //     let total = 0;
                //     let productArray = []
                //     let id_stripe= ""
                //     let nombre_tienda= ""
                //     json.carrito_items.map(async item=>{
                //         if(item.producto.id_tienda == tienda){
                //             nombre_tienda = item.producto.tienda.nombre
                //             id_stripe = item.producto.tienda.info_stripes[0].id_stripe
                //             productArray.push(item);
                //             total += (item.producto.precio*item.cantidad)
                //         }
                //     })
                //     carritoArray.push({id_tienda: tienda, nombre: nombre_tienda, id_stripe: id_stripe, total: total, productos: productArray})
                // })
                // console.log(carritoArray)
                props.setProductos(json)
                console.log(json)
            })  
        }
        return ()=> isMounted=false;
        
    },[]);

    const handleDelete = (id)=>{
        props.setProductos(props.productos.filter(item => item.id !== id));
    }
    
    const fetchitems = async ()=>{
        const data = await fetch(`http://localhost:5000/api/v1/carrito/payment/${user.id}`)
        const json = await data.json();
        return json.result[0].carrito_items;
    }
    
function handleClick(productos){
    let total=0;
    // productos.productos.map(p=>{
    //     total += p.cantidad*p.producto.precio
    // })
    // props.setProductos(productos.productos);
    // props.setIDStripe(productos.id_stripe);
    // props.setTotal(total)
    props.handleShow();
}
const calculaTotal = ()=>{
    let total = 0
    props.productos.map(item=>{
        total += item.producto.precio * item.cantidad
    })
    return total
}
    

        return(
            <Fragment>
                {props.productos ? 
                <Fragment>
                <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Tienda</th>
                                <th scope="col">Total</th>
                                <th scope="col">•</th>
                                </tr>
                            </thead>
                            <tbody>
                
                                {props.productos.map(item =>(
                                <tr key={item.producto.id}>
                                    <td scope="row">{item.producto.nombre}</td>
                                    <td>${Number.parseFloat(item.producto.precio).toFixed(2)}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{item.producto.tienda.nombre}</td>
                                    <td>${Number.parseFloat(item.producto.precio*item.cantidad).toFixed(2)}</td>
                                    <td><Eliminar handleDelete={handleDelete} item={item}/></td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                    <hr/>
                            <div><h5>Total a pagar: ${Number.parseFloat(calculaTotal()).toFixed(2)}</h5></div>
                            <div className= "container">

                            </div>
                            <div>
                          <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>handleClick()}>Pagar</button>
                        </div>
                
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
                        : <h4>Aun no a agregado nada al carrito.</h4>
                    }
            </Fragment>
        );
    } 

async function handleToken(token)  {
  //console.log(token,  addresses);

}



function Eliminar (props){

    return(
        <Fragment>
            <a href={"#eliminar" + props.item.id} role="button" className="btn btn-danger btn-sm" data-toggle="modal">
               Eliminar
            </a>
            <ModalDelete handleDelete={props.handleDelete} item={props.item}></ModalDelete>

        </Fragment>

    );

}


function ModalDelete(props){




    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`http://localhost:5000/api/v1/eliminarCarritoItem/${props.item.id}`, {
            method: "DELETE"
        });
        props.handleDelete(props.item.id);
    }

    return(
        <div id={"eliminar" + props.item.id} className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">¿Estás seguro?</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>¿Seguro que quieres quitar {props.item.nombre} del carrito?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={eliminarClick}>Quitar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
