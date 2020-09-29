import React, {Fragment} from 'react';
import ClienteNavBar from './ClienteNavBar';
import Contenido from './Contenido'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Home = ()=>{
    return(
        <Fragment>
            <ClienteNavBar/>
            <Contenido/>
        </Fragment>
    )
}

export default Home;
