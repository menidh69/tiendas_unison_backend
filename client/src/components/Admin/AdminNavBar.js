import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const AdminNavBar = ()=>{
    return(
        <Fragment>
        <div className="col-3 bg-primary h-100">
          <Link to='/admin'>
        <li className="nav-link my-4 border-bottom"><h1>Tiendas UNI <span className='small'>Admin</span></h1></li>
        </Link>
          <div className="nav flex-column nav-pills bg-primary py-4" role="tablist" aria-orientation="vertical">
          <Link to='/admin/tiendas'>
            <li className="nav-link"  href="/admin/tiendas">Tiendas</li>
            </Link>
            <Link to='/admin/universidades'>
            <li className="nav-link">Universidades</li>
            </Link>
          </div>
        </div>
        </Fragment>
    )
}

export default AdminNavBar;