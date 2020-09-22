import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



const TiendaTable = ()=>{
    let valores = []
    for(let i=0;i<10;i++){
    valores.push(<tr><td>1</td><td>2</td><td>3</td><td>4</td><td><button className='btn btn-sm btn-primary'>Ver</button></td></tr>)
    }
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
                      <th scope="col">Telefono</th>
                      <th scope="col">Nombre Encargado</th>
                      <th scope="col">Ver</th>
                  </tr>
              </thead>
              <tbody>
                  {valores}
              </tbody>
            
          </table>
        </div>
        </div>
        </Fragment>
    )
}

export default TiendaTable;