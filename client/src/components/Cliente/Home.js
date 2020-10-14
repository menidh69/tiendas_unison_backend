import React, {Fragment, useContext} from 'react';
import ClienteNavBar from './ClienteNavBar';
import Contenido from './Contenido'
import { UserContext } from '../../UserContext'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Home = ()=>{
  
    const {user, setUser} = useContext(UserContext);
    return(
        <Fragment>
            <ClienteNavBar/>
            <Contenido/>
        </Fragment>
    )
}

export default Home;
