import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { Component } from 'react';
import { render } from '@testing-library/react';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ModalPagar from './ModalPagar';
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



toast.configure();
const Carrito = ()=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [secret, setSecret] = useState();

    const loadSecret = async()=>{
        const data = await fetch("http://localhost:5000/api/v1/nuevaOrden")
        const json = await data.json()
        setSecret(json.secret);
        handleShow();
    }

    

        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="container">
                            <h2>Carrito de compras</h2>
                            <div className="container mt-4">
                                <Tabla handleShow={handleShow}/>
                            </div>
                            <ModalPagar show={show} handleClose={handleClose} handleShow={handleShow} secret={secret}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

    }


function Tabla (props) {

    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [tiendas, setTiendas] = useState([]);

    useEffect(() =>{
        let isMounted = true;
        if(isMounted){
            fetchitems()
            .then(json=>{
                setItems(json.items);
                setTiendas(json.tiendas)
                console.log(json)
            })
            
        }
        return ()=> isMounted=false;
        
    },[]);

    const handleDelete = (id)=>{
        setItems(items.filter(item => item.id !== id));
    }

    async function arrangeProductos(items){
        let arrayTiendas = [];
        let objectTiendas = [];
        items.map(async item=>{
            if(!arrayTiendas.includes(item.id_tienda)){
                arrayTiendas.push(item.id_tienda)
            }
        })
        arrayTiendas.map(async tienda=>{
            let productArray = []
            items.map(async item=>{
                if(item.id_tienda == tienda){
                    productArray.push(item);
                }
            })
            const account = await fetch(`http://localhost:5000/api/v1/stripeInfo/${tienda}`)
            objectTiendas.push({id: tienda, id_stripe: account.id_stripe, productos: productArray})
        })
        return objectTiendas;
    }

    

    

    const fetchitems = async () => {
        const data = await fetch (`http://localhost:5000/api/v1/carrito/${user.id}`);
        const items = await data.json();
        const data2 = await fetch (`http://localhost:5000/api/v1/carritoItem/${items[0].id}`);
        const items2 = await data2.json();
        console.log(items2[0])
        const arrayTiendas = arrangeProductos(items2[0]);
        const json = {
            items: items2[0],
            tiendas: arrayTiendas
        }
        if (items2 == null) {
            return null
        } else {
            return json
        }
    }
    var total = 0;

    const orden = async (id)=>  {
     console.log("entro");
     //console.log(item);
     const body = items;
     try{

           const response = fetch(`http://localhost:5000/api/v1/NuevaOrden/${user.id}`,
           {
               method: "POST",
               headers: {"Content-Type":"application/json"},
               body: JSON.stringify(body)
           });
     }catch(err){
         console.error(err)
     }
   }


    if (items.length > 0) {
        items.map(item => (
            total += (item.precio*item.cantidad)
        ));
        return(
            <Fragment>

                <h4>Tienda {items.tienda_nombre}</h4>
                <table class="table">
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
                        {items.map(item =>(
                        <tr>
                            <td scope="row">{item.nombre}</td>
                            <td>${Number.parseFloat(item.precio).toFixed(2)}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.tienda_nombre}</td>
                            <td>${Number.parseFloat(item.precio*item.cantidad).toFixed(2)}</td>
                            <td><Eliminar handleDelete={handleDelete} item={item}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <hr/>
                        <div><h5>Total a pagar: ${Number.parseFloat(total).toFixed(2)}</h5></div>
                        <div class = "container">
                          {/* <StripeCheckout
                            stripeKey="pk_test_51HoJ01K9hN8J4SbUqEiL2Amsb8RleP8IsJYQndlu4PcDJ1vVRC7dCX2wOKvO1WSGQ0NCvxejBlDxiFVjb6mippAO00wL2DOUxs"
                            token={handleToken}
                            amount = {Number.parseFloat(total).toFixed(2) * 100}
                            name = 'Compra'
                            /> */}
                        </div>
                        <div>
                          <button type="button" class="btn btn-success" data-dismiss="modal" onClick={props.handleShow}>Pagar</button>
                        </div>
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
async function handleToken(token)  {
  //console.log(token,  addresses);

}
 function ordenk(item)  {
  //const {user, setUser} = useContext(UserContext);

  console.log("entro");
  console.log(item);
  const body = item;
  try{

        const response = fetch(`http://localhost:5000/api/v1/ordenNueva`,
        {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        });
  }catch(err){
      console.error(err)
  }
}


function Eliminar (props){

    return(
        <Fragment>
            <a href={"#eliminar" + props.item.id} role="button" className="btn btn-danger" data-toggle="modal">
                Quitar
            </a>
            <Modal handleDelete={props.handleDelete} item={props.item}></Modal>

        </Fragment>

    );

}


function Modal(props){




    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`http://localhost:5000/api/v1/eliminarCarritoItem/${props.item.id}`, {
            method: "DELETE"
        });
        props.handleDelete(props.item.id);
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
