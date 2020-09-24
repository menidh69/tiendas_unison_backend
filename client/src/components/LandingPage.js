import React, {Fragment} from 'react'
import './LandingPage.css';

const LandingPage = ()=> {
    return(
        <Fragment>
        <div class = "row">

            <div class = "lpleft">
                 <h1>Tiendas</h1>
                 <h1>Universitarias</h1>
                 <div class = "badg">
                 <div class="alert alert-info" role="alert"> ¿No encuentras tu Universidad?     <a href="RegistroUniversidad" class="alert-link">¡Regístrala aquí!</a></div>
                 </div>
            </div>

            <div class = "lpright">
                <div className="container LandingPage">
                <div className="form-group text-left">
                    <div class = "ini1">
                        <label for="email">Email address</label>
                        <input className="form-control-sm" id="email" type="text"></input>
                        <label for="pwd">Password</label>
                        <input id="pwd" className="form-control-sm" type=" password "></input>
                        <button className="btn btn-outline-warning btn-sm "><a href="#">Iniciar sesión</a></button>
                        </div>
                        <div class= "ini2"><small id="olvidada" class="form-text .bg-black"><a href="olvidarcontra">¿Olvidaste tu contraseña?</a></small></div>
                </div>
                    <div class= "ini3">
                    <h1>Olvídate del efectivo,</h1>
                    <h1>compralo en línea.</h1>
                    <button className="btn btn-outline-warning btn-lg "><a href="Login">Iniciar sesión</a></button>
                    <button className="btn btn-lg btn-warning"><a href="RegistroGeneral">Registrate</a></button>
                </div>
                </div>
           

                </div>
            </div>
        </Fragment>
    );
}

export default LandingPage;