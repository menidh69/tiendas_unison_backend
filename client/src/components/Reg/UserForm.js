import React, { Component } from 'react';
import RegistroGeneral from './RegGen';
import RegTienda from './RegTienda';
import Confirm from './Confirm';
import Success from './Success';
import RegGen from './RegGen'

export class UserForm extends Component {
  state = {
    step: 1,
    nombre: '',
    email: '',
    contra: '',
    telefono: '',
    universidad: '',
    nombre_tienda: '',
    tipo_tienda: '',
    img_tienda: '',
    tarjeta: '',

  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };




  handleMouseDownPassword = (event) => {
    this.event.preventDefault();
  };

  render() {
      const { step } = this.state;
      const { nombre, email, contra, telefono, universidad, nombre_tienda, tipo_tienda, img_tienda, tarjeta } = this.state;
      const values = { nombre, email, contra, telefono, universidad, nombre_tienda, tipo_tienda, img_tienda, tarjeta };

    switch (step) {
      case 1:
        return (
          <RegGen
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <RegTienda
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;

    }
  }
}

export default UserForm;
