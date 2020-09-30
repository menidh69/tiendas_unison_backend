import React, {Fragment} from 'react';
import Registro from './Registro';
import Facebook from './Login/Facebook';
import {Link} from 'react-router-dom';

const LoginForm = ()=>{
    return(
        <Fragment>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
            <div className="container bg-primary rounded-lg text-light my-2">
                <h1 className="text-center my-5 pt-5">Login</h1>

                <form className="my-2 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="email">Email address</label>
                        <input className="form-control" id="email" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="pwd">Password</label>
                        <input id="pwd" className="form-control" type="password"></input>
                        <Link to="/olvidarcontra">
                        <small id="olvidada" class="form-text text-light">¿Olvidaste tu contraseña?</small>
                        </Link>
                    </div>
                    <button className="btn btn-lg btn-warning my-4">Login</button>

                </form>
                <div className="text-center py-3 rounded">
                <Facebook></Facebook>
                </div>
            </div>
            <Registro></Registro>
            </div>
                <div className="col-md-4"></div>

            </div>
            
        </Fragment>
    )
}

export default LoginForm;
