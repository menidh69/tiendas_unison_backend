import React, { Fragment } from 'react';
import './App.css';

//componentes
import Login from './components/Login'
import Registro from './components/Registro'


function App() {
  return(
    <Fragment> 
      <div className="container">
        <Login/>
        <Registro/>
      </div>
    </Fragment>
    );
}

export default App;
