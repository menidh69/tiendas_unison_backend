import React, {Fragment, useCallback, useContext, useEffect, useState, useRef} from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxOption, ComboboxInput, ComboboxPopover, ComboboxList} from '@reach/combobox';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import "@reach/combobox/styles.css"
import MapStyles from '../MapStyles';

// const Map = (props)=>{
//     const options ={
//         styles: MapStyles,
//         disableDefaultUI: true,
//     }


//     return(
//         <Fragment>
        
//         <GoogleMap
//         defaultZoom={5} 
//         defaultCenter={{lat: 29.08254818, lng: -110.96178531}}
//         options={options}
//         onClick={props.onMapClick}
//         >
//         {props.markerPosition && 
//         <Marker
//         position={props.markerPosition}
//         />
//         }
//         </GoogleMap>

//         </Fragment>
//     )
    

// }

// const MyMapComponent = withScriptjs(withGoogleMap(Map))

// const loadGMaps = (callback) => {
//     const existingScript = document.getElementById('googleMaps');
//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo&libraries-places';
//       script.id = 'googleMaps';
//       document.body.appendChild(script);
//       script.onload = () => { 
//         if (callback) callback();
//       };
//     }
//     if (existingScript && callback) callback();
//   };
const libraries = ["places"]

const MapaUni= (props)=>{
    const mapRef = useRef()
    const onMapLoad = useCallback((map)=>{
        mapRef.current = map;
    }, [])

    const [markerPosition, setMarkerPosition] = useState()

    const panTo = useCallback(({lat, lng})=>{
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(16)
    }, [])
    
    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    }
    const center = {
        lat: 23.634501, 
        lng:  -102.552784
    }
    const options ={
                styles: MapStyles,
                disableDefaultUI: true,
            }
   
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo',
        libraries,
    })
    if(loadError) return "Error loading map";
    if(!isLoaded) return "loading"
    const style=
    {
        width: "100%",
        height: "400px"
    }

    return(
        <Fragment>
            <Search panTo={panTo} setMarkerPosition={props.setMarkerPosition} setData={props.setData}/>
            <div style={style}>
            <GoogleMap mapContainerStyle={mapContainerStyle} 
            zoom={5} 
            center={props.markerPosition || center}
            options={options}
            onClick={props.onMapClick}
            onLoad={onMapLoad}
            >

                {props.markerPosition && <Marker position={props.markerPosition}/>}
            </GoogleMap>
            </div>
        {/* <Search/>
        <MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcUw9PQsvW0euSqylR6x4rCBXLpFn6VCo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMapClick={props.onMapClick}
        markerPosition={props.markerPosition}
        /> */}
        </Fragment>
    )

}

const Search = ({panTo, setMarkerPosition, setData})=>{
   
    const {
        ready, value, suggestions:{status, data}, setValue, clearSuggestions
     }= usePlacesAutocomplete({
         requestOptions: {
             location: {lat: ()=> 23.634501, lng: ()=>-102.552784},
             radius: 200 * 1000
         },
     })
     return (
         <div className="my-4 w-100 rounded">
             
     <Combobox className="w-100" 
         onSelect={async (address)=>{
        setValue(address, false);
        clearSuggestions();
         try{
            const results = await getGeocode({address})
            const {lat, lng} = await getLatLng(results[0])
            panTo({lat,lng})
            console.log(results[0]);
            setMarkerPosition({
                lat: lat,
                lng: lng
            })
            const nombre = address
            const ciudad = results[0]['address_components'][3]['long_name']
            const estado = results[0]['address_components'][4]['long_name']
            console.log(ciudad, estado, nombre)
            const datos = {
                nombre: nombre,
                ciudad: ciudad,
                estado: estado
            }
            setData(datos)
            
         }catch(err){
            console.log(err)
         }
         }}>
         <ComboboxInput className="w-100 rounded" value={value} 
         onChange={(e)=> setValue(e.target.value)} 
         disabled={!ready}
         placeholder="Ingresa el nombre de tu universidad"/>
         <ComboboxPopover>
             <ComboboxList>
             {status ==="OK" && 
             data.map(({id, description})=>(
                 <ComboboxOption key={id} value={description}/>
             ))}
             </ComboboxList>
         </ComboboxPopover>
 
     </Combobox>
     
     </div>
     )
 
 }
export default MapaUni;