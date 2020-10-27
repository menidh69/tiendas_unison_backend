import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const TiendaTable = ()=>{

    const style = {
        color: 'blue'
    }
    const [universidad, setUniversidad] = useState(null)
    const [items, setItems] = useState([])
    const [unis, setUnis] = useState([])

    useEffect(()=>{
        fetchUniversidades();
        fetchitems();
    }, [universidad]);

  

    const fetchitems = async ()=>{
        if(universidad){
            const data = await fetch(`http://localhost:5000/api/v1/universidades/tiendas/${universidad}`);
            const json = await data.json();
            console.log(json)
            setItems(json)
        }else{
        const data = await fetch('http://localhost:5000/api/v1/tiendas');
        const json = await data.json();
        console.log()
        console.log(json)
        setItems(json)
        }
    };

    const fetchUniversidades = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/universidades')
        const json = await data.json();
        console.log(json)
        setUnis(json);
      }

    const updateUniversidad = e =>{
        if(e.target.value=='0'){
            setUniversidad(null)
        }else{
            setUniversidad(e.target.value)
        }
    }

    let tablaitems;
    if(universidad==null){
        tablaitems = <Fragment>
            {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                            <Link style={style} to={`/admin/tiendas/${item.id}`}>
                            {item.nombre}
                            </Link>
                            </td>
                            <td>{item.horario}</td>
                            <td>{item.id_usuario}</td>
                       </tr>
                    ))}
        </Fragment>
    }else{
        tablaitems = 
        <Fragment>
            {items.map(item => (
                        <tr key={item['tienda.id']}>
                            <td>{item['tienda.id']}</td>
                            <td>
                            <Link style={style} to={`/admin/tiendas/${item['tienda.id']}`}>
                            {item['tienda.nombre']}
                            </Link>
                            </td>
                            <td>{item['tienda.horario']}</td>
                            <td>{item.id}</td>
                       </tr>
                    ))}
        </Fragment>
    }
    

    return(
        <Fragment>
        <div className="col-9 border-left text-dark">
            <div className="container m-4">
                <h1 className='my-4 display-4 text-dark'>Tiendas</h1>
                <div className="form-group w-50">
                <select id="universidad" name="universidad" className="form-control" onChange={updateUniversidad}>
                      <option value="0" selected>Todas</option>
                       {unis.map(uni=>(
                         <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                       ))}
                      </select>
                      </div>
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
                    {tablaitems}
              </tbody>

          </table>
        </div>
        </div>
        </Fragment>
    )
}

export default TiendaTable;
