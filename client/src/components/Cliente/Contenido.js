import React, { Fragment, useReducer, useContext, Component } from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'
import { UserContext } from '../../UserContext';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TiendaInfo from "./TiendaInfo";
import Menu from "./Menu";




      
      

  const Contenido = () => {

    const {user, setUser} = useContext(UserContext)

  return (
    <Fragment>
        <div className="text-center my-4 container">
            <div className="arriba">
                <h3>Tiendas en Universidad de Sonora</h3>

            </div>
            <h4>Bienvenido {user.nombre}</h4>
            <hr/>
            <div>
            
           
            </div>
                  
            
                <IndexTiendas/>
        </div>
    </Fragment>
  )
};

export default Contenido;
