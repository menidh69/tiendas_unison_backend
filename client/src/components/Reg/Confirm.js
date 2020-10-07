import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import LandingNav from '../Landing-Registro/LandingNav';



export class Confirm extends Component {
  submit = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.submit();
  };


  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
      const {
          values: { nombre, email, telefono, contra, universidad, nombretienda, tipo_tienda, img_tienda, tarjeta, horario }
    } = this.props;
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
             <div className="container bg-primary rounded py-4">
               <h1 className="my-4 text-center"> Confirma tus datos</h1>
            <ul class="list-group list-group-flush bg-primary text-light">
              <li class="list-group-item bg-primary">
                <h5>Nombre</h5>
                <p>{nombre}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Email</h5>
                <p>{email}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Contraseña</h5>
                <p>{contra}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Telefono</h5>
                <p>{telefono}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Universidad</h5>
                <p>{universidad}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Nombre de la tienda</h5>
                <p>{nombretienda}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Tipo de tienda</h5>
                <p>{tipo_tienda}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Imagen</h5>
                <p>{img_tienda}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Aceptan tarjeta?</h5>
                <p>{tarjeta}</p>
              </li>
              <li class="list-group-item bg-primary">
                <h5>Horario</h5>
                <p>{horario}</p>
              </li>
            </ul>
            <div className="container text-center my-4">
            <button className="btn btn-lg btn-warning rounded mx-4" onClick={this.back}>Atras</button>
            <button className="btn btn-lg btn-warning rounded mx-4" onClick={this.submit}>Confirmar y continuar</button>
            </div>
            </div>
            </div>
            <div className="col-md-3"></div>
            </div>
            {/* <AppBar title="Confirma tus datos" />
            <List>
              <ListItem>
                <ListItemText primary="Nombre" secondary={nombre} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contrasena" secondary={contra} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Telefono" secondary={telefono} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Universidad" secondary={universidad} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nombre de la tienda" secondary={nombre_tienda} />
                </ListItem>
              <ListItem>
                <ListItemText primary="Tipo de tienda" secondary={tipo_tienda} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Imagen tienda *url de la imagen" secondary={img_tienda} />
              </ListItem>

              <ListItem>
                <ListItemText primary="Aceptan tarjeta" secondary={tarjeta} />
              </ListItem>


            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Atras</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirma & Continua</Button> */}
          {/* </Dialog> */}
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
