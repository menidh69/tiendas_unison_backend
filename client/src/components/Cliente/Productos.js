import React, { Fragment, useReducer, useContext, useState, Component, useEffect} from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'
import { UserContext } from '../../UserContext';
import MapaCliente from './MapaCliente';
import MapaTiendas from './MapaTiendas';
import {Form, Button, Container, Col} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Productos = () => {
  const {user, setUser} = useContext(UserContext)
  const [items, setItems] = useState([])
  const [busqueda, setBusqueda] = useState("")
  let query = useQuery();

useEffect(()=>{
  let isMounted = true;
    fetchitems()
    .then(json=>{
      if(isMounted) setItems(json.productos)
    })
    return ()=>isMounted=false;
}, []);


const fetchitems = async()=>{
    const nombre = query.get("producto")
    const info = await fetch(`http://localhost:5000/api/v1/universidad/${user.id_universidad}/productos/${nombre}`)
    const json = await info.json()
    return json
}

const handleBusqueda = e =>{
  setBusqueda(e.target.value)
}
  
const bgStyle = {
  backgroundColor: "#29698f"
}

  return (
    <Fragment>
        
        
                {/* <button  className="btn btn-lg btn-primary rounded-pill my-4">Ver listado de todas las tiendas</button> */}
                <div style={bgStyle} className="text-center mx-auto py-2">
                <Form className="my-4">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label><h5 className="text-light">Buscar un producto</h5></Form.Label>
                  
                  <Form.Control size="lg" type="text" placeholder="Brownie" className="rounded-pill mx-auto w-50" onChange={handleBusqueda} />
                 
                </Form.Group>
                <Link to={`/productos?producto=${busqueda}`}>
                <Button variant="warning" type="submit">
                  Buscar
                </Button>
                </Link>
                </Form>
                </div>

                <div className="text-center my-4 container">
                <hr className="my-4"/>
                {items.map(producto=>(
                    <h1 className="text-dark">producto.nombre</h1>
                ))}

        </div>
    </Fragment>
  )
};

export default Productos;
