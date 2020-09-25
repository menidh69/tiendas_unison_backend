import React, {Fragment} from 'react'
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = ()=> {
    return(
        <Fragment>
        <div class = "row">

            <div class = "lpleft col-sm-5">
                 <h1>Tiendas</h1>
                 <h1>Universitarias</h1>
                 <Link to="/registrouniversidad">
                 <div class = "badge">
                 <div class="alert alert-info" role="alert"> ¿No encuentras tu Universidad?     <span class="alert-link">¡Regístrala aquí!</span></div>
                 </div>
                 </Link>
            </div>

            <div className= "lpright col-sm-7">
                <div className="container LandingPage">
                <div className="form-group text-left">
                    <form class = "ini1">
                        <div className="row">
                            <div className="col-md-3 mx-auto">
                                <div className="form-group">
                                <label for="email" className="mx-1">Email address: </label>
                                <input className="form-control-sm" id="email" type="text"></input>
                                </div>
                            </div>
                            <div className="col-md-3 mx-auto">
                                <div className="form-group">
                                <label for="pwd" className="mx-1">Password: </label>
                                <input id="pwd" className="form-control-sm" type="password"></input>
                                <small id="olvidada" class="form-text .bg-black"><a href="olvidarcontra">¿Olvidaste tu contraseña?</a></small>
                                </div>
                            </div>
                            <div className="col-md-3 mx-auto">
                            <button className="btn btn-outline-warning btn-block my-4"><a href="#">Iniciar sesión</a></button>
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
                        <button className="btn btn-lg btn-warning mx-4"><a href="RegistroGeneral">Registrate</a></button>
                    </div>
                </div>
                </div>
           

                </div>
            </div>
        </Fragment>
    );
}

export default LandingPage;