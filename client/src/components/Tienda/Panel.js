import React, {Fragment} from 'react';
import TiendaNavBar from './TiendaNavBar';
import Opciones from './Opciones';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Panel = ()=>{
    return(
        <Fragment>
            <TiendaNavBar/>
            <Opciones/>
        </Fragment>
    )
}

export default Panel;