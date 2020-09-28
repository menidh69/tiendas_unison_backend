import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';

export class RegTienda extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
      const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Detalles de la tienda" />
            <TextField
              placeholder="Nombre tienda"
              label="Nombre tienda"
              onChange={handleChange('nombre_tienda')}
              defaultValue={values.nombre_tienda}
              margin="normal"
              fullWidth
            />
            <br />
          <InputLabel id="tienda-label">Tipo de tienda</InputLabel>
            <Select
             placeholder="tipo de tienda"
             label="Tipo de tienda"
             id="tienda"
             onChange={handleChange('tipo_tienda')}
             >
            <MenuItem value={'Puestos'}>Puesto</MenuItem>
            <MenuItem value={'Cafeteria'}>Cafeteria</MenuItem>
            <MenuItem value={'Cooperativa'}>Cooperativa</MenuItem>
            </Select>
            <br />
            <TextField
              placeholder="universidad"
              label="universidad"
              onChange={handleChange('universidad')}
              defaultValue={values.universidad}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField
              placeholder="img tienda"
              label="imagen"
              onChange={handleChange('img_tienda')}
              defaultValue={values.img_tienda}
              margin="normal"
              fullWidth
            />

             <br />

            <label>Aceptan tarjeta:</label>
            <RadioGroup aria-label="tarjeta" name="tarjeta1" onChange={handleChange('tarjeta')}>
            <FormControlLabel value="true" control={<Radio />} label="Si" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Atras</Button>

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

export default RegTienda;
