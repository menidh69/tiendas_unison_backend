import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Errorflash from '../Errorflash';
import LandingNav from './LandingNav';

  const RegistroGeneral = ()=>{

    let history = useHistory();
    const [data, setData] = useState({
      nombre: '',
      email: '',
      contra: '',
      contra1:"",
      tel: '',
      universidad: ''
    });

    const [unis, setUnis] = useState([]);
    useEffect(()=>{
      fetchUniversidades()
    }, [])

    const fetchUniversidades = async ()=>{
      const data = await fetch('https://tiendas-unison-web.herokuapp.com/api/v1/universidadesvalidadas')
      const json = await data.json();
      console.log(json)
      setUnis(json);
    }

    const [error, setError] = useState(false)


    const updateField = e => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }

    function validar(contra) {
      if (contra == data.contra1) {
        const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
        const isOk = re.test(contra);
        if(!isOk) {
            return alert('Contraseña invalida: no cumple con los requisitos de seguridad!');
        }
      } else {
        return alert ('Contraseñas no coinciden')
      }

    }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if ( validar(data.contra) != true) {

      }
      if (data.nombre!=="" && data.email !=="" && data.contra!="" && data.tel!=="" && data.universidad!=="") {
        const body = data;
        const response = await fetch('https://tiendas-unison-web.herokuapp.com/api/v1/usuarios', {
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
            <div className="container bg-color w-50 rounded-lg my-4 text-light">
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
                        <p class="text-warning"><small> *Minimo 8 caracteres, una mayuscula, una minuscula, un caracter especial y un número.</small></p>
                      <input
                        className="form-control"
                        id="contra1"
                        type="password"
                        name="contra1"
                        value={data.contra1}
                        onChange={updateField}
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
                      <select id="universidad" name="universidad" className="form-control" onChange={updateField}>
                      <option selected>Selecciona universidad</option>
                       {unis.map(uni=>(
                         <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                       ))}
                      </select>
                    </div>
                    {/* <div className="form-group text-left">
                        <label for="universidad">Universidad</label>
                        <input
                          className="form-control"
                          id="universidad"
                          type="text"
                          name= "universidad"
                          value={data.universidad}
                          onChange={updateField}></input>
                    </div> */}
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
