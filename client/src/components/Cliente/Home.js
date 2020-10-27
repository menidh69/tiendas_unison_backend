import React, {Fragment, useContext, useMemo} from 'react';
import ClienteNavBar from './ClienteNavBar';
import Contenido from './Contenido'
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IndexTiendas from './IndexTiendas';
import PerfilCliente from './PerfilCliente';
import TiendaInfo from './TiendaInfo';
import Menu from './Menu';
import SelectUni from './SelectUni';

const Home = (props)=>{
  
    const {user, setUser} = useContext(UserContext);
    const value = useMemo(() => ({ user, setUser}), [user, setUser]);
    
    return(
        <Router>
            <UserContext.Provider value={value}>
            <ClienteNavBar/>
            <Switch>
                <Route path='/home' exact component={Contenido}/>
                <Route path='/tiendas' exact component={IndexTiendas}/>
                <Route path='/PerfilCliente' exact component={PerfilCliente}/>
                <Route path='/tiendas/:id' exact component={TiendaInfo}/>
                <Route path='/tiendas/:id/menu' exact component={Menu}/>
            </Switch>
            </UserContext.Provider>
        </Router>
        
    )
}

export default Home;
