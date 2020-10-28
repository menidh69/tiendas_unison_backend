import React, {Fragment, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'

const Tienda1 = () => {
  const history = useHistory();
  const [dataUser, setDataUser] = useState({});
  const [dataTienda, setDataTienda] = useState({});
  const [dataReportes, setDataReportes] = useState([]);

  const {id} = useParams();

  useEffect(()=>{
    fetchdata();
  }, [])

  const fetchdata = async ()=>{
    const prom = await fetch(`http://localhost:5000/api/v1/reporte_tienda/usuario/${id}`);
    const record = await prom.json();
    setDataUser(record.result[0]);
    const tienda = await record.result[0].tienda
    setDataTienda(tienda)
    const reportes = await tienda.reporte_tiendas
    setDataReportes(reportes)
    console.log(reportes)
    console.log(tienda)
    console.log(record.result[0])
};

const deleteAll = async()=>{
  const prom = await fetch(`http://localhost:5000/api/v1/reporte_tienda/all/${dataTienda.id}`,
  {
    method: "DELETE"
  });
  setDataReportes([])
}

const deleteOne = async(id)=>{
  const prom = await fetch(`http://localhost:5000/api/v1/reporte_tienda/${id}`,
  {
    method: "DELETE"
  });
  fetchdata();
}

const imgStyle={
  maxWidth:"100%"
}
  const mystyle = {
    height: "100%"
  }
  return (
  <Fragment>
    <div className="col-md-9 border-left">
    <div className='container'>
      <div>
        <button className="my-5 ml-5 btn btn-lg btn-warning" onClick={()=>history.push('/admin/tiendas')}>Atras</button>
        <h1 className='my-2 ml-5 display-4 text-dark'>Tienda {dataTienda.nombre}</h1>
      </div>
      <div className="row">
      <div className="my-5 col-md-8 text-left">
      <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th scope="col">Encargado</th>
              <td>{dataUser.nombre}</td>
            </tr>
            <tr>
              <th>Telefono</th>
              <td>{dataUser.tel}</td>
            </tr>
            <tr>
              <th>Horario</th>
              <td>{dataTienda.horario}</td>
            </tr>
            <tr>
              <th>Terminal</th>
              <td>{dataTienda.tarjeta ?'Si':'No'}</td>
            </tr>
            <tr>
              <th>Validada</th>
              <td>{dataTienda.validada?'Si':'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
            <label for="img_tienda">Imagen Tienda</label>
            <img src={dataTienda.url_imagen} style={imgStyle} alt="Tienda"></img>
        </div>
        </div>

        <h2 className="text-center">Reportes</h2>
        <p><strong>Reportes totales:{dataReportes.length}</strong></p>
        <table className="table table-striped">
          <thead>
            <th>ID</th>
            <th>Id Usuario</th>
            <th>Reporte</th>
            <th><button className="btn btn-danger btn-sm btn-rounded" onClick={()=>deleteAll()}>Eliminar todos</button></th>
          </thead>
          <tbody>
          {dataReportes.map(item=>(
       
            <tr>
              <td>{item.id}</td>
              <td>{item.id_usuario}</td>
              <td>No existe la tienda</td>
              <td>
            <button className="btn btn-outline-danger btn-sm btn-rounded" onClick={()=>deleteOne(item.id)}>Eliminar</button>
            </td>
              </tr>
              
          ))}
            
          </tbody>
        </table>
    </div>
    </div>
  </Fragment>)
}

export default Tienda1;
