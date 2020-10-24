import React, {Fragment, useContext, useState, useEffect} from 'react';
import './Opciones.css';
import {Link} from 'react-router-dom';

import Banner from 'react-js-banner'
import { UserContext } from '../../UserContext'
import {useHistory} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Opciones = ()=> {
    return(

        <Fragment>
            <Items/>

        </Fragment>
    );
}

function Items() {
    let history = useHistory()
    const [items, setItems] = useState([])
    const {user, setUser} = useContext(UserContext);
    const [days, setDays] = useState(null);
    useEffect(()=>{
        fetchitems();
    }, []);

    const fetchitems = async (id)=>{
        const data = await fetch(`http://localhost:5000/api/v1/tiendafecha/${user.id}`);
        const items = await data.json();
        setItems(items[0])
        let finaldate = new Date();
        let today = new Date(Date.now())
        let subdate = new Date(items[0].fechaSub)
        finaldate.setDate(subdate.getDate() + 21)
        let diffTime = Math.abs(finaldate - today);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffDays)
        setDays(diffDays)
    };

    const eliminar = async (id)=>{
        try{
            const response = await fetch(`http://localhost:5000/api/v1/tiendas/${id}`,
            {
                method: "DELETE",
            });
            //setItems(items.filter(item => item.id !== id));
            localStorage.removeItem('token.tuw')
            alert('Hasta la vista beibi')
            setUser(null);
            history.push("/")
        }catch(err){
            console.error(err)
        }
    }
    



    return(
        <div className="mainContainer">

            <Banner title={`SU PERIODO DE PRUEBA VENCE EN: ${days} días`} visibleTime={3000}/>
            {/* <Banner title= {date} visibleTime={3000}/> */}




            <div className="itemsContainer">
                <button className="boton">Cuenta</button>
                <Link to='/panel/Menu'>
                <button className="boton">Menu</button>
                </Link>
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
                <button className="boton" data-toggle="modal" href="#Modal">Baja</button>
                <button className="boton">Ayuda</button>
            </div>
            <div id="Modal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">¿Estás seguro?</h4>
                        </div>
                        <div class="modal-body">
                            <p>¿Seguro que quieres darte te baja?</p>
                            <p class="text-warning"><small>Si lo borras, nunca podrás recuperarlo.</small></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>eliminar(user.id)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Opciones;
