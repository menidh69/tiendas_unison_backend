import React, { Component, Fragment, useState } from 'react';
import {compose, withProps} from 'recompose';
import { Marker, withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import LandingNav from '../Landing-Registro/LandingNav'

const MapReg = (props)=>{

const [markerPosition, setMarkerPosition] = useState(props.values.coordinates || null)
const [markerShown, setMarkerShown] = useState(true)



  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  const next = e => {
    e.preventDefault();
    props.nextStep();
  };

const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`,
        loadingElement: <div style={{height: "100%"}}/>,
        containerElement: <div style={{height: "450px"}}/>,
        mapElement: <div style={{height: "100%"}}/>
    }),
    withScriptjs,
    withGoogleMap
)((props)=>
<GoogleMap 
defaultZoom={17} 
defaultCenter={markerPosition || {lat: 29.0824139, lng: -110.966389}}
onClick={setLocation}
>
<Marker position={markerPosition}></Marker>
{markerShown && <Marker position={markerPosition}/>}
</GoogleMap>
);

const setLocation = (e)=>{
    const latLng = e.latLng;
    let latitud = latLng.lat()
    let longitud = latLng.lng()
    let coordinates = {
        lat: latitud,
        lng: longitud
    }
    setMarkerPosition(latLng)
    setMarkerShown(true)
    props.handleLocation(coordinates)

}

return(
    <Fragment>
    <LandingNav></LandingNav>
    <div className="row my-4">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="container bg-color rounded-lg text-light">
                <h1 className="text-center my-10 pt-2">Establece tu ubicacion</h1>
            </div>
            <Map></Map>
            <div className="container text-center">
                <button className="btn btn-lg btn-warning my-4 mx-5" onClick={back}>Atras</button>
                <button className="btn btn-lg btn-warning my-4 mx-5" onClick={next}>Siguiente</button>
            </div>
        </div>
        <div className="col-md-2"></div>
        </div>
    </Fragment>
)

}

export default MapReg;