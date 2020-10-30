import React, {Fragment, useEffect, useState,useContext} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom'
import { UserContext } from '../../UserContext';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'



const TiendaInfo = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const {user , setUser} = useContext(UserContext);
  const [validacion, setValidacion] = useState(false);
  const {id} = useParams();



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    fetchdata();
    // fetchValidar();
  }, [])

  const fetchValidar = async ()=>{
    const response = await fetch (`http://localhost:5000/api/v1/validar_tienda/${user.id}/tiendas/${id}`)
    const json = await response.json();
    console.log("tienda validacion personal:"+json.status);
    if(json.status=='false'){
      handleShow();
    }
    // }else{
    // setValidacion(json.status)
    // }
  }

  const fetchdata = async ()=>{
    const prom = await fetch(`http://localhost:5000/api/v1/tiendas/${id}`);
    const record = await prom.json();
    setData(record.tienda[0]);
    console.log("tienda validacion general:"+record.tienda[0].validada)
    if(record.tienda[0].validada===false){
      fetchValidar();
  }
    console.log(record.tienda[0])
}

const reportar = async()=>{
  const response = await fetch (`http://localhost:5000/api/v1/reporte_tienda/${user.id}/${data.id}`,{
    method: "POST"
  })
  const json = await response.json();
  console.log(json)
  console.log(response)
}

const validar = async(id_usuario,id_tienda)=>{
  const response = await fetch (`http://localhost:5000/api/v1/validar_tienda/${user.id}/${id}`,{
    method: "POST"
  });
  const json = await response.json()
  console.log(json)
  handleClose();
}



  const mystyle = {
    height: "100%"
  }
  const imgStyle={
    maxWidth:"100%"
  }
  const bgStyle={
    backgroundColor: "#29698f",
    display: "flex",
    alignItems: "center"
  }

  return (
  <Fragment>
    
    <div className='container py-4 my-2'>
      <div>
        {/* <button className="my-2 ml-2 btn btn-lg btn-warning" onClick={()=>history.push('/tiendas')}>Volver</button> */}
        <h1 className='my-2 display-4 text-dark text-center'>Tienda {data.nombre}</h1>
        {data.validada ?
        <h5 className="text-center">Verificada <FontAwesomeIcon icon={faCheckCircle} className="text-primary"/></h5>
        :
        <h5 className="text-center">(Pendiente de verificación)</h5>
        }
        
      </div>
      <div className="row my-5">
      <div className="my-5 col-md-6 text-left">
        <h2 className="text-left mb-4">Información General</h2>
        <div className="my-4">
        <h5>Horario</h5>
        <p>{data.horario}</p>
        </div>
        <div className="my-4">

        <h5>¿Aceptan tarjeta?</h5>
        <p>{data.tarjeta ?'Si':'No'}</p>
        </div>
        <Link to={`/tiendas/${id}/menu`}>
        <button className="mx-auto text-center btn btn-lg rounded-pill btn-primary shadow btn-block my-4 ml-0 pl-0"> Ver menú </button>
        </Link>
        <div className="text-center">
        <button className="btn btn-lg btn-outline-danger rounded-pill mx-2 shadow" data-toggle="modal" href="#reportar">Reportar</button>
        <button  class="btn btn-outline-primary btn-lg rounded-pill mx-2 shadow" data-toggle="modal" href="#validar">Verificar tienda</button>
        </div>
         
      </div>
      <div className="col-md-6 border rounded py-auto" style={bgStyle}>
            <img alt="Tienda" className="border my-auto py-auto" style={imgStyle} src={data.url_imagen}></img>
        </div>
        </div>
        
        

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
            
        <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                  <Modal.Title>Verificación de Tienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>¡Con tu información ayudas a las tiendas y a que los usuarios tengan compras más seguras! <br/>
                Al enviar este informe estas afirmando que la tienda si existe.  </p>   
                  </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary"  className="mx-auto" onClick={validar}>
                    Verificar
                  </Button>
                </Modal.Footer>
              </Modal>
                     
                          
                     
        
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