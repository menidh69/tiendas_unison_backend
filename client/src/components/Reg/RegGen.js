import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Errorflash from '../Errorflash';
import LandingNav from '../Landing-Registro/LandingNav';




export class RegGen extends Component {

 constructor(props){
   super(props)
   this.state={universidades:[]}
 }
  

  async componentWillMount(){
    const response = await fetch(`http://localhost:5000/api/v1/universidades`)
    const json = await response.json()
    this.setState({ universidades: json });
    console.log(response)
    console.log(json)
    console.log(this.state.universidades)
  }


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
          {/* <Dialog
            open
            fullWidth
            maxWidth='sm'
          > */}
            <LandingNav></LandingNav>
            <div className="row my-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
              <div className="container bg-color rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registrate aqui</h1>
                <div>

                </div>
                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="name">Nombre</label>
                        <input className="form-control" id="name" defaultValue={values.nombre} onChange={handleChange('nombre')} type="text"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="email">Email address</label>
                        <input className="form-control" id="email" onChange={handleChange('email')}
              defaultValue={values.email} type="email"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="pwd">Contraseña</label>
                        <input id="pwd" className="form-control" type="password"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="pwd2">Confirma contraseña</label>
                        <input id="pwd2" className="form-control"  onChange={handleChange('contra')}
              defaultValue={values.contra} type="password"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="tel">Telefono</label>
                        <input className="form-control" id="telefono" onChange={handleChange('telefono')}
              defaultValue={values.telefono} type="tel"></input>
                    </div>
                    <div className="form-group text-left">
                      <label for="inputUni">universidad</label>
                      <select id="inputUni" className="form-control" onChange={handleChange('universidad')}>
                      <option selected>Selecciona universidad</option>
                       {this.state.universidades.map(uni=>(
                         <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                       ))}
                      </select>
                    </div>
                    {/* <div className="form-group text-left">
                        <label for="Universidad">Universidad</label>
                        <input className="form-control" onChange={handleChange('universidad')} id="Universidad" type="text"></input>
                    </div> */}

                    <button className="btn btn-lg btn-warning my-4" onClick={this.continue}>Siguiente</button>

                </form>
            </div>
            </div>
            <div className="col-md-3"></div>
            </div>

{/*
            /* <AppBar title="Registrate aqui" />
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
            <div className="my-4">
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Siguiente</Button>
            </div> */}

          {/* </Dialog> */}
        </>
      </MuiThemeProvider>

    );
  }
}

export default RegGen;
