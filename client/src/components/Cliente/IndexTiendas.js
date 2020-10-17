import React, {Fragment, useContext, useEffect, useState} from 'react';

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
        height: '50%'
    }
    return(
        <Fragment>
            <div className="row">
            {items.map(item =>(
                <div className="col-md-3">
                    <div className="card rounded shadow text-center" style={style}>
                        <img src="https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg" style={styleImg} className="card-img-top"/>
                        <div className="card-body">
                            <h4 className="card-title">{item.nombre}</h4>
                                <p class="card-text">
                                    {item.horario}<br/>
                                    {(item.tarjeta)?'Si aceptan tarjeta': 'No aceptan tarjeta'}
                                </p>
                            <button className="btn btn-block btn-primary">Ver Menú</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </Fragment>
    )
}

export default IndexTiendas;