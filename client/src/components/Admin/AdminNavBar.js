import React, {Fragment, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../../UserContext';

const AdminNavBar = ()=>{
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const logout = ()=>{
    localStorage.removeItem('token.tuw')
    alert('Hiciste logout')
    setUser(null);
    history.push('/')
}

    return(
        <Fragment>
        <div className="col-3 bg-primary h-100">
          <Link to='/admin'>
        <li className="nav-link my-4 border-bottom"><h1>Tiendas UNI <span className='small'>Admin</span></h1></li>
        </Link>
          <div className="nav flex-column nav-pills bg-primary py-4 text-justify border-bottom" role="tablist" aria-orientation="vertical">
          <Link to='/admin/tiendas'>
          <button className="nav-link btn btn-primary py-4 h1 text-left w-100">Tiendas</button>
            </Link>
            <Link to='/admin/universidades'>
            <button className="nav-link btn btn-primary py-4 text-left w-100">Universidades</button>
            </Link>

          </div>
          <button className="nav-link text-left btn btn-primary w-100 py-4 text-light my-4" onClick={()=>logout()}>Cerrar Sesión</button>

        </div>
        </Fragment>
    )
}

export default AdminNavBar;