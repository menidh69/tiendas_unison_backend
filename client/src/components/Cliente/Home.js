import React, {Fragment, useContext} from 'react';
import ClienteNavBar from './ClienteNavBar';
import Contenido from './Contenido'
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IndexTiendas from './IndexTiendas';
import TiendaInfo from './TiendaInfo'
const Home = ()=>{
  
    const {user, setUser} = useContext(UserContext);
    return(
        <Router>

            <ClienteNavBar/>
            <Switch>
                <Route path='/home' exact component={Contenido}/>
                <Route path='/tiendas' exact component={IndexTiendas}/>
                <Route path='/tiendas/:id' exact component={TiendaInfo}/>
            </Switch>
        </Router>
        
    )
}

export default Home;
