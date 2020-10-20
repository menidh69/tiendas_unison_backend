import React, {Fragment, useContext, useState} from 'react';
import './Opciones.css';
import {Link} from 'react-router-dom';
import MiInfo from './MiInfo';
import Banner from 'react-js-banner'
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Opciones = ()=> {
    return(

        <Fragment>
            <Items/>

        </Fragment>
    );
}

function Items() {
    const {user, setUser} = useContext(UserContext);
    const fetchitems = async (id)=>{
        const data = await fetch('http://localhost:5000/api/v1/tiendafecha/${id}'); //nojala
        const items = await data.json();
        setItems(items)
    };


    const [items, setItems] = useState([])


    return(
        <div className="mainContainer">
          <h2>{user.id}</h2>

            {items.map(item =>(
              <h2 class="d-block">{item.nombretienda}</h2
              <h2>item.fechaSub</h2>
            ))}

          <Banner title="SU PERIODO DE PRUEBA VENCE X DIA" visibleTime={3000}/>

            <div className="itemsContainer">
                <button className="boton">Cuenta</button>
                <button className="boton">Editar Menu</button>
                <button className="boton">Promociones</button>
            </div>
            <hr />
            <div className="itemsContainer">

                <Link to='panel/MiInfo'>
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
