import React, { Fragment } from "react";
import "./Contenido.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Contenido = () => {
  return (
    <Fragment>
        <div className="contenedor">
            <div className="arriba">
                <h3>Tiendas en Universidad de Sonora</h3>
                <div className="search">
                    <div className="buscador">
                    <input className="inputBuscador" type="text" placeholder="Buscar..."></input>
                    <button className="botonBucar">→</button>
                    </div>
                    <button className="btnCategoria">Categorias</button>
                </div>
            </div>
            <hr />
            <div className="itemsContainer">
                <div className="ordenarContainer">
                    <button className="ordenar">Ordenar por</button>
                </div>
                <div className="rowItems">
                    <div className="item">
                        <a href="">
                            <div className="image"></div>
                            <p className="nombre">Tienda 1</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 2</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 3</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 4</p>
                        </a>
                    </div>
                </div>
                <div className="rowItems">
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 5</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 6</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 7</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="#">
                            <div className="image"></div>
                            <p className="nombre">Tienda 8</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
};

export default Contenido;
