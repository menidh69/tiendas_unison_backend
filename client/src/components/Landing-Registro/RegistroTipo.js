import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import LandingNav from './LandingNav';

const RegistroTipo = ()=>{
    return(
        <Fragment>
            <LandingNav></LandingNav>
            <div className="container h-100 text-center py-4 bg-light border">
            <h1 className="display-4 my-5 text-primary py-5">¿Eres una tienda o un cliente?</h1>
                <div className="row h-100 my-4 py-4">
                    <div className="col-md-6">
                        <Link to="/registro/tienda">
                        <button className="btn btn-primary rounded h-25 w-50"><h1>Tienda</h1></button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/registro/cliente">
                    <button className="btn btn-primary rounded h-25 w-50"><h1>Cliente / Alumno</h1></button>
                    </Link>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default RegistroTipo;