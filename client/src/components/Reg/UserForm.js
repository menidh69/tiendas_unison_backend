import React, { Component, useState } from 'react';
import RegistroGeneral from './RegGen';
import RegTienda from './RegTienda';
import Confirm from './Confirm';
import Success from './Success';
import RegGen from './RegGen';
import {useHistory} from "react-router-dom";
import {storage} from '../../firebase';
import MapReg from './MapReg';


export class UserForm extends Component {
    state = {
      step: 1,
      nombre: '',
      email: '',
      contra: '',
      contraConfirm: '',
      telefono: '',
      universidad: '',
      nombretienda: '',
      horario: '',
      tipo_tienda: '',
      url_imagen: '',
      tarjeta: '',
      uni_nombre: '',
      coordinates: null,
      lat: null,
      lng: null
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
    if(input=='universidad'){
      this.setState({
        universidad: e.target.value,
        uni_nombre: e.target.options[e.target.selectedIndex].text,
        coordinates: null,
        lat: null,
        lng: null
      });
      
    }
    this.setState({ [input]: e.target.value });
  };

  handleLocation = (coordinates)=>{
    this.setState({coordinates: coordinates,
      lat: coordinates.lat,
    lng: coordinates.lng})
    
  }

  handleUpload = (file) => {


    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {

      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            this.setState({url_imagen: url})
            console.log(url)
          });
        }
      );
  }

  checkempty = ()=>{
    let empty;
    console.log(this.state)
    Object.values(this.state).map((value, index)=>{
      if(value==''){
        if(!(index==9)){
          empty = true;
        console.log(index);
        }
        
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
      const response = await fetch('http://localhost:5000/api/v1/tiendas',
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
      const { nombre, email, contra, contraConfirm, telefono, universidad, nombretienda, tipo_tienda, url_imagen, tarjeta, horario, uni_nombre, latitud, longitud, coordinates } = this.state;
      const values = { nombre, email, contra, contraConfirm, telefono, universidad, nombretienda, tipo_tienda, url_imagen, tarjeta, horario, uni_nombre, latitud, longitud, coordinates };

    switch (step) {
      case 1:
        return (
          <RegGen
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            universidades={this.state.universidades}
          />
        );
      case 2:
        return (
          <RegTienda
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            values={values}
          />
        );
        case 3:
          return(
            <MapReg nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleLocation={this.handleLocation}
            />
          )
      case 4:
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
