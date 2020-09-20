import React, {Fragment} from 'react'

const LoginForm = ()=>{
    return( 
        <Fragment>
            <div className="container w-25 bg-primary rounded-lg text-light">
                <h1 className="text-center my-5 pt-5">Login</h1>
                
                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="email">Email address</label>
                        <input className="form-control" id="email" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="pwd">Password</label>
                        <input id="pwd" className="form-control" type="password"></input>
                        <small id="olvidada" class="form-text text-light"><a href="#">¿Olvidaste tu contraseña?</a></small>
                    </div>
                    <button className="btn btn-lg btn-warning my-4">Login</button>
                    
                </form>
                
            </div>
        </Fragment>
    )
}

export default LoginForm;