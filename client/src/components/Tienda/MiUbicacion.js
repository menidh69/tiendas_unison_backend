import React, {Fragment, useContext, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, InfoBox} from 'react-google-maps';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {compose, withProps} from 'recompose';
import MapStyles from '../MapStyles';
import {Modal, Button} from 'react-bootstrap';


function Map(props){

  
    const options ={
        styles: MapStyles,
        disableDefaultUI: true,
    }


    return(

        <GoogleMap
        defaultZoom={16} 
        defaultCenter={{lat: 29.082548182329212, lng: -110.96178531646729}}
        options={options}
        onClick={props.onMapClick}
        >
        {props.editable ?
        <Marker
        position={{
            lat: parseFloat(props.info.lat),
            lng: parseFloat(props.info.lng)
        }}
        />
        :
        <Marker
        position={{
            lat: parseFloat(props.info['ubicacion.lat']),
            lng: parseFloat(props.info['ubicacion.lng'])
        }}
        />
        }
        
 
               
               
        </GoogleMap>
    )
}
const MyMapComponent = withScriptjs(withGoogleMap(Map))

const MiUbicacion = (props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [markerPosition, setMarkerPosition] = useState({
    //   lat: props.info['ubicacion.lat'],
    //   lng: props.info['ubicacion.lng']
    // })

    
   
    const Guardar = ()=>{
        handleClose();
        props.Guardar();
    }
    return(
        
        <div>
    <MyMapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
    info={props.info}
    onMapClick={null}
    editable={false}
/>
<button className="btn btn-primary mx-2 my-4" onClick={handleShow}>Editar Ubicacion</button>
<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Editar Ubicacion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        Haz clic en el mapa para seleccionar la ubicacion de tu tienda
        <MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
            info={props.markerPosition}
            editable={true}
            onMapClick={props.setLocation}
        />
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Cancelar
        </Button>
        <Button variant="primary" onClick={Guardar}>
        Guardar
        </Button>
    </Modal.Footer>
</Modal>
</div>



    )
}

export default MiUbicacion;