import React, {Fragment, useContext} from 'react';
import { UserContext } from '../../UserContext'


const MainAdmin = ()=>{
    const {user, setUser} = useContext(UserContext);
    const mystyle = {
        height: "100%",
    }
    console.log(user)
    return(
        <Fragment>
        <div className="col-9 border-left" style={{mystyle}}>
            <div className="container my-4 mx-4">
                <h1 className='my-4 display-4 text-dark'>Módulo de Administrador</h1>
                <h1 className="my-4 text-dark">{user.nombre}</h1>
            </div>
        </div>
        </Fragment>
    )
}

export default MainAdmin;
