import React, { Fragment } from 'react';
import './App.css';

//componentes
import Login from './components/Login'


function App() {
  return(
    <Fragment> 
      <div className="container">
        <Login/>
      </div>
    </Fragment>
    );
}

export default App;
