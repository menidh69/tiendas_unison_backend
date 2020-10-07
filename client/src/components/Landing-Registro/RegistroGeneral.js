import React, {Fragment, useState} from 'react';
import {useHistory} from "react-router-dom";
import Errorflash from '../Errorflash';
import LandingNav from './LandingNav';

  const RegistroGeneral = ()=>{

    let history = useHistory()
    const [data, setData] = useState({
      nombre: '',
      email: '',
      contra: '',
      tel: '',
      universidad: ''
    });

    const [error, setError] = useState(false)


    const updateField = e => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if (data.nombre!=="" && data.email !=="" && data.contra!="" && data.tel!=="" && data.universidad!=="") {
        const body = data;
        const response = await fetch('http://localhost:5000/api/v1/usuario', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(async resp => {
          const result = await resp.json()
          if (result.error) {
            console.log(result.error)
            history.push("/")
          } else {
            history.push("/")
          }
        })
      }
      else{
        
        setError(true)
        console.log(error)
      }

    } catch (err) {
      console.log(err)
    }
  }

    return(
        <Fragment>
          <LandingNav></LandingNav>
            <div className="container bg-primary w-75 rounded-lg my-4 text-light">
                <h1 className="text-center my-10 pt-5">Registrate aqui</h1>
                <div className="my-2">
                  {error ? <Errorflash/> : '' }
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                  <form className="my-5 text-center mx-auto" onSubmit={onSubmitForm}>
                    <div className="form-group text-left">
                        <label for="name">Nombre</label>
                          <input
                          className="form-control"
                          id="username"
                          type="text"
                          name="nombre"
                          value={data.nombre}
                          onChange={updateField}
                          ></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="email">Email address</label>
                        <input
                          className="form-control"
                          id="email"
                          type="email"
                          name= "email"
                          value={data.email}
                          onChange={updateField}
                          ></input>
                    </div>

                    <div className="form-group text-left">
                      <label for="contra1">Contra</label>
                      <input
                        className="form-control"
                        id="contra1"
                        type="password"
                        name= "contra1"

                        ></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="contra">Confirma contraseña</label>
                          <input
                            className="form-control"
                            id="contra"
                            type="password"
                            name= "contra"
                            value={data.contra}
                            onChange={updateField}
                            ></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="tel">Telefono</label>
                          <input
                            className="form-control"
                            id="tel"
                            type="tel"
                            name= "tel"
                            value={data.tel}
                            onChange={updateField}
                            ></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="universidad">Universidad</label>
                        <input
                          className="form-control"
                          id="universidad"
                          type="text"
                          name= "universidad"
                          value={data.universidad}
                          onChange={updateField}></input>
                    </div>
                    <button className="btn btn-lg btn-warning my-4" type="submit">Registrar</button>

                </form>
                  </div>
                  <div className="col-md-3"></div>

                </div>
                
            </div>
        </Fragment>
    )
}

export default RegistroGeneral;
