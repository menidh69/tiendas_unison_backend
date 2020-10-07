import React, {Fragment, useState, useMemo, useContext} from 'react'
import Registro from './Landing-Registro/Registro'
import {useHistory} from "react-router-dom";
import { UserContext } from '../UserContext'
import Facebook from './Login/Facebook'
import {Router, Switch, Route} from 'react-router-dom';
import Home from './Cliente/Home';
import Admin from './Admin/Admin';
import Panel from './Tienda/Panel';
import LoginForm from './Login/Login';

const Login = ()=>{
  const {user, setUser} = useContext(UserContext);
  if(user!==null && user.user.isLoggedIn){
      console.log('El usuario esta login')
    return <LoginFactory></LoginFactory>
  }else{
    console.log('El usuario no esta login')
    return <LoginForm></LoginForm>
  }
}


const LoginFactory = ()=>{
  const {user, setUser} = useContext(UserContext);

    switch (user.user.tipo) {
      case 'cliente':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/home" component={Home}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'admin':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/admin" component={Admin}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'tienda':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/tienda" component={Panel}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'default':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/home" component={Home}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
    }
}
export default LoginFactory;