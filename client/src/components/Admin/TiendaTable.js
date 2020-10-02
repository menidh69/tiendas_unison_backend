import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const TiendaTable = ()=>{

    const style = {
        color: 'blue'
    }


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

    return(
        <Fragment>
        <div className="col-9 border-left">
            <div className="container m-4">
                <h1 className='my-4 display-4'>Tiendas</h1>
          <table className="table table-striped">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Horario</th>
                      <th scope="col">ID Encargado</th>
                      
                  </tr>
              </thead>
              <tbody>
                 {items.map(item => (
                     <tr key={item.id}>
                         <td>{item.id}</td>
                         <td>
                         <Link style={style} to={`/admin/tiendas/${item.nombre}`}>
                         {item.nombre}
                         </Link>
                         </td>
                         <td>{item.horario}</td>
                         <td>{item.id_usuario}</td>
                    </tr>
                 ))}
              </tbody>
            
          </table>
        </div>
        </div>
        </Fragment>
    )
}

export default TiendaTable;