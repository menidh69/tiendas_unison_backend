
import React, { Fragment, useReducer, useContext, useState, Component, useEffect} from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'
import { UserContext } from '../../UserContext';
import MapaCliente from './MapaCliente';
import MapaTiendas from './MapaTiendas';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TiendaInfo from "./TiendaInfo";
import Menu from "./Menu";




      
      

  const Contenido = () => {

    const {user, setUser} = useContext(UserContext)


const Contenido = () => {
  const {user, setUser} = useContext(UserContext)
const [items, setItems] = useState({})


useEffect(()=>{
  let isMounted = true;
    fetchitems()
    .then(json=>{
      if(isMounted) setItems(json)
    })
    return ()=>isMounted=false;
}, []);

const fetchitems = async ()=>{
    const data = await fetch(`http://localhost:5000/api/v1/universidades/tiendas/${user.id_universidad}`);
    const json = await data.json();
    return json;
};
  

  return (
    <Fragment>
        <div className="text-center my-4 container">
            <div className="arriba">
                <h3>Tiendas Universidad</h3>

            </div>
            <h4>Bienvenido {user.nombre}</h4>

                <MapaTiendas></MapaTiendas>
                
                {/* <button  className="btn btn-lg btn-primary rounded-pill my-4">Ver listado de todas las tiendas</button> */}
              
                <hr className="my-4"/>
                <div>
                <IndexTiendas className="my-4"/>
                </div>

        </div>
    </Fragment>
  )
};

export default Contenido;
