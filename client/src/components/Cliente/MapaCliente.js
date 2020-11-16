import React, {Fragment, useContext, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {compose, withProps} from 'recompose';

const MapaCliente = (props)=>{

const {user, setUser} = useContext(UserContext)
const [items, setItems] = useState()
const [selectedTienda, setSelectedTienda] = useState(null)

useEffect(()=>{
    fetchitems();
}, []);

const fetchitems = async ()=>{
    const data = await fetch(`http://localhost:5000/api/v1/universidades/tiendas/${user.id_universidad}`);
    const items = await data.json();
    console.log(items)
    setItems(items)
};

// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//   efaultZoom={17} 
//   defaultCenter={{lat: 29.0824139, lng: -110.966389}}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     {items.map(tienda =>(
//     <Marker
//     key={tienda['tienda.id']}
//     position={{
//         lat: parseFloat(tienda['tienda.ubicacion.lat']),
//         lng: parseFloat(tienda['tienda.ubicacion.lng'])
//     }}
//     onClick={()=>{
//         setSelectedTienda(tienda);
//     }}
//     />

// ))}

// {selectedTienda && (
//     <InfoWindow position={{
//         lat: parseFloat(selectedTienda['tienda.ubicacion.lat']),
//         lng: parseFloat(selectedTienda['tienda.ubicacion.lng'])
//     }}
//     onCloseClick={()=>{setSelectedTienda(null);}}
//     >
//         <div>Tienda seleccionada</div>
//         </InfoWindow>
// )}
// </GoogleMap>
// ))

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
defaultCenter={{lat: 29.0824139, lng: -110.966389}}
>
{items.map(tienda =>(
    <Marker
    key={tienda['tienda.id']}
    position={{
        lat: parseFloat(tienda['tienda.ubicacion.lat']),
        lng: parseFloat(tienda['tienda.ubicacion.lng'])
    }}
    onClick={()=>{
        setSelectedTienda(tienda);
    }}
    />

))}

{selectedTienda && (
    <InfoWindow position={{
        lat: parseFloat(selectedTienda['tienda.ubicacion.lat']),
        lng: parseFloat(selectedTienda['tienda.ubicacion.lng'])
    }}
    onCloseClick={()=>{setSelectedTienda(null);}}
    >
        <div>Tienda seleccionada</div>
        </InfoWindow>
)}
</GoogleMap>
)
return(
    <Map/>
)
}

export default MapaCliente;