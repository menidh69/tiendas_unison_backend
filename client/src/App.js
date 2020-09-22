import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//componentes
import Login from './components/Login'
import Registro from './components/Registro'
import Admin from './components/Admin/Admin'


function App() {
  return(
    <Router>
    <Fragment> 
        <Switch>
        {/* Agregar aquí las interfaces principales como Routes, ver el tutorial */}
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        {/* Insertar Landing page aqui */}
        <Route path="/" component={'Landing'}/>
        </Switch>
    </Fragment>
    </Router>
    );
}

export default App;
