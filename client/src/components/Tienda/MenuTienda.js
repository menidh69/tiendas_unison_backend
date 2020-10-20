import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './MenuTienda.css';

const MenuTienda = ()=> {

    return(

        <Fragment>
            <div className="mainContainer">
                <div className="top-container">
                    <div className="top-container-item izq">
                        <a className="atras izq" href="/">
                            <h6 className="izq">← Atras</h6>
                        </a>
                        <h6 className="izq">| Menú</h6>
                    </div>
                    <div className="top-container-item">
                        <h4>Tienda Industrial</h4>
                        <div className='imagen'></div>
                    </div>
                    <div className="top-container-item der">
                        <Link to='/panel/Menu/EditarMenu'>
                            <button  className="btn btn-danger der">Editar Menú</button>
                        </Link>
                    </div>
                    <div className="container m">
                        <select class="custom-select" id="ordenar">
                            <option selected>Ordenar por</option>
                            <option value="1">Precio</option>
                            <option value="2">Calificación</option>
                        </select>
                    </div>
                </div>
                <hr/>
                <Menu/>
            </div>
        </Fragment>
    );
}

function Menu() {
    return(
        <div className="menu-container">
            <div className="row">
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Torta de civil</p>
                    <p className="nomargin">$35.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Torta de jamon</p>
                    <p className="nomargin">$30.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Pepihuates</p>
                    <p className="nomargin">$15.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Tostitos</p>
                    <p className="nomargin">$12.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">baiabaia</p>
                    <p className="nomargin">$0.50</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">tamal</p>
                    <p className="nomargin">$15.00</p>
                </div>
            </div>
            <div className="row">
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Torta de civil</p>
                    <p className="nomargin">$35.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Torta de jamon</p>
                    <p className="nomargin">$30.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Pepihuates</p>
                    <p className="nomargin">$15.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">Tostitos</p>
                    <p className="nomargin">$12.00</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">baiabaia</p>
                    <p className="nomargin">$0.50</p>
                </div>
                <div className="menuItem">
                    <div className="productoImagen"></div>
                    <p className="nomargin">tamal</p>
                    <p className="nomargin">$15.00</p>
                </div>
            </div>
        </div>
    );
}

export default MenuTienda;