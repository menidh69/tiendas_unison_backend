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


import {Tabs, Tab} from 'react-bootstrap';
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
    const [total, setTotal] = useState();
    const [tiendas, setTiendas] = useState();
    

        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="container">
                            <h2>Carrito de compras</h2>
                            <div className="container mt-4">
                                <Tabla setTotal={setTotal} setIDStripe={setIDStripe} handleShow={handleShow} setProductos={setProductos}/>
                            </div>
                            <ModalPagar show={show} handleClose={handleClose} productos={productos} total={total} handleShow={handleShow} id_stripe={ID}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

    }


function Tabla (props) {

    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [tiendas, setTiendas] = useState();
    const [key, setKey] = useState()

    useEffect(() =>{
        let isMounted = true;
        if(isMounted){
            fetchitems()
            .then(json=>{
                let arrayTiendas = []
                let carritoArray = []
                console.log(json)
                json.carrito_items.map(item=>{
                    if(!arrayTiendas.includes(item.producto.id_tienda)){
                        arrayTiendas.push(item.producto.id_tienda)
                    }
                    console.log(item)
                })
                arrayTiendas.map(tienda=>{
                    let total = 0;
                    let productArray = []
                    let id_stripe= ""
                    let nombre_tienda= ""
                    json.carrito_items.map(async item=>{
                        if(item.producto.id_tienda == tienda){
                            nombre_tienda = item.producto.tienda.nombre
                            id_stripe = item.producto.tienda.info_stripes[0].id_stripe
                            productArray.push(item);
                            total += (item.producto.precio*item.cantidad)
                        }
                    })
                    carritoArray.push({id_tienda: tienda, nombre: nombre_tienda, id_stripe: id_stripe, total: total, productos: productArray})
                })
                console.log(carritoArray)
                setTiendas(carritoArray)
                setKey(carritoArray[0].nombre)
            })  
        }
        return ()=> isMounted=false;
        
    },[]);

    const handleDelete = (id)=>{
        setItems(items.filter(item => item.id !== id));
    }

    // async function arrangeProductos(items){
    //     let arrayTiendas = [];
    //     let objectTiendas = [];
    //     items.map(item=>{
    //         if(!arrayTiendas.includes(item.id_tienda)){
    //             arrayTiendas.push(item.id_tienda)
    //         }
    //     })
    //     arrayTiendas.map(async tienda=>{
    //         let total = 0;
    //         let productArray = []
    //         items.map(async item=>{
    //             if(item.id_tienda == tienda){
    //                 productArray.push(item);
    //                 total += (item.precio*item.cantidad)
    //             }
    //         })
    //         const account = await fetch(`http://localhost:5000/api/v1/stripeInfo/${tienda}`)
    //         const json = await account.json();
    //         console.log(json)
    //         objectTiendas.push({id: tienda, id_stripe: json.info['info_stripes.id_stripe'], nombre: json.info['nombre'], productos: productArray, total: total})
    //     })
    //     return objectTiendas;
    // }

    
    const fetchitems = async ()=>{
        const data = await fetch(`http://localhost:5000/api/v1/carrito/payment/${user.id}`)
        const items = await data.json();
        return items.result[0];
    }
    
function handleClick(productos){
    let total=0;
    productos.productos.map(p=>{
        total += p.cantidad*p.producto.precio
    })
    props.setProductos(productos.productos);
    props.setIDStripe(productos.id_stripe);
    props.setTotal(total)
    localStorage.setItem("account_id",  productos.id_stripe)
    props.handleShow();
}

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

        return(
            <Fragment>
                {tiendas ? 
                <Fragment>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    >
                {tiendas.map(tienda=>(
                    <Tab eventKey={tienda.nombre} key={tienda.id_tienda} title={tienda.nombre}>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                {/* <th scope="col">Tienda</th> */}
                                <th scope="col">Total</th>
                                <th scope="col">•</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tienda.productos.map(item =>(
                                <tr key={item.producto.id}>
                                    <td scope="row">{item.producto.nombre}</td>
                                    <td>${Number.parseFloat(item.producto.precio).toFixed(2)}</td>
                                    <td>{item.cantidad}</td>
                                    {/* <td>{item.tienda_nombre}</td> */}
                                    <td>${Number.parseFloat(item.producto.precio*item.cantidad).toFixed(2)}</td>
                                    <td><Eliminar handleDelete={handleDelete} item={item}/></td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                    <hr/>
                            <div><h5>Total a pagar: ${Number.parseFloat(tienda.total).toFixed(2)}</h5></div>
                            <div className= "container">

                            </div>
                            <div>
                          <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>handleClick(tienda)}>Pagar</button>
                        </div>
                    </Tab>
                ))}
                </Tabs>
   
                        </Fragment>
                        : <h4>Aun no a agregado nada al carrito.</h4>
                    }
            </Fragment>
        );
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
