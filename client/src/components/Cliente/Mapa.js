import React, {Fragment, useContext, useEffect, useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';

const Mapa = withScriptjs(withGoogleMap((props) => 

<GoogleMap defaultZoom={17} defaultCenter={{lat: 29.0824139, lng: -110.966389}}></GoogleMap>

))

export default Mapa;