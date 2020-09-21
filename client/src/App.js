import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//componentes
import Login from './components/Login'
import Registro from './components/Registro'


function App() {
  return(
    <Router>
    <Fragment> 
      <div className="container">
        <Switch>
        {/* Agregar aquí las interfaces principales como Routes, ver el tutorial */}
        <Route path="/login" component={Login}/>
        {/* Insertar Landing page aqui */}
        <Route path="/" component={'Landing'}/>
        </Switch>
      </div>
    </Fragment>
    </Router>
    );
}

export default App;
