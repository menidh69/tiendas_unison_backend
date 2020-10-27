import React, {Fragment, useEffect, useState} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom'

const TiendaInfo = () => {
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
  const imgStyle={
    maxWidth:"100%"
  }
  return (
  <Fragment>
    
    <div className='container py-4 my-2'>
      <div>
        {/* <button className="my-2 ml-2 btn btn-lg btn-warning" onClick={()=>history.push('/tiendas')}>Volver</button> */}
        <h1 className='my-2 display-4 text-dark'>Tienda {data.nombre}</h1>
      </div>
      <div className="row my-5">
      <div className="my-5 col-md-6 text-left">
      
            
            
              <h4>Universidad</h4>
              <p>{data.universidad}</p>
           
            
              <h4>Horario</h4>
              <p>{data.horario}</p>
            
            
              <h4>¿Aceptan tarjeta?</h4>
              <p>{data.tarjeta ?'Si':'No'}</p>
           
              <h4>Validada</h4>
              <p></p>
            
          
      </div>
      <div className="col-md-6 border">
            <img alt="Tienda" className="border" style={imgStyle} src={data.url_imagen}></img>
        </div>
        </div>
        <Link to={`/tiendas/${id}/menu`}>
        <button className="mx-auto text-center btn btn-lg rounded-pill btn-primary"> Ver menú </button>
        </Link>

        <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#myModal">Reportar tienda</button>

                            <div id="Modal" class="modal">
                         <div class="modal-dialog">
                         <div class="modal-content">
                         <div class="modal-header">
                          
                            <h4 class="modal-title">Reporte de tienda</h4>
                        </div>
                        <div class="modal-body">
                        <p>En caso de que la tienda no exista, ayúdanos con tu reporte para evitar fraudes, al enviarlo estás afirmando que la tienda no existe </p>
                        <div class="form-group">

                        <div class="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" required class="custom-control-input" id="customControlAutosizing"/>
                        <label class="custom-control-label" for="customControlAutosizing">Ok, entiendo.</label>
                        </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onClick={()=>reportar()} data-dismiss="modal" >Enviar reporte</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
  </Fragment>)
}

export default TiendaInfo;