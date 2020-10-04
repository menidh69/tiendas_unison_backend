import React, { Fragment, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

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
import LoginFactory from './components/Factory'
import { UserContext } from './UserContext'




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
                
                  <Route path="/" component={Home}/>
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
                <Route path="/" component={Admin}/>
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
                <Route path="/" component={Panel}/>
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
              <Route path="/registro" exact component={UserForm}/>
  
              
              <Route path="/registrogeneral" exact component={RegistroGeneral}/>
              <Route path="/registrouniversidad" exact component={RegistroUniversidad}/>
              <Route path="/olvidarcontra" exact component={OlvidarContra}/>
              <Route path="/Restablecer" exact component={Restablecer}/>
              <Route path="/" exact component={LandingPage}/>
              <Redirect to="/" />
            </Switch>
          </UserContext.Provider>
      </Fragment>
      </Router>
      );
  }


}

export default App;
