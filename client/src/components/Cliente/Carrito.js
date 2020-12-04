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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faShoppingCart} from '@fortawesome/free-solid-svg-icons';


import {Modal, Button, Col, Row} from 'react-bootstrap';
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
        const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/carrito/payment/${user.id}`)
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

const styleImg={
    maxWidth: '100%',
    height: '50px',
    objectFit: 'cover'
} 

const checkoutStyle={
    backgroundColor: "#29698f"
}

const btnStyle={
    backgroundColor: "#FF9500"
}

        return(
            <Fragment>
                {props.productos ? 
                <Fragment>
                   
                    <Row>
                    <Col md={8}>
                    <h2 className="my-4">Carrito de compras</h2>
                        <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
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
                                        <tr key={item.producto.id} className="py-auto">
                                            <td scope="row">{item.producto.url_imagen ? 
                                            <img src={item.producto.url_imagen} style={styleImg}></img>
                                            :
                                            <img src="https://via.placeholder.com/300" style={styleImg}></img>
                                            }</td>
                                                <td>{item.producto.nombre}</td>
                                            <td className="my-auto py-auto">${Number.parseFloat(item.producto.precio).toFixed(2)}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{item.producto.tienda.nombre}</td>
                                            <td>${Number.parseFloat(item.producto.precio*item.cantidad).toFixed(2)}</td>
                                            <td><Eliminar handleDelete={handleDelete} item={item}/></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table>
                            </Col>

                    
                            <Col md={4} className="rounded" style={checkoutStyle}>
                            <div className= " px-2 container text-light text-left">
                            <h2 className="my-4 text-center">Checkout <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></h2>
                            <div><h5>Subtotal: </h5>
                            <h6>${Number.parseFloat(calculaTotal()).toFixed(2)}</h6>
                            </div>
                            <div><h5>Comisiones: </h5>
                                <h6>$12</h6>
                                </div>
                            <div><h5>Total a pagar: </h5>
                                <h6>${Number.parseFloat(calculaTotal()+12).toFixed(2)}</h6></div>
                            
                            </div>
                            <div>
                          <button type="button" className="btn btn-lg rounded-pill text-light my-4" style={btnStyle} data-dismiss="modal" onClick={()=>handleClick()}>Pagar</button>
                        </div>
                        </Col>
                        </Row>
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
               <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </a>
            <ModalDelete handleDelete={props.handleDelete} item={props.item}></ModalDelete>

        </Fragment>

    );

}


function ModalDelete(props){




    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/eliminarCarritoItem/${props.item.id}`, {
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
