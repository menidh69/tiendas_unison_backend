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
    const [data, setData] = useState({})

    const fetchitems = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/universidades');
        const items = await data.json();
        console.log(items)
        setItems(items)
    };

    const eliminar = async (id)=>{
        try{
            const response = await fetch(`http://localhost:5000/api/v1/universidades/${id}`,
            {
                method: "DELETE",
            });
            setItems(items.filter(item => item.id !== id));
        }catch(err){
            console.error(err)
        }
    }

    const validar = async (item)=>{
        let body = {}
        if(item.validada){
            body = {"validada":"false"}
        }else{
            body= {"validada":"true"}
        }
        console.log(item)
        try{
            console.log(body)
            const response = await fetch(`http://localhost:5000/api/v1/universidades/${item.id}`,
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            window.location = '/admin/universidades'
        }catch(err){
            console.error(err)
        }
    }

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
                      <th scope="col">Validada</th>
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
                         <td>{item.validada ? 'si':'no'}</td>
                         <td><button className="btn btn-sm btn-info" onClick={() => validar(item)}>{item.validada ? 'Desvalidar':'Validar'}</button></td>
                         <td><button className="btn btn-sm btn-danger" onClick={()=>eliminar(item.id)}>Eliminar</button></td>
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