import React, {Fragment} from 'react'
import './LandingPage.css';

const OlvidarContra = ()=> {
    return(
        
        <Fragment>
            <div class = "contra">
          <div className="container w-25 p-3 bg-primary rounded-lg text-light">
          <h4 className="text-center my-5 pt-5">Restablece tu contraseña</h4>
          <form className="my-5 text-center mx-auto">
                   
                    <div className="form-group text-left">
                        <label for="correo">Correo</label>
                        <input id="correo" className="form-control" type="correo"></input>  
                    </div>
                    <button className="btn btn-lg btn-warning my-5 "><a href="Restablecer">Enviar correo</a></button>
                    
                </form>
               
            </div>
            </div>
        </Fragment>
        
    );
}

export default OlvidarContra; 