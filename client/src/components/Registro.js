import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';

const Registro = ()=> {
    return(
        <Fragment>
            <div className="container registro">
                <h4>¿Aun no tienes cuenta?</h4>
                <Link to="/registrogeneral">
                  <button className="btn btn-lg btn-warning">Registrate</button>
                </Link>
            </div>
        </Fragment>
    );
}

export default Registro;
