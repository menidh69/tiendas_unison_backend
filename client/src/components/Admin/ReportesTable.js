import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const ReportesTable = ()=>{

    const style = {
        color: 'blue'
    }

    const [items, setItems] = useState([])
    const [data, setData] = useState({})

    useEffect(()=>{
        fetchitems()
    }, []);


    const fetchitems = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/reporte_tienda');
        const json = await data.json();
        console.log(json)
        setItems(json.result)
    };
    
    
    

    return(
        <Fragment>
        <div className="col-9 border-left">
            <div className="container m-4">
                <h1 className='my-4 display-4 text-dark'>Reportes de Tiendas</h1>
          <table className="table table-striped">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Horario</th>
                      <th scope="col">ID Encargado</th>
                      <th scope="col">Reportes</th>                  
                  </tr>
              </thead>
              <tbody>
                 {items.map(item => (
                     <tr key={item.id}>
                         <td>{item.id}</td>
                         <td>
                         <Link style={style} to={`/admin/tiendas/${item.id_usuario}`}>
                         {item.nombre}
                         </Link>
                         </td>
                         <td>{item.horario}</td>
                         <td>{item.id_usuario}</td>
                         <td>{item.reporte_tiendas.length}</td>
                    </tr>
                 ))}
              </tbody>
            
          </table>
        </div>
        </div>
        </Fragment>
    )
}

export default ReportesTable;