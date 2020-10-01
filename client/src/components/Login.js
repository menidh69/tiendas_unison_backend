import React, {Fragment, useState} from 'react'
import Registro from './Registro'
import {useHistory} from "react-router-dom";

const LoginForm = () => {
  let history = useHistory()
  const [data, setData] = useState({
      email: '',
      contra: ''
  });

  const [alert, setAlert] = useState([])

  const updateField = e =>{
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  }

  const onSubmitForm = async e =>{
      e.preventDefault();
      try{
          const body = data;
          console.log(body);
          const response = await fetch('http://localhost:5000/api/v1/usuario/login',
          {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          })
          .then(async resp =>{
              const result = await resp.json()
              if(result.error){
                  console.log(result.error)
                  history.push("/home")
              }else{
                  console.log(result)
                  history.push("/")
              }
          })
      }catch(err){

      }
  }
  return (<Fragment>
    <div className="container w-25 bg-primary rounded-lg text-light">
      <h1 className="text-center my-5 pt-5">Login</h1>

      <form className="my-5 text-center mx-auto" onSubmit={onSubmitForm}>
        <div className="form-group text-left">
          <label for="email">Email address</label>
          <input
            className="form-control"
            id="email"
            type="text"
            name="email"
            value={data.email}
            onChange={updateField}
            ></input>
        </div>
        <div className="form-group text-left">
          <label for="contra">Password</label>
          <input
            className="form-control"
            id="contra"
            type="password"
            name= "contra"
            value={data.contra}
            onChange={updateField}

            ></input>
          <small id="olvidada" class="form-text text-light">
            <a href="olvidarcontra">¿Olvidaste tu contraseña?</a>
          </small>
        </div>
        <button className="btn btn-lg btn-warning my-4" type='submit'>Login</button>

      </form>

    </div>
    <Registro></Registro>
  </Fragment>)
}

export default LoginForm;
