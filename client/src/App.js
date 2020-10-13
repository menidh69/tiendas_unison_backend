import React, { Fragment, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//componentes
import Login from './components/Login/Login'
import Registro from './components/Landing-Registro/Registro'

import Admin from './components/Admin/Admin'
import Panel from './components/Tienda/Panel'

import Home from './components/Cliente/Home';
import UserForm from './components/Reg/UserForm'

import RegistroGeneral from './components/Landing-Registro/RegistroGeneral'
import RegistroTienda from './components/Landing-Registro/RegistroTienda'
import RegistroUniversidad from './components/Landing-Registro/RegistroUniversidad'
import OlvidarContra from './components/Login/OlvidarContra'
import Restablecer from './components/Login/Restablecer'
import LandingPage from './components/Landing-Registro/LandingPage'
import LoginFactory from './components/Factory'
import { UserContext } from './UserContext'
import RegistroTipo from './components/Landing-Registro/RegistroTipo'

import MiInfo from './components/Tienda/MiInfo'



function App() {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser}), [user, setUser]);

  const storedToken = localStorage.getItem('token.tuw');
  const [token, setToken] = useState(storedToken || null);

  const checkSignIn = async ()=>{
      if(token){
        const response = await fetch('http://localhost:5000/api/v1/auth/user',
              {
                  method: "GET",
                  headers: {
                    "x-auth-token": token
                }
              })
              .then(async resp=>{
                const usuario = await resp.json();
                if(resp.status==400){
                  console.log('no user')
                  console.log(usuario)
                  localStorage.removeItem('token.utw')
                }else{
                  console.log(usuario)
                console.log(resp)
                setUser(usuario)
                }
              })
      }
  }
  // checkSignIn();

  useLayoutEffect(()=>{
    checkSignIn();
  }, [])


  if (user != null) {
    console.log(value.user)
    const usuario = value.user;
    console.log(usuario)
    switch (usuario.tipo_usuario) {
      case 'cliente':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
              <Route path="/home" component={Home}/>
              <Redirect from="/" to="/home"/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'admin':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
              <Route path="/admin" component={Admin}/>
                <Route path="/" component={Admin}/>
                <Redirect from="/" to="/admin"/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'tienda':
        return(
          <Router>
            <UserContext.Provider value={value}>
              <Switch>
              <Route path="/panel" component={Panel}/>
                <Redirect from="/" to="/panel"/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
          case 'default':
            return(<h1>Algo esta mal</h1>)
    }


  } else {

    console.log(value);

    return(

      <Router>
      <Fragment>

          <UserContext.Provider value={value}>
            <Switch>
              <Route path="/login" exact component={Login}/>
              <Route path="/registro/tienda" exact component={UserForm}/>
              <Route path="/registro" exact component={RegistroTipo}/>
              <Route path="/registro/cliente" exact component={RegistroGeneral}/>
              <Route path="/registrouniversidad" exact component={RegistroUniversidad}/>
              <Route path="/olvidarcontra" exact component={OlvidarContra}/>
              <Route path="/reestablecer/:token" component={Restablecer}/>
              <Route path="/" exact component={LandingPage}/>

              <Route path="/MiInfo" exact component={MiInfo}/>
              <Redirect to="/" />
            </Switch>
          </UserContext.Provider>
      </Fragment>
      </Router>
      );
  }


}

export default App;
