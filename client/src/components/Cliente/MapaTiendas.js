import React, {Fragment, useContext, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, InfoBox} from 'react-google-maps';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {compose, withProps} from 'recompose';
import MapStyles from '../MapStyles';


function Map(props){
    const {user, setUser} = useContext(UserContext)
    const [items, setItems] = useState([])
    const [selectedTienda, setSelectedTienda] = useState(null)
    // const [myPosition, setMyPosition] = useState(null);

    // function getLocation(){
    //     if(navigator.geolocation){
    //         const latlng = navigator.geolocation.getCurrentPosition(getCoordinates);
    //     }else{
    //         alert("Geolocation not supported by browser")
    //     }
    // }

    // function getCoordinates(position){
    //     setMyPosition({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude
    //     })
    //     console.log(position.coords.latitude)
    //     console.log(position.coords.longitude)
    // }

    useEffect(()=>{
        let isMounted = true;
        fetchitems()
        .then(json=>{
            if(isMounted) setItems(json)
        })
        return ()=>isMounted=false;
    }, []);

    const fetchitems = async ()=>{
        const data = await fetch(`http://localhost:5000/api/v1/universidades/tiendas/${user.id_universidad}`);
        const json = await data.json();
        console.log(json)
        return json;
        
    };

    const options ={
        styles: MapStyles,
        disableDefaultUI: true,
  
    }
    const imgStyle={
        maxWidth: '150px'
    }
    return(
        <GoogleMap
        defaultZoom={16.5} 
        defaultCenter={{lat: 29.082548182329212, lng: -110.96178531646729}}
        options={options}
        >
             
        {items.map(tienda =>(
        <Marker
        key={tienda['tienda.id']}
        position={{
            lat: parseFloat(tienda['tienda.ubicacion.lat']),
            lng: parseFloat(tienda['tienda.ubicacion.lng'])
        }}
        icon={{
            url: "/store-solid.svg",
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15)
        }}
        onClick={()=>{
            setSelectedTienda(tienda);
        }}
       
        />
        ))}
        {/* {myPosition ? (
        <Marker key="myPosition"
        position={{
            lat: myPosition.latitude,
            lng: myPosition.longitude
        }}
        
        />
        ):null} */}
        
         {selectedTienda ? (
            <InfoWindow position={{
                lat: parseFloat(selectedTienda['tienda.ubicacion.lat']),
                lng: parseFloat(selectedTienda['tienda.ubicacion.lng'])
            }}
            onCloseClick={()=>{setSelectedTienda(null)}}
            >
            <div class="card" style={imgStyle}>
                <img src={selectedTienda['tienda.url_imagen']}class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{selectedTienda['tienda.nombre']}</h5>
                    <Link to={`/tiendas/${selectedTienda['tienda.id']}/menu`}>
                    <button class="btn btn-primary rounded-pill" onClick={()=>setSelectedTienda(null)}>Ver menú</button>
                    </Link>
                </div>
            </div>       
            </InfoWindow>
        ): null}
               
               
        </GoogleMap>
    )
}
const MyMapComponent = withScriptjs(withGoogleMap(Map))

const MapaTiendas = (props)=>{

    return(
        <div>
    <MyMapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}

/>
</div>
    )
}

export default MapaTiendas;