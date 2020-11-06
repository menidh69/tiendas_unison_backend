import React, { Fragment, useReducer, useContext} from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'
import { UserContext } from '../../UserContext';
import Mapa from './Mapa'


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Contenido = () => {
  const {user, setUser} = useContext(UserContext)
  
  return (
    <Fragment>
        <div className="text-center my-4 container">
            <div className="arriba">
                <h3>Tiendas Universidad</h3>

            </div>
            <h4>Bienvenido {user.nombre}</h4>
                <Mapa googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
                loadingElement={<div style={{height: "100%"}}/>} containerElement={<div style={{height: "450px"}}/>} 
                mapElement={<div style={{height: "100%"}}/>}></Mapa>
                <Link to="/tiendas">
                <button className="btn btn-lg btn-primary rounded-pill my-4">Ver listado de todas las tiendas</button>
                </Link>
                <hr/>
                <IndexTiendas className="my-4"/>
        </div>
    </Fragment>
  );
};

export default Contenido;
