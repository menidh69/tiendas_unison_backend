import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';


export class Confirm extends Component {
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
      const {
          values: { nombre, email, telefono, contra, universidad, nombre_tienda, tipo_tienda, img_tienda, tarjeta }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirma tus datos" />
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
            >Confirma & Continua</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
