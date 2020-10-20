import React, {Fragment, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import '../LandingPage.css';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import LandingNav from './LandingNav';



const LandingPage = ()=> {
  let history = useHistory()
  const {user, setUser} = useContext(UserContext);

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
                console.log(result.user);
                console.log(result)
                console.log(resp)
                localStorage.setItem("token.tuw", result.user.token)
                setUser(result.user);
                history.push("/")
                
            }
        })
    }catch(err){

    }
}


    return(
        <Fragment>

        <div className = "row text-center">
            <div className = "lpleft text-center mx-auto col-sm-5">
                 <h1>Tiendas</h1>
                 <h1>Universitarias</h1>
                 <div className="row my-4">
                     <div className="col-sm-2"></div>
                     <div className="col-sm-8">
                     <img className="d-block mx-auto" id="carrito" src="/Unioncarrito.png"/>
                     </div>
                     <div className="col-sm-2"></div>

                 </div>
                 <Link to="/registrouniversidad">
                 <div className = "badge">
                 <div className="alert alert-info" role="alert"> ¿No encuentras tu Universidad?<span class="alert-link">¡Regístrala aquí!</span></div>
                 </div>
                 </Link>
            </div>

            <div className= "lpright col-sm-7">
                <div className="container LandingPage">
                <div className="form-group text-left">
                    <form class ="ini1" onSubmit={onSubmitForm}>
                        <div className="row">
                            <div className="col-md-3 mx-auto">
                                <div className="form-group">
                                <label for="email" className="mx-1">Email address: </label>
                                <input
                                  className="form-control-sm"
                                  id="email"
                                  type="email"
                                  name= "email"
                                  value={data.email}
                                  onChange={updateField}
                                  ></input>
                                </div>
                            </div>
                            <div className="col-md-3 mx-auto">
                                <div className="form-group">
                                <label for="contra" className="mx-1">Password: </label>
                                <input
                                  className="form-control-sm"
                                  type="password"
                                  id="contra"
                                  type="password"
                                  name= "contra"
                                  value={data.contra}
                                  onChange={updateField}
                                  ></input>
                                <small id="olvidada" class="form-text .bg-black"><a href="olvidarcontra">¿Olvidaste tu contraseña?</a></small>
                                </div>
                            </div>
                            <div className="col-md-3 mx-auto">
                            <button className="btn btn-outline-warning btn-block my-4" type="submit"><a href="#">Iniciar sesión</a></button>
                            </div>
                        </div>
                    </form>
                </div>
                    <div className= "ini3 text-center my-5">
                        <div className="container py-5">
                        <h1>Olvídate del efectivo,</h1>
                        <h1>compralo en línea.</h1>
                        <Link to="/login">
                        <button className="btn btn-outline-warning btn-lg mx-4"><a href="Login">Iniciar sesión</a></button>
                        </Link>
                        <Link to="/registro">
                        <button className="btn btn-lg btn-warning mx-4">Registrate</button>
                        </Link>
                    </div>
                </div>
                </div>


                </div>
            </div>
        </Fragment>
    );
}

export default LandingPage;