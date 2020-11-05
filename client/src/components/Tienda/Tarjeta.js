import React, {Fragment} from 'react';
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';




const Tarjeta = ()=> {

    return(

        <Fragment>
            <InfoBancaria/>
        </Fragment>
    );
}

function InfoBancaria(){
  return(
      <div className="top-container-item izq">
          <Link to="/panel">
          <a className="atras izq" href="">
              <h6 className="izq">← Atras</h6>
          </a>
          </Link>
          <h6 className="izq">| Tarjeta</h6>
      </div>
    )
}

export default Tarjeta;
