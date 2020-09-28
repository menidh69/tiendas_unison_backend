import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';




export class RegGen extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }


  render() {
    const { values, handleChange, handleMouseDownPassword, } = this.props;

    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Registrate aqui" />
            <TextField
              label="Nombre"
              onChange={handleChange('nombre')}
              defaultValue={values.nombre}
              margin="normal"
              fullWidth
            />

            <br />
            <TextField
              placeholder="Email"
              label="Email"
              onChange={handleChange('email')}
              defaultValue={values.email}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField
              placeholder="contra"
              label="Contrasena"
              type= "password"
              margin="normal"
              fullWidth
            />


           <br />
            <TextField
              placeholder="confirma contra"
              label="Confirma contrasena"
              type="password"
              onChange={handleChange('contra')}
              defaultValue={values.contra}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField
              placeholder="telefono"
              label="Telefono"
              onChange={handleChange('telefono')}
              defaultValue={values.telefono}
              margin="normal"
              fullWidth
            />
            <br />


            <InputLabel id="uni-label">Universidad</InputLabel>
              <Select
              placeholder="universidad"
              label="Universidad"
              id="uni"
              onChange={handleChange('universidad')}
              >
              <MenuItem value={'UNI SON'}>Universidad Sonora</MenuItem>
              <MenuItem value={'UNI vizca'}>Uni viscaya</MenuItem>
              <MenuItem value={'TEC'}>TEC</MenuItem>
            </Select>
            <br />

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Siguiente</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default RegGen;
