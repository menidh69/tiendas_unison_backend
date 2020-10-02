import React, { Fragment, useState, useMemo } from 'react';
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

import { UserContext } from './UserContext'




function App() {

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser}), [user, setUser]);


  if (user != null) {
    const user = value.user;

    switch (user.tipo) {
      case 'cliente':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
                <Route path="/home" component={Home}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
      case 'admin':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
                <Route path="/admin" component={Admin}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
      case 'tienda':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
                <Route path="/tienda" component={Panel}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
    }


  } else {
    
    console.log(value);
    return(

      <Router>
      <Fragment>
          
  
          {/* Agregar aquí las interfaces principales como Routes, ver el tutorial */}
          
  
          <UserContext.Provider value={value}>
            <Switch>         
              <Route path="/login" component={Login}/>
              <Route path="/registro" component={UserForm}/>
  
              
              <Route path="/registrogeneral" component={RegistroGeneral}/>
              <Route path="/registrouniversidad" component={RegistroUniversidad}/>
              <Route path="/olvidarcontra" component={OlvidarContra}/>
              <Route path="/Restablecer" component={Restablecer}/>
              <Route path="/" component={LandingPage}/>
            </Switch>
          </UserContext.Provider>
      </Fragment>
      </Router>
      );
  }


}

export default App;
