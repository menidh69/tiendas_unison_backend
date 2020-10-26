import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const IndexTiendas = ()=>{

    useEffect(()=>{
        fetchitems();
    }, []);

    const [items, setItems] = useState([])
    const [data, setData] = useState({})

    const fetchitems = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/tiendas');
        const items = await data.json();
        console.log(items)
        setItems(items)
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
            <div className="row">
            {items.map(item =>(
                <div className="col-md-3">
                    <div className="card rounded shadow text-center h-100" style={style}>
                        <img src={item.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg} className="card-img-top"/>
                        <div className="card-body h-75">
                            <h4 className="card-title">{item.nombre}</h4>
                                <p class="card-text">
                                    {item.horario}<br/>
                                    {(item.tarjeta)?'Si aceptan tarjeta': 'No aceptan tarjeta'}
                                </p>
                                <Link to={`/tiendas/${item.id}`}>
                                <button className="btn btn-block btn-primary my-2">Ver Tienda</button>
                                </Link>
                                <Link to={`/tiendas/${item.id}/menu`}>
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