import React, {Fragment, useContext, useEffect, useReducer, useState} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {Button, Modal} from 'react-bootstrap';

const IndexTiendas = ()=>{
    const {user, setUser} = useContext(UserContext)

    useEffect(()=>{
    let isMounted = true;
    fetchitems()
    .then(json=>{
      if(isMounted) setItems(json)
    })
    return ()=>isMounted=false;
    }, []);

    const [items, setItems] = useState([])
    const [data, setData] = useState({})


    const fetchitems = async ()=>{
        const data = await fetch(`http://localhost:5000/api/v1/universidades/tiendas/${user.id_universidad}`);
        const json = await data.json();
        return json;
    };
   
    const style = {
        width: '12rem'
    }
    const styleImg={
        maxWidth: '100%',
        height: '175px',
        objectFit: 'cover'
    }

    return(
        <Fragment>
            <div className="container my-4">
                <h2 className="text-center"> Listado de Tiendas
                </h2>
            <div className="row">
            {items.map(item =>(
                <div key={item.id} className="col-md-3">
                    <div className="card rounded shadow text-center h-100" style={style}>
                        <img src={item['tienda.url_imagen']||"https://via.placeholder.com/300x300"} style={styleImg} className="card-img-top"/>
                        <div className="card-body h-75">
                            <h4 className="card-title">{item['tienda.nombre']}</h4>
                                <p className="card-text">
                                    {item['tienda.horario']}<br/>
                                    {(item['tienda.tarjeta'])?'Si aceptan tarjeta': 'No aceptan tarjeta'}
                                </p>
                                <Link to={`/tiendas/${item['tienda.id']}`}>
                                <button className="btn btn-block btn-primary my-2">Ver Tienda</button>
                                </Link>
                                <Link to={`/tiendas/${item['tienda.id']}/menu`}>
                            <button className="btn btn-block btn-primary my-2">Ver Menú</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        
            </div>
        </Fragment>
    )
}

export default IndexTiendas;