import React, {Fragment} from 'react';
import TiendaNavBar from './TiendaNavBar';
import Opciones from './Opciones';
import MiInfo from './MiInfo';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Panel = ()=>{
    return(
        <Router>
                <TiendaNavBar/>

                <Switch>
                    <Route path='/panel' exact component= {Opciones}></Route>
                    <Route path='/panel/MiInfo' exact component={MiInfo}></Route>
                </Switch>


        </Router>
    )
}

export default Panel;
