import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import {Link} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Success" />
            <h1 className="text-dark text-center my-4">Tu cuenta ha sido registrada</h1>
            <p className="text-center">Revisa tu correo y confirma tu cuenta</p>
            <Link to="/login" className="mx-auto">
            <button className="btn btn-lg btn-primary mx-auto my-4">Iniciar Sesión</button>
            </Link>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;
