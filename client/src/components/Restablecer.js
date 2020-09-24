import React, {Fragment} from 'react'


const Restablecer = ()=> {
    return(
        
        <Fragment>
            <div class = "restablece">
            <div className="container w-20 bg-primary rounded-lg text-light p-4">
                <form className="my-3 text-center mx-auto">
                  
                    <div className="form-group text-left">
                        <label for="pwd">Contraseña</label>
                        <input id="pwd" className="form-control" type="password"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="pwd2">Nueva contraseña</label>
                        <input id="pwd2" className="form-control" type="password"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="name">Codigo</label>
                        <input className="form-control" id="code" type="code"></input>
                    </div>
                    <small id="reenviar" class="form-text text-light"><a href="#">Reenviar codigo</a></small>
                  

                    <button className="btn btn-lg btn-warning my-4" type="submit">Confirmar</button>

                </form>
            </div>  
            </div>
        </Fragment>
        
    );
}

export default Restablecer; 