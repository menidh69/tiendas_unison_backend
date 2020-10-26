import React, {Fragment} from 'react';
import TiendaNavBar from './TiendaNavBar';
import Opciones from './Opciones';
import MiInfo from './MiInfo';
import MenuTienda from './MenuTienda';
import EditarMenu from './EditarMenu';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Panel = ()=>{
    return(

            <Router>
            <TiendaNavBar/>
                <Switch>
                    <Route path="/panel/Menu/EditarMenu/AgregarProducto" exact component={AgregarProducto}></Route>
                    <Route path="/panel/Menu/EditarMenu" exact component={EditarMenu}></Route>
                    <Route path="/panel" exact component={Opciones}></Route>
                    <Route path="/panel/MiInfo" exact component={MiInfo}></Route>
                    <Route path="/panel/Menu" exact component={MenuTienda}></Route>
                    <Route path="/panel/Menu/EditarMenu/EditarProducto/:id" exact component={EditarProducto}></Route>
                </Switch>
            </Router>
            
        

    )
}

export default Panel;
