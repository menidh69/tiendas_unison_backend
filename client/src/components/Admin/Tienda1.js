import React, {Fragment, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'

const Tienda1 = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    fetchdata();
  }, [])

  const fetchdata = async ()=>{
    const prom = await fetch(`http://localhost:5000/api/v1/tiendas/${id}`);
    const record = await prom.json();
    setData(record.tienda[0]);
    console.log(record.tienda[0])
};

  const mystyle = {
    height: "100%"
  }
  return (
  <Fragment>
    <div className="col-md-9 border-left">
    <div className='container'>
      <div>
        <button className="my-5 ml-5 btn btn-lg btn-warning" onClick={()=>history.push('/admin/tiendas')}>Atras</button>
        <h1 className='my-2 ml-5 display-4 text-dark'>Tienda {data.nombre}</h1>
      </div>
      <div className="row">
      <div className="my-5 col-md-8 text-left">
      <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th scope="col">Encargado</th>
              <td>{data.id_usuario}</td>
            </tr>
            <tr>
              <th>Telefono</th>
              <td>12345678</td>
            </tr>
            <tr>
              <th>Universidad</th>
              <td></td>
            </tr>
            <tr>
              <th>Horario</th>
              <td>{data.horario}</td>
            </tr>
            <tr>
              <th>Terminal</th>
              <td>{data.tarjeta ?'Si':'No'}</td>
            </tr>
            <tr>
              <th>Validada</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
            <label for="img_tienda">Imagen Tienda</label>
            <img alt="Tienda"></img>
        </div>
        </div>

        <h2 className="text-center">Reportes</h2>
        <p><strong>Reportes totales:</strong></p>
        <table className="table table-striped">
          <thead>
            <th>ID</th>
            <th>Reporte</th>
            <th><button className="btn btn-danger btn-sm btn-rounded">Eliminar todos</button></th>
          </thead>
          <tbody>
            <td>1</td>
            <td>La tienda no existe</td>
            <td>
            <button className="btn btn-outline-danger btn-sm btn-rounded">Eliminar</button>
            </td>
          </tbody>
        </table>
    </div>
    </div>
  </Fragment>)
}

export default Tienda1;
