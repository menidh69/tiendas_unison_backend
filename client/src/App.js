import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//componentes
import Login from './components/Login'
import Registro from './components/Registro'

import Admin from './components/Admin/Admin'
import Panel from './components/Tienda/Panel'

import Home from './components/Cliente/Home';
import UserForm from './components/Reg/UserForm'

import RegistroGeneral from './components/RegistroGeneral'
import RegistroTienda from './components/RegistroTienda'
import RegistroUniversidad from './components/RegistroUniversidad'
import OlvidarContra from './components/OlvidarContra'
import Restablecer from './components/Restablecer'
import LandingPage from './components/LandingPage'




function App() {
  return(

    <Router>
    <Fragment>
        <Switch>

        {/* Agregar aquí las interfaces principales como Routes, ver el tutorial */}
        <Route path="/login" component={Login}/>
        <Route path="/registro" component={UserForm}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/tienda" component={Panel}/>

        <Route path="/cliente" component={Home}/>
        <Route path="/registrogeneral" component={RegistroGeneral}/>
        <Route path="/registrouniversidad" component={RegistroUniversidad}/>
        <Route path="/olvidarcontra" component={OlvidarContra}/>
        <Route path="/Restablecer" component={Restablecer}/>
        <Route path="/Login" component={Login}/>
        <Route path="/" component={LandingPage}/>

        

        </Switch>
    </Fragment>
    </Router>
    );
}

export default App;
