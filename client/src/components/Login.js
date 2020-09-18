import React, {Fragment} from 'react'

const LoginForm = ()=>{
    return( 
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            
            <form className="my-5 w-25 text-center mx-auto">
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input className="form-control" id="email" type="text"></input>
                </div>
                <div className="form-group">
                    <label for="pwd">Password</label>
                    <input id="pwd" className="form-control" type="password"></input>
                </div>
                <button className="btn btn-lg btn-primary">Login</button>
                
            </form>
        </Fragment>
    )
}

export default LoginForm;