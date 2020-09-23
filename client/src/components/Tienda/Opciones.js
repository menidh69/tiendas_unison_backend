import React, {Fragment} from 'react';
import './Opciones.css';


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
            <div className="itemsContainer">
                <button className="boton">Cuenta</button>
                <button className="boton">Editar Menu</button>
                <button className="boton">Promociones</button>
            </div>
            <hr />
            <div className="itemsContainer">
                <button className="boton">Editar informacion</button>
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