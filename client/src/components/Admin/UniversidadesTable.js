import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'


const UniversidadesTable = ()=>{
    const style = {
        color: 'blue'
    }

    useEffect(()=>{
        fetchitems();
    }, []);

    const [items, setItems] = useState([])

    const fetchitems = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/universidades');
        const items = await data.json();
        console.log(items)
        setItems(items)
    };

    return(
        <Fragment>
        <div className="col-9 border-left">
            <div className="container my-4 mx-4">
                <h1 className='my-4 display-4'>Universidades</h1>
          <table className="table table-striped">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Ciudad</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Validar</th>
                      <th scope="col">Eliminar</th>
                  </tr>
              </thead>
              <tbody>
              {items.map(item => (
                     <tr key={item.id}>
                         <td>{item.id}</td>                       
                         <td>{item.nombre}</td>                       
                         <td>{item.ciudad}</td>
                         <td>{item.estado}</td>
                         <td><button className="btn btn-sm btn-info">Validar</button></td>
                         <td><button className="btn btn-sm btn-danger">Eliminar</button></td>
                    </tr>
                 ))}
              </tbody>
            
          </table>
        </div>
        </div>
        </Fragment>
    )
}

export default UniversidadesTable;