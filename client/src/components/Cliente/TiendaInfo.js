import React, {Fragment, useEffect, useState,useContext} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom'
import { UserContext } from '../../UserContext';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, InfoBox} from 'react-google-maps';
import MapStyles from '../MapStyles';
import StarIcon from './StarIcon';




const TiendaInfo = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const {user , setUser} = useContext(UserContext);
  const [validacion, setValidacion] = useState(false);
  const {id} = useParams();
  const [markerPosition, setMarkerPosition] = useState();
  const [stars, setStars] = useState([])


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    let isMounted = true;
    fetchdata()
    .then(json=>{
      if(isMounted){
      if(json.validada===false){
        fetchValidar();
    }
    setData(json)
    setMarkerPosition({
      lat: parseFloat(json.ubicacion.lat),
      lng: parseFloat(json.ubicacion.lng)
    })
    calculaRating(json.review_tiendas)
    
  }
  return ()=> isMounted=false;
    })
    // fetchValidar();
  }, [])

  const fetchValidar = async ()=>{
    const response = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/validar_tienda/${user.id}/tiendas/${id}`)
    const json = await response.json();
    console.log("tienda validacion personal:"+json.status);
    if(json.status=='false'){
      handleShow();
    }
    else{
    setValidacion(true)
    }
  }

  const calculaRating = (reviews)=>{
    let total = 0;
    reviews.map(review=>{
        total += review.calificacion
    })
    total = total / reviews.length
    let array = [];
    for(let i=0; i<total; i++){
        array.push(i);
    }
    setStars(array)
    return
}

  const fetchdata = async ()=>{
    const prom = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/${id}`);
    const record = await prom.json();
    console.log(record.tienda)
    return record.tienda[0];
  //   setData(record.tienda[0]);
  //   console.log("tienda validacion general:"+record.tienda[0].validada)
  //   if(record.tienda[0].validada===false){
  //     fetchValidar();
  // }
  //   console.log(record.tienda[0])

}

const reportar = async()=>{
  const response = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/reporte_tienda/${user.id}/${data.id}`,{
    method: "POST"
  })
  const json = await response.json();
  console.log(json)
  console.log(response)
}

const validar = async(id_usuario,id_tienda)=>{
  const response = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/validar_tienda/${user.id}/${id}`,{
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
        <h5 className="my-2">Calificacion</h5>
        <div>
          {stars.length>0 ? stars.map(star=>(<StarIcon fill={true}/>)):null}
        </div>
        <Link to={`/tiendas/${id}/menu`}>
        <button className="mx-auto text-center btn btn-lg rounded-pill btn-primary shadow btn-block my-4 ml-0 pl-0"> Ver menú </button>
        </Link>
        <div className="text-center">
        <button className="btn btn-lg btn-outline-danger rounded-pill mx-2 shadow" data-toggle="modal" href="#reportar">Reportar</button>
        {validacion ? null :
        <button  class="btn btn-outline-primary btn-lg rounded-pill mx-2 shadow" data-toggle="modal" href="#validar">Verificar tienda</button>
        }
        </div>
         
      </div>
      <div className="col-md-6 border rounded py-auto" style={bgStyle}>
            <img alt="Tienda" className="border my-auto py-auto" style={imgStyle} src={data.url_imagen}></img>
        </div>
        <div className="col-12 my-2 border rounded">
          <h1 className="my-4 text-dark">Ubicacion</h1>
          <MapaTienda markerPosition={markerPosition}/>
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
                             <div class="md-form">
                             <input type="text" id="inputMDEx" class="form-control"/>
                            <label for="inputMDEx">Razón de reporte</label>
                            </div>
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

const Map = (props)=>{

  const options ={
    styles: MapStyles,
    disableDefaultUI: true,

}

  return(
    <GoogleMap
          defaultZoom={16.5} 
          center={props.markerPosition}
          options={options}
          >

          <Marker
          position={props.markerPosition}
          icon={{
              url: "/store-solid.svg",
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15)
          }}
          />     
          </GoogleMap>
      )
}
const MyMapComponent = withScriptjs(withGoogleMap(Map))

const MapaTienda = (props)=>{
  console.log(props.markerPosition)
  return(
    <div>
      <MyMapComponent
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      markerPosition={props.markerPosition}
    />
</div>
)
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