import React, {Fragment, useContext, useState, useEffect, fetchitems} from 'react';
import {Link} from 'react-router-dom';
import './MenuTienda.css';
import { UserContext } from '../../UserContext'

const MenuTienda = ()=> {

    return(

        <Fragment>
            <Arriba/>
        </Fragment>
    );
}

function Arriba() {

    const {user, setUser} = useContext(UserContext);
    
    const [items, setItems] = useState([]);

    useEffect(() =>{
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(`http://localhost:5000/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        setItems(it[0]);
    }

    return(
        <div className="mainContainer">
            <div className="top-container">
                <div className="top-container-item izq">
                    <Link to="/panel">
                    <a className="atras izq" href="">
                        <h6 className="izq">← Atras</h6>
                    </a>
                    </Link>
                    <h6 className="izq">| Menú</h6>
                </div>
                <div className="top-container-item">
                    <h4>{items.nombre}</h4>
                    <img alt="Imagen de perfil" src={items.url_imagen||"https://via.placeholder.com/300x300"} className="imagen"></img>
                </div>
                <div className="top-container-item der">
                    <Link to='/panel/Menu/EditarMenu'>
                        <button  className="btn btn-info der">Editar Menú</button>
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
            <Menu />
        </div>
    );
}

function Menu() {

    const {user, setUser} = useContext(UserContext);
    const [productos, setProductos] = useState([]);


    useEffect(() =>{
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(`http://localhost:5000/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        const data2 = await fetch(`http://localhost:5000/api/v1/productosTienda/${it[0].id}`);
        const it2 = await data2.json();
        setProductos(it2);
    }
    


    if(productos.length > 0) {
        return(
            <div className="menu-container">
                <div className="row">
                    {productos.map(producto => (
                        <div className="menuItem">
                            <img alt={"Imagen de producto: " + producto.nombre} src={producto.url_imagen||"https://via.placeholder.com/300x300"} className="productoImagen"></img>
                            <p className="nomargin">{producto.nombre}</p>
                            <p className="nomargin">${Number.parseFloat(producto.precio).toFixed(2)}</p>
                        </div>
                    ))}
                    
                    
                </div>
                
            </div>
        );
    } else {
        return(
            <div className="menu-container">
                <div className="row">
                    <div className="menuItem">
                        <p className="nomargin">Aun no ha agregado ningun producto.</p>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default MenuTienda;