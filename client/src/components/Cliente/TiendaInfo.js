import React, {Fragment, useEffect, useState,useContext} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom'
import { UserContext } from '../../UserContext';


const TiendaInfo = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const {user , setUser} = useContext(UserContext);
  const {id} = useParams();

  useEffect(()=>{
    fetchdata();
  }, [])

  const fetchdata = async ()=>{
    const prom = await fetch(`http://localhost:5000/api/v1/tiendas/${id}`);
    const record = await prom.json();
    setData(record.tienda[0]);
    console.log(record.tienda[0])
}

const reportar = async(id_usuario,id_tienda)=>{
  const response = await fetch (`http://localhost:5000/api/v1/reporte_tienda/${user.id}/${data.id}`,{
    method: "POST"
  });
}

const validar = async(id_usuario,id_tienda)=>{
  const response = await fetch (`http://localhost:5000/api/v1/validar_tienda/${user.id}/${data.id}`,{
    method: "POST"
  });
}

;

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
        <button className="botonn" data-toggle="modal" href="#reportar">Reportar tienda</button>
                              <div id="reportar" class="modal">
                         <div class="modal-dialog">
                         <div class="modal-content">
                         <div class="modal-header">
                          
                              <h4 class="modal-title">Reporte de tienda</h4>
                        </div>
                        <div class="modal-body">
                             <p>En caso de que la tienda no exista, ayúdanos con tu reporte para evitar fraudes, al enviarlo estás afirmando que la tienda no existe </p>
                             <div class="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" required class="custom-control-input" id="customControlAutosizing"/>
                        <label class="custom-control-label" for="customControlAutosizing">Ok, entiendo.</label>
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onClick={reportar} data-dismiss="modal" >Enviar reporte</button>
 </div>
                    </div>
                </div>
            </div>
            <button  class="btn btn-primary" data-toggle="modal" href="#validar">Validar tienda</button>
                      <div id="validar" class="modal fade">
                         <div class="modal-dialog">
                         <div class="modal-content">
                         <div class="modal-header">
                          
                              <h4 class="modal-title">Validacion de tienda</h4>
                        </div>
                        <div class="modal-body">
                        <p>Con tu información ayudas a las tiendas y a que los usuarios tengan compras más seguras, al enviar este informe estas afirmando que la tienda si existe.  </p>    <div class="custom-control custom-checkbox mr-sm-2">
                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onClick={validar} data-dismiss="modal" >Enviar informe</button>
                         </div>
                    </div>
                </div>
            </div>
                      
        </div>               
                     
        
    </div>
    
  </Fragment>)
}

export default TiendaInfo;

// este es pra la validacion 
/*<button class="btn btn-info btn-lg" data-toggle="modal" href="#Modal">Validar tienda</button>
<div id="Modal" class="modal">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
 
     <h4 class="modal-title">Validación de tienda</h4>
</div>
<div class="modal-body">
 <p>Con tu información ayudas a las tiendas y a que los usuarios tengan compras más seguras, al enviar este informe estas afirmando que la tienda si existe.  </p>    <div class="custom-control custom-checkbox mr-sm-2">
<input type="checkbox" required class="custom-control-input" id="customControlAutosizing"/>
<label class="custom-control-label" for="customControlAutosizing">Ok, entiendo.</label>
</div>
</div>
<div class="modal-footer">
   <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
   <button type="button" class="btn btn-primary" onClick={validar} data-dismiss="modal" >Enviar informe</button>
</div>
</div>
</div>
</div>  */ 