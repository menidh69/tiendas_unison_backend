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
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200');
        const items = await data.json();
        console.log(items)
        setItems(items.results)
    };

    const fetchall = async (url)=>{
       const data = await fetch(url)
       const item = await data.json();
       return item;
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
                      <th scope="col">Validar</th>
                  </tr>
              </thead>
              <tbody>
              {items.map(item => (
                     <tr>
                         <td>{item.itemid}</td>
                         <Link style={style} to={`/admin/universidades/${item.name}`}>
                         <td>{item.name}</td>
                         </Link>
                         <td>{item.url}</td>
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