import React, { Component } from 'react';
import RegistroGeneral from './RegGen';
import RegTienda from './RegTienda';
import Confirm from './Confirm';
import Success from './Success';
import RegGen from './RegGen';
import {useHistory} from "react-router-dom";


export class UserForm extends Component {
  state = {
    step: 1,
    nombre: '',
    email: '',
    contra: '',
    telefono: '',
    universidad: '',
    nombretienda: '',
    horario: '',
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

  checkempty = ()=>{
    let empty;
    console.log(this.state)
    Object.values(this.state).map((value, index)=>{
      if(value==''){
        empty = true;
        console.log(index);
      }
    });
    return empty;
  }

  submit = async () =>{
    if(this.checkempty()){
      alert('Llena todos los campos')
    }else{
    try{
      const body = this.state;
      console.log(JSON.stringify(body))
      const response = await fetch('http://localhost:5000/api/v1/tienda',
      {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      })
      .then(async resp =>{
          const result = await resp.json()
          console.log(result)
          if(result.error){
              console.log(result.error)
              console.log(result)
              console.log(result)
              this.props.history.push("/")
          }else{
            console.log(result.status)
              console.log(result.message)
              this.props.history.push("/")
          }
      })
  this.nextStep()
  }catch(err){
    console.log(err)
    console.log('algo salio mal')
  }
}
  }
  

  handleMouseDownPassword = (event) => {
    this.event.preventDefault();
  };

  render() {
      const { step } = this.state;
      const { nombre, email, contra, telefono, universidad, nombretienda, tipo_tienda, img_tienda, tarjeta, horario } = this.state;
      const values = { nombre, email, contra, telefono, universidad, nombretienda, tipo_tienda, img_tienda, tarjeta, horario };

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
            submit={this.submit}
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
