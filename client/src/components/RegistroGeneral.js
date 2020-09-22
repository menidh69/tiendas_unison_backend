import React, {Fragment} from 'react'

const RegistroGeneral = ()=>{
    return(
        <Fragment>
            <div className="container w-30 bg-primary rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registrate aqui</h1>

                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="name">Nombre</label>
                        <input className="form-control" id="name" type="text"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="email">Email address</label>
                        <input className="form-control" id="email" type="email"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="pwd">Contraseña</label>
                        <input id="pwd" className="form-control" type="password"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="pwd2">Confirma contraseña</label>
                        <input id="pwd2" className="form-control" type="password"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="tel">Telefono</label>
                        <input className="form-control" id="telefono" type="tel"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="Universidad">Universidad</label>
                        <input className="form-control" id="Universidad" type="text"></input>
                    </div>

                    <button className="btn btn-lg btn-warning my-4" type="submit">Login</button>

                </form>
            </div>
        </Fragment>
    )
}

export default RegistroGeneral;
