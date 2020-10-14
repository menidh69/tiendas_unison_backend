import React, {Fragment} from 'react';
import './Opciones.css';
import {Link} from 'react-router-dom';
import MiInfo from './MiInfo';
import Banner from 'react-js-banner'

const Opciones = ()=> {

    return(

        <Fragment>
            <Items/>
        </Fragment>
    );
}

function Items() {
    return(

        <div className="mainContainer">
          <Banner title="SU PERIODO DE PRUEBA VENCE X DIA" visibleTime={3000}/>
            <div className="itemsContainer">
                <button className="boton">Cuenta</button>
                <button className="boton">Editar Menu</button>
                <button className="boton">Promociones</button>
            </div>
            <hr />
            <div className="itemsContainer">

                <Link to='/panel/MiInfo'>
                <button className="boton">Mi información</button>
                </Link>

                <button className="boton">Ventas</button>
                <button className="boton">Tarjeta</button>
            </div>
            <hr />
            <div className="itemsContainer">
                <button className="boton">Ver mi tienda</button>
                <button className="boton">Baja</button>
                <button className="boton">Ayuda</button>
            </div>
        </div>
    );
}

export default Opciones;
