import React, { Fragment } from "react";
import "./Contenido.css";
import IndexTiendas from './IndexTiendas'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Contenido = () => {
  return (
    <Fragment>
        <div className="text-center my-4 container">
            <div className="arriba">
                <h3>Tiendas en Universidad de Sonora</h3>
            </div>
            <div className="container my-4">
                <IndexTiendas/>
            </div>
        </div>
    </Fragment>
  );
};

export default Contenido;
