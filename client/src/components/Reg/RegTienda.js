import React, { Component, useState } from 'react';
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
import LandingNav from '../Landing-Registro/LandingNav';




export class RegTienda extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleUpload = e => {
    if (e.target.files[0]){
      this.props.handleUpload(e.target.files[0])
    }
  };


  render() {
      const { values, handleChange} = this.props;

    return (

      <MuiThemeProvider>
        <>
          {/* <Dialog
            open
            fullWidth
            maxWidth='sm'
          > */}
          <LandingNav></LandingNav>
            <div className="row my-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
            <div className="container w-30 bg-color rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registra tu Tienda</h1>

                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="Name_tienda">Nombre de Tienda</label>
                        <input className="form-control"  onChange={handleChange('nombretienda')}
              defaultValue={values.nombretienda} id="Name_tienda" type="text"></input>
                    </div>

                    <div className="form-group text-left" onChange={handleChange('tipo_tienda')}>
                        <label for="Tipo_tienda">Tipo de Tienda</label>
                        <div class="form-check">
                          <input  className="form-check-input" id="cooperativa" type="radio" value="1"></input>
                          <label for= "cooperativa" className="form-check-label">Cooperativa</label>
                        </div>
                          <div class="form-check">
                          <input className="form-check-input" id="puesto" type="radio" value="2"></input>
                            <label for= "puesto" className="form-check-label">Puesto</label>
                          </div>
                          <div class="form-check">
                          <input className="form-check-input" id="cafeteria" type="radio" value="3"></input>
                            <label for= "cafeteria" className="form-check-label">Cafetería</label>
                          </div>

                    </div>

                    <div className="form-group text-left">
                        <label for="Horario">Horario</label>
                        <input id="Horario" className="form-control" onChange={handleChange('horario')} type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="Universidad">Universidad</label>
                        <input className="form-control" id="Universidad" onChange={handleChange('universidad')}
              defaultValue={values.universidad} type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="url_imagen">Subir Imagen Tienda</label>
                          <input type="file" id="url_imagen" onChange={ this.handleUpload }
                defaultValue={values.url_imagen} className="form-control"></input>




                    </div>

                    <div className="form-group text-left">
                    <label>Aceptan tarjeta</label>
                    <div name = 'tar'  onChange={handleChange('tarjeta')} className="form-group text-left">
                        <label for= "Tarjeta_Si">Si</label>
                        <input  id="Tarjeta_Si" type="radio" value="true"></input>
                        <label for= "Tarjeta_No">No</label>
                        <input id="Tarjeta_No" type="radio" value="false"></input>
                    </div>
                    </div>
                    <div>
                      <small>*Tiene un mes de prueba a partir de ese plazo se le hara un cobro a su tarjeta</small>
                    </div>
                    <div className="container text-center">
                    <button className="btn btn-lg btn-warning my-4 mx-5" onClick={this.back}>Atras</button>
                    <button className="btn btn-lg btn-warning my-4 mx-5" onClick={this.continue}>Siguiente</button>
                    </div>
                </form>
            </div>
            </div>
            <div className="col-md-3"></div>
            </div>
            {/* <AppBar title="Detalles de la tienda" />
            <TextField
              required
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
            required
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
              required
              placeholder="universidad"
              label="universidad"
              onChange={handleChange('universidad')}
              defaultValue={values.universidad}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField
              required
              placeholder="img tienda"
              label="imagen"
              onChange={handleChange('url_imagen')}
              defaultValue={values.url_imagen}
              margin="normal"
              fullWidth
            />

             <br />

            <label>Aceptan tarjeta:</label>
            <RadioGroup required aria-label="tarjeta" name="tarjeta1" onChange={handleChange('tarjeta')}>
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
            >Siguiente</Button> */}
          {/* </Dialog> */}
        </>
      </MuiThemeProvider>
    );
  }
}

export default RegTienda;
