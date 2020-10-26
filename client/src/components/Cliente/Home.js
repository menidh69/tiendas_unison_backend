import React, {Fragment, useContext} from 'react';
import ClienteNavBar from './ClienteNavBar';
import Contenido from './Contenido'
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IndexTiendas from './IndexTiendas';
import PerfilCliente from './PerfilCliente';
import TiendaInfo from './TiendaInfo';
import Menu from './Menu';

const Home = ()=>{
  
    const {user, setUser} = useContext(UserContext);
    return(
        <Router>

            <ClienteNavBar/>
            <Switch>
                <Route path='/home' exact component={Contenido}/>
                <Route path='/tiendas' exact component={IndexTiendas}/>
                <Route path='/PerfilCliente' exact component={PerfilCliente}/>
                <Route path='/tiendas/:id' exact component={TiendaInfo}/>
                <Route path='/tiendas/:id/menu' exact component={Menu}/>
            </Switch>
        </Router>
        
    )
}

export default Home;
