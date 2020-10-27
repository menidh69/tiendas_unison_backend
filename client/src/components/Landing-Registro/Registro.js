
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';


const Registro = ()=> {
    return(
        <Fragment>
            <div className="container bg-color text-center rounded py-2">
                <h4 className="text-white">¿Aun no tienes cuenta?</h4>


                <Link to="/registro">
                <button className="btn btn-lg btn-warning">Registrate</button>

                </Link>
            </div>
        </Fragment>
    );
}

export default Registro;
