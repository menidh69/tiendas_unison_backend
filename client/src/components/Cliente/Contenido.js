
import React, { Fragment, useReducer, useContext, useState, Component, useEffect} from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'
import { UserContext } from '../../UserContext';
import MapaCliente from './MapaCliente';
import MapaTiendas from './MapaTiendas';
import {Form, Button, Container, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom';



const Contenido = () => {
  const {user, setUser} = useContext(UserContext)
const [items, setItems] = useState({})
  const [busqueda, setBusqueda] = useState("")

useEffect(()=>{
  let isMounted = true;
    fetchitems()
    .then(json=>{
      if(isMounted) setItems(json)
    })
    return ()=>isMounted=false;
}, []);

const fetchitems = async ()=>{
    const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/universidades/tiendas/${user.id_universidad}`);
    const json = await data.json();
    return json;
};

const handleBusqueda = e =>{
  setBusqueda(e.target.value)
}
  
const bgStyle = {
  backgroundColor: "#29698f"
}

  return (
    <Fragment>
        <div className="text-center my-4 container">
                <MapaTiendas></MapaTiendas>
        </div>
        
                {/* <button  className="btn btn-lg btn-primary rounded-pill my-4">Ver listado de todas las tiendas</button> */}
                {/* <div style={bgStyle} className="text-center mx-auto py-2">
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
                </div> */}

                <div className="text-center my-4 container">
                <hr className="my-4"/>
                <div>
                <IndexTiendas className="my-4"/>
                </div>

        </div>
    </Fragment>
  )
};

export default Contenido;
